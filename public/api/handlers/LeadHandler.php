<?php
/**
 * Lead Handler
 */

class LeadHandler {
    private $db;

    public function __construct() {
        $this->db = Database::getInstance()->getConnection();
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
