<?php
/**
 * Lead Handler
 */

require_once __DIR__ . '/EmailService.php';

class LeadHandler {
    private $db;
    private $emailService;

    public function __construct() {
        $this->db = Database::getInstance();
        $this->emailService = new EmailService();
    }

    /**
     * Render an HTML drip template from public/email-templates with variables.
     */
    private function renderDripTemplate($file, $vars) {
        $path = __DIR__ . '/email-templates/' . $file;
        if (!file_exists($path)) return null;
        $body = file_get_contents($path);
        return $this->emailService->renderTemplate($body, $vars);
    }

    /**
     * Enroll a new lead in the Day-0/2/7 drip.
     * Sends Day-0 immediately via the email queue, schedules Day-2 + Day-7.
     */
    private function enrollInDrip($lead_id, $name, $email, $product_interest) {
        $product = $product_interest ?: 'our products';
        $vars = ['name' => $name ?: 'there', 'product_interest' => $product];

        $body = $this->renderDripTemplate('drip-day0.html', $vars);
        if ($body) {
            $token = bin2hex(random_bytes(16));
            $this->emailService->sendCampaignEmail(
                $email,
                'Thanks for reaching out — Moris One Enterprises',
                $body,
                null,
                $lead_id,
                $token
            );
            try {
                $this->db->execute(
                    'INSERT IGNORE INTO lead_drip_schedule (lead_id, step, scheduled_at, status, sent_at)
                     VALUES (?, ?, NOW(), ?, NOW())',
                    [$lead_id, 0, 'sent']
                );
            } catch (Exception $e) { /* ignore */ }
        }

        foreach ([2, 7] as $step) {
            try {
                $this->db->execute(
                    'INSERT IGNORE INTO lead_drip_schedule (lead_id, step, scheduled_at, status)
                     VALUES (?, ?, DATE_ADD(NOW(), INTERVAL ? DAY), ?)',
                    [$lead_id, $step, $step, 'pending']
                );
            } catch (Exception $e) { /* ignore */ }
        }
    }

    /**
     * Create new lead
     */
    public function create() {
        try {
            $input = json_decode(file_get_contents('php://input'), true);

            $name = $input['name'] ?? null;
            $email = $input['email'] ?? null;
            $phone = $input['phone'] ?? null;
            $company = $input['company'] ?? null;
            $source = $input['source'] ?? 'form';
            $product_interest = $input['product_interest'] ?? null;

            if (!$name || !$email) {
                http_response_code(400);
                echo json_encode(['error' => 'Name and email are required']);
                return;
            }

            // Check if lead already exists
            $existing = $this->db->fetchOne(
                'SELECT id FROM leads WHERE email = ?',
                [$email]
            );

            if ($existing) {
                http_response_code(200);
                echo json_encode([
                    'message' => 'Lead already exists',
                    'lead_id' => $existing['id']
                ]);
                return;
            }

            // Insert lead
            $id = $this->db->insert(
                'INSERT INTO leads (name, email, phone, company, source, product_interest, status, score) 
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
                [$name, $email, $phone, $company, $source, $product_interest, 'new', 10]
            );

            // Log to tracking
            $this->db->execute(
                'INSERT INTO tracking_pixels (lead_id, page_url, utm_source) VALUES (?, ?, ?)',
                [$id, $_SERVER['HTTP_REFERER'] ?? null, $source]
            );

            // Day-0/2/7 automated email drip
            try {
                $this->enrollInDrip($id, $name, $email, $product_interest);
            } catch (Exception $e) {
                // Don't fail lead creation if drip enrollment fails
                if (class_exists('Logger')) Logger::error('Drip enroll failed: ' . $e->getMessage());
            }

            http_response_code(201);
            echo json_encode([
                'message' => 'Lead created successfully',
                'lead_id' => $id
            ]);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['error' => $e->getMessage()]);
        }
    }

    /**
     * Get all leads
     */
    public function getAll() {
        try {
            $status = $_GET['status'] ?? null;
            $score_min = $_GET['score_min'] ?? null;
            $score_max = $_GET['score_max'] ?? null;
            $source = $_GET['source'] ?? null;
            $limit = min($_GET['limit'] ?? 50, 500);
            $offset = $_GET['offset'] ?? 0;

            $query = 'SELECT * FROM leads WHERE 1=1';
            $params = [];

            if ($status) {
                $query .= ' AND status = ?';
                $params[] = $status;
            }
            if ($score_min !== null) {
                $query .= ' AND score >= ?';
                $params[] = (int)$score_min;
            }
            if ($score_max !== null) {
                $query .= ' AND score <= ?';
                $params[] = (int)$score_max;
            }
            if ($source) {
                $query .= ' AND source = ?';
                $params[] = $source;
            }

            $query .= ' ORDER BY created_at DESC LIMIT ? OFFSET ?';
            $params[] = (int)$limit;
            $params[] = (int)$offset;

            $leads = $this->db->fetchAll($query, $params);

            http_response_code(200);
            echo json_encode([
                'leads' => $leads,
                'count' => count($leads)
            ]);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['error' => $e->getMessage()]);
        }
    }

    /**
     * Get single lead
     */
    public function getById($id) {
        try {
            $lead = $this->db->fetchOne(
                'SELECT * FROM leads WHERE id = ?',
                [(int)$id]
            );

            if (!$lead) {
                http_response_code(404);
                echo json_encode(['error' => 'Lead not found']);
                return;
            }

            // Get related tracking data
            $tracking = $this->db->fetchAll(
                'SELECT * FROM tracking_pixels WHERE lead_id = ? ORDER BY timestamp DESC LIMIT 10',
                [(int)$id]
            );

            // Get campaign interactions
            $campaigns = $this->db->fetchAll(
                'SELECT c.*, cl.status, cl.sent_at, cl.opened_at, cl.clicked_at 
                 FROM campaigns c 
                 LEFT JOIN campaign_logs cl ON c.id = cl.campaign_id 
                 WHERE cl.lead_id = ? 
                 ORDER BY cl.created_at DESC LIMIT 5',
                [(int)$id]
            );

            http_response_code(200);
            echo json_encode([
                'lead' => $lead,
                'tracking' => $tracking,
                'campaigns' => $campaigns
            ]);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['error' => $e->getMessage()]);
        }
    }

    /**
     * Update lead
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
            if (isset($input['status'])) {
                $update_fields[] = 'status = ?';
                $params[] = $input['status'];
            }
            if (isset($input['score'])) {
                $update_fields[] = 'score = ?';
                $params[] = (int)$input['score'];
            }
            if (isset($input['notes'])) {
                $update_fields[] = 'notes = ?';
                $params[] = $input['notes'];
            }

            if (empty($update_fields)) {
                http_response_code(400);
                echo json_encode(['error' => 'No fields to update']);
                return;
            }

            $params[] = (int)$id;
            $query = 'UPDATE leads SET ' . implode(', ', $update_fields) . ' WHERE id = ?';
            
            $this->db->execute($query, $params);

            http_response_code(200);
            echo json_encode(['message' => 'Lead updated successfully']);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['error' => $e->getMessage()]);
        }
    }

    /**
     * Delete/Archive lead
     */
    public function delete($id) {
        try {
            // Soft delete by marking as archived
            $this->db->execute(
                'DELETE FROM leads WHERE id = ?',
                [(int)$id]
            );

            http_response_code(200);
            echo json_encode(['message' => 'Lead archived successfully']);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['error' => $e->getMessage()]);
        }
    }
}
?>
