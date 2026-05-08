<?php
/**
 * Customer Model
 */

class Customer {
    private $db;

    public function __construct() {
        $this->db = Database::getInstance();
    }

    /**
     * Get customer by ID
     */
    public function getById($id) {
        return $this->db->fetchOne(
            'SELECT * FROM customers WHERE id = ?',
            [(int)$id]
        );
    }

    /**
     * Get customer by lead ID
     */
    public function getByLeadId($lead_id) {
        return $this->db->fetchOne(
            'SELECT * FROM customers WHERE lead_id = ?',
            [(int)$lead_id]
        );
    }

    /**
     * Get all customers
     */
    public function getAll($filters = []) {
        $query = 'SELECT * FROM customers WHERE 1=1';
        $params = [];

        if (!empty($filters['status'])) {
            $query .= ' AND status = ?';
            $params[] = $filters['status'];
        }

        $query .= ' ORDER BY created_at DESC';

        return $this->db->fetchAll($query, $params);
    }

    /**
     * Convert lead to customer
     */
    public function convertFromLead($lead_id, $lifetime_value = 0) {
        $lead = $this->db->fetchOne(
            'SELECT * FROM leads WHERE id = ?',
            [(int)$lead_id]
        );

        if (!$lead) {
            throw new Exception('Lead not found');
        }

        return $this->db->insert(
            'INSERT INTO customers (lead_id, name, email, phone, company, lifetime_value, status) 
             VALUES (?, ?, ?, ?, ?, ?, ?)',
            [
                $lead_id,
                $lead['name'],
                $lead['email'],
                $lead['phone'],
                $lead['company'],
                $lifetime_value,
                'active'
            ]
        );
    }

    /**
     * Update lifetime value
     */
    public function updateLifetimeValue($id, $amount) {
        return $this->db->execute(
            'UPDATE customers SET lifetime_value = lifetime_value + ? WHERE id = ?',
            [$amount, (int)$id]
        );
    }

    /**
     * Update last interaction
     */
    public function updateLastInteraction($id) {
        return $this->db->execute(
            'UPDATE customers SET last_interaction = NOW() WHERE id = ?',
            [(int)$id]
        );
    }

    /**
     * Get total customers
     */
    public function getCount() {
        $result = $this->db->fetchOne(
            'SELECT COUNT(*) as count FROM customers WHERE status = ?',
            ['active']
        );
        return $result['count'] ?? 0;
    }

    /**
     * Get total lifetime value
     */
    public function getTotalLifetimeValue() {
        $result = $this->db->fetchOne(
            'SELECT SUM(lifetime_value) as total FROM customers WHERE status = ?',
            ['active']
        );
        return $result['total'] ?? 0;
    }
}
?>
