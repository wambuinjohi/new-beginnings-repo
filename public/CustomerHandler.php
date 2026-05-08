<?php
/**
 * Customer Handler
 */

class CustomerHandler {
    private $db;

    public function __construct() {
        $this->db = Database::getInstance();
    }

    /**
     * Get all customers
     */
    public function getAll() {
        try {
            $status = $_GET['status'] ?? null;
            $limit = min($_GET['limit'] ?? 50, 500);
            $offset = $_GET['offset'] ?? 0;

            $query = 'SELECT * FROM customers WHERE 1=1';
            $params = [];

            if ($status) {
                $query .= ' AND status = ?';
                $params[] = $status;
            }

            $query .= ' ORDER BY created_at DESC LIMIT ? OFFSET ?';
            $params[] = (int)$limit;
            $params[] = (int)$offset;

            $customers = $this->db->fetchAll($query, $params);

            http_response_code(200);
            echo json_encode([
                'customers' => $customers,
                'count' => count($customers)
            ]);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['error' => $e->getMessage()]);
        }
    }

    /**
     * Get single customer
     */
    public function getById($id) {
        try {
            $customer = $this->db->fetchOne(
                'SELECT * FROM customers WHERE id = ?',
                [(int)$id]
            );

            if (!$customer) {
                http_response_code(404);
                echo json_encode(['error' => 'Customer not found']);
                return;
            }

            // Get original lead info
            $lead = $this->db->fetchOne(
                'SELECT * FROM leads WHERE id = ?',
                [$customer['lead_id']]
            );

            // Get customer interactions
            $interactions = $this->db->fetchAll(
                'SELECT * FROM campaign_logs WHERE lead_id = ? ORDER BY created_at DESC LIMIT 20',
                [$customer['lead_id']]
            );

            http_response_code(200);
            echo json_encode([
                'customer' => $customer,
                'lead' => $lead,
                'interactions' => $interactions
            ]);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['error' => $e->getMessage()]);
        }
    }

    /**
     * Convert lead to customer
     */
    public function convertLead($lead_id) {
        try {
            $lead = $this->db->fetchOne(
                'SELECT * FROM leads WHERE id = ?',
                [(int)$lead_id]
            );

            if (!$lead) {
                http_response_code(404);
                echo json_encode(['error' => 'Lead not found']);
                return;
            }

            $input = json_decode(file_get_contents('php://input'), true);
            $lifetime_value = $input['lifetime_value'] ?? 0;

            // Insert into customers table
            $customer_id = $this->db->insert(
                'INSERT INTO customers (lead_id, name, email, phone, company, lifetime_value, status) 
                 VALUES (?, ?, ?, ?, ?, ?, ?)',
                [$lead_id, $lead['name'], $lead['email'], $lead['phone'], $lead['company'], $lifetime_value, 'active']
            );

            // Update lead status
            $this->db->execute(
                'UPDATE leads SET status = ? WHERE id = ?',
                ['converted', $lead_id]
            );

            http_response_code(201);
            echo json_encode([
                'message' => 'Lead converted to customer',
                'customer_id' => $customer_id
            ]);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['error' => $e->getMessage()]);
        }
    }
}
?>
