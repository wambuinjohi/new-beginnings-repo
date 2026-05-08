<?php
/**
 * Lead Model
 */

class Lead {
    private $db;

    public function __construct() {
        $this->db = Database::getInstance();
    }

    /**
     * Get lead by ID
     */
    public function getById($id) {
        return $this->db->fetchOne(
            'SELECT * FROM leads WHERE id = ?',
            [(int)$id]
        );
    }

    /**
     * Get all leads with filters
     */
    public function getAllFiltered($filters = []) {
        $query = 'SELECT * FROM leads WHERE 1=1';
        $params = [];

        if (!empty($filters['status'])) {
            $query .= ' AND status = ?';
            $params[] = $filters['status'];
        }
        if (!empty($filters['source'])) {
            $query .= ' AND source = ?';
            $params[] = $filters['source'];
        }
        if (!empty($filters['score_min'])) {
            $query .= ' AND score >= ?';
            $params[] = (int)$filters['score_min'];
        }
        if (!empty($filters['score_max'])) {
            $query .= ' AND score <= ?';
            $params[] = (int)$filters['score_max'];
        }

        $query .= ' ORDER BY created_at DESC';

        return $this->db->fetchAll($query, $params);
    }

    /**
     * Create lead
     */
    public function create($data) {
        return $this->db->insert(
            'INSERT INTO leads (name, email, phone, company, source, product_interest, status, score) 
             VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
            [
                $data['name'],
                $data['email'],
                $data['phone'] ?? null,
                $data['company'] ?? null,
                $data['source'] ?? 'form',
                $data['product_interest'] ?? null,
                'new',
                10
            ]
        );
    }

    /**
     * Update lead score
     */
    public function updateScore($id, $points) {
        return $this->db->execute(
            'UPDATE leads SET score = score + ? WHERE id = ?',
            [$points, (int)$id]
        );
    }

    /**
     * Update lead status
     */
    public function updateStatus($id, $status) {
        return $this->db->execute(
            'UPDATE leads SET status = ? WHERE id = ?',
            [$status, (int)$id]
        );
    }

    /**
     * Check if lead exists by email
     */
    public function existsByEmail($email) {
        $result = $this->db->fetchOne(
            'SELECT id FROM leads WHERE email = ?',
            [$email]
        );
        return $result !== null;
    }

    /**
     * Get total leads count
     */
    public function getCount() {
        $result = $this->db->fetchOne(
            'SELECT COUNT(*) as count FROM leads'
        );
        return $result['count'] ?? 0;
    }

    /**
     * Get count by status
     */
    public function getCountByStatus($status) {
        $result = $this->db->fetchOne(
            'SELECT COUNT(*) as count FROM leads WHERE status = ?',
            [$status]
        );
        return $result['count'] ?? 0;
    }

    /**
     * Get average score
     */
    public function getAverageScore() {
        $result = $this->db->fetchOne(
            'SELECT AVG(score) as avg_score FROM leads'
        );
        return $result['avg_score'] ?? 0;
    }
}
?>
