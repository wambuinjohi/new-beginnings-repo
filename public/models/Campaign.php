<?php
/**
 * Campaign Model
 */

class Campaign {
    private $db;

    public function __construct() {
        $this->db = Database::getInstance();
    }

    /**
     * Get campaign by ID
     */
    public function getById($id) {
        return $this->db->fetchOne(
            'SELECT * FROM campaigns WHERE id = ?',
            [(int)$id]
        );
    }

    /**
     * Get all campaigns
     */
    public function getAll($filters = []) {
        $query = 'SELECT * FROM campaigns WHERE 1=1';
        $params = [];

        if (!empty($filters['status'])) {
            $query .= ' AND status = ?';
            $params[] = $filters['status'];
        }

        $query .= ' ORDER BY created_at DESC';

        return $this->db->fetchAll($query, $params);
    }

    /**
     * Create campaign
     */
    public function create($data) {
        return $this->db->insert(
            'INSERT INTO campaigns (name, subject, template, schedule, status, created_by) 
             VALUES (?, ?, ?, ?, ?, ?)',
            [
                $data['name'],
                $data['subject'],
                $data['template'] ?? null,
                $data['schedule'] ?? null,
                'draft',
                $data['created_by'] ?? null
            ]
        );
    }

    /**
     * Get campaign metrics
     */
    public function getMetrics($id) {
        return $this->db->fetchOne(
            'SELECT 
                id, name, recipients_count, sent_count, opened_count, clicked_count,
                ROUND((opened_count / NULLIF(sent_count, 0)) * 100, 2) as open_rate,
                ROUND((clicked_count / NULLIF(sent_count, 0)) * 100, 2) as click_rate
             FROM campaigns WHERE id = ?',
            [(int)$id]
        );
    }

    /**
     * Get total campaigns
     */
    public function getCount() {
        $result = $this->db->fetchOne(
            'SELECT COUNT(*) as count FROM campaigns'
        );
        return $result['count'] ?? 0;
    }

    /**
     * Get campaigns by status
     */
    public function getCountByStatus($status) {
        $result = $this->db->fetchOne(
            'SELECT COUNT(*) as count FROM campaigns WHERE status = ?',
            [$status]
        );
        return $result['count'] ?? 0;
    }
}
?>
