<?php
/**
 * Campaign Handler
 */

class CampaignHandler {
    private $db;

    public function __construct() {
        $this->db = Database::getInstance()->getConnection();
    }

    /**
     * Create campaign
     */
    public function create() {
        try {
            $input = json_decode(file_get_contents('php://input'), true);

            $name = $input['name'] ?? null;
            $subject = $input['subject'] ?? null;
            $template = $input['template'] ?? null;
            $schedule = $input['schedule'] ?? null;
            $user_id = $_REQUEST['user_id'] ?? null;

            if (!$name || !$subject) {
                http_response_code(400);
                echo json_encode(['error' => 'Name and subject are required']);
                return;
            }

            $id = $this->db->insert(
                'INSERT INTO campaigns (name, subject, template, schedule, status, created_by) 
                 VALUES (?, ?, ?, ?, ?, ?)',
                [$name, $subject, $template, $schedule, 'draft', $user_id]
            );

            http_response_code(201);
            echo json_encode([
                'message' => 'Campaign created',
                'campaign_id' => $id
            ]);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['error' => $e->getMessage()]);
        }
    }

    /**
     * Get all campaigns
     */
    public function getAll() {
        try {
            $status = $_GET['status'] ?? null;
            $limit = min($_GET['limit'] ?? 50, 500);
            $offset = $_GET['offset'] ?? 0;

            $query = 'SELECT id, name, subject, schedule, status, recipients_count, sent_count, opened_count, clicked_count, created_at 
                      FROM campaigns WHERE 1=1';
            $params = [];

            if ($status) {
                $query .= ' AND status = ?';
                $params[] = $status;
            }

            $query .= ' ORDER BY created_at DESC LIMIT ? OFFSET ?';
            $params[] = (int)$limit;
            $params[] = (int)$offset;

            $campaigns = $this->db->fetchAll($query, $params);

            http_response_code(200);
            echo json_encode([
                'campaigns' => $campaigns,
                'count' => count($campaigns)
            ]);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['error' => $e->getMessage()]);
        }
    }

    /**
     * Get single campaign
     */
    public function getById($id) {
        try {
            $campaign = $this->db->fetchOne(
                'SELECT * FROM campaigns WHERE id = ?',
                [(int)$id]
            );

            if (!$campaign) {
                http_response_code(404);
                echo json_encode(['error' => 'Campaign not found']);
                return;
            }

            // Get campaign logs
            $logs = $this->db->fetchAll(
                'SELECT cl.*, l.name, l.email FROM campaign_logs cl 
                 LEFT JOIN leads l ON cl.lead_id = l.id 
                 WHERE cl.campaign_id = ? 
                 ORDER BY cl.created_at DESC LIMIT 100',
                [(int)$id]
            );

            http_response_code(200);
            echo json_encode([
                'campaign' => $campaign,
                'logs' => $logs,
                'log_count' => count($logs)
            ]);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['error' => $e->getMessage()]);
        }
    }

    /**
     * Update campaign
     */
    public function update($id) {
        try {
            $input = json_decode(file_get_contents('php://input'), true);

            $update_fields = [];
            $params = [];

            if (isset($input['name'])) {
                $update_fields[] = 'name = ?';
                $params[] = $input['name'];
            }
            if (isset($input['subject'])) {
                $update_fields[] = 'subject = ?';
                $params[] = $input['subject'];
            }
            if (isset($input['template'])) {
                $update_fields[] = 'template = ?';
                $params[] = $input['template'];
            }
            if (isset($input['status'])) {
                $update_fields[] = 'status = ?';
                $params[] = $input['status'];
            }
            if (isset($input['schedule'])) {
                $update_fields[] = 'schedule = ?';
                $params[] = $input['schedule'];
            }

            if (empty($update_fields)) {
                http_response_code(400);
                echo json_encode(['error' => 'No fields to update']);
                return;
            }

            $params[] = (int)$id;
            $query = 'UPDATE campaigns SET ' . implode(', ', $update_fields) . ' WHERE id = ?';
            
            $this->db->execute($query, $params);

            http_response_code(200);
            echo json_encode(['message' => 'Campaign updated']);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['error' => $e->getMessage()]);
        }
    }

    /**
     * Send campaign
     */
    public function send($id) {
        try {
            $input = json_decode(file_get_contents('php://input'), true);
            $recipient_filter = $input['recipient_filter'] ?? 'all'; // all, segment, score_range
            $score_min = $input['score_min'] ?? 0;
            $score_max = $input['score_max'] ?? 100;

            // Get campaign
            $campaign = $this->db->fetchOne(
                'SELECT * FROM campaigns WHERE id = ?',
                [(int)$id]
            );

            if (!$campaign) {
                http_response_code(404);
                echo json_encode(['error' => 'Campaign not found']);
                return;
            }

            // Get recipient leads based on filter
            $query = 'SELECT id, email FROM leads WHERE status != ?';
            $params = ['converted'];

            if ($recipient_filter === 'score_range') {
                $query .= ' AND score >= ? AND score <= ?';
                $params[] = (int)$score_min;
                $params[] = (int)$score_max;
            }

            $leads = $this->db->fetchAll($query, $params);

            // Create campaign logs for each lead
            foreach ($leads as $lead) {
                $tracking_token = bin2hex(random_bytes(32));
                $this->db->execute(
                    'INSERT INTO campaign_logs (campaign_id, lead_id, tracking_token, status) 
                     VALUES (?, ?, ?, ?)',
                    [$id, $lead['id'], $tracking_token, 'sent']
                );

                // Queue email
                $this->db->execute(
                    'INSERT INTO email_queue (lead_id, campaign_id, subject, body, status) 
                     VALUES (?, ?, ?, ?, ?)',
                    [$lead['id'], $id, $campaign['subject'], $campaign['template'], 'pending']
                );
            }

            // Update campaign stats
            $this->db->execute(
                'UPDATE campaigns SET status = ?, recipients_count = ?, sent_count = ? WHERE id = ?',
                ['sent', count($leads), count($leads), $id]
            );

            http_response_code(200);
            echo json_encode([
                'message' => 'Campaign sent',
                'recipients_count' => count($leads)
            ]);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['error' => $e->getMessage()]);
        }
    }
}
?>
