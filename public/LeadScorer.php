<?php
/**
 * Lead Scoring Utility
 * Handles lead scoring based on configurable rules
 */

class LeadScorer {
    private $db;

    public function __construct() {
        $this->db = Database::getInstance()->getConnection();
    }

    /**
     * Score action
     */
    public function scoreAction($lead_id, $action) {
        $points = $this->getPointsForAction($action);
        
        if ($points > 0) {
            $this->db->query(
                'UPDATE leads SET score = score + ? WHERE id = ?',
                [$points, $lead_id]
            );
        }

        return $points;
    }

    /**
     * Get points for specific action
     */
    public function getPointsForAction($action) {
        $result = $this->db->query(
            'SELECT points FROM lead_scoring_rules WHERE action = ? AND status = ?',
            [$action, 'active']
        );

        $row = $result->fetch_assoc();
        $result->close();

        return $row ? (int)$row['points'] : 0;
    }

    /**
     * Get all scoring rules
     */
    public function getAllRules() {
        $result = $this->db->query(
            'SELECT * FROM lead_scoring_rules WHERE status = ? ORDER BY points DESC',
            ['active']
        );

        $rules = [];
        while ($row = $result->fetch_assoc()) {
            $rules[] = $row;
        }
        $result->close();

        return $rules;
    }

    /**
     * Get lead score breakdown
     */
    public function getScoreBreakdown($lead_id) {
        $lead = $this->db->query(
            'SELECT score FROM leads WHERE id = ?',
            [$lead_id]
        );

        $row = $lead->fetch_assoc();
        $lead->close();

        if (!$row) {
            return null;
        }

        return [
            'current_score' => (int)$row['score'],
            'rules' => $this->getAllRules()
        ];
    }

    /**
     * Calculate score based on lead activity
     */
    public function recalculateScore($lead_id) {
        $lead = $this->db->query(
            'SELECT * FROM leads WHERE id = ?',
            [$lead_id]
        );

        $lead_row = $lead->fetch_assoc();
        $lead->close();

        if (!$lead_row) {
            return 0;
        }

        $score = 0;

        // Form submission base score
        $score += 10;

        // Email interactions
        $email_logs = $this->db->query(
            'SELECT opened_at, clicked_at FROM campaign_logs WHERE lead_id = ?',
            [$lead_id]
        );

        while ($log = $email_logs->fetch_assoc()) {
            if ($log['opened_at']) {
                $score += 5;
            }
            if ($log['clicked_at']) {
                $score += 10;
            }
        }
        $email_logs->close();

        // Page views
        $page_views = $this->db->query(
            'SELECT COUNT(*) as count FROM tracking_pixels WHERE lead_id = ?',
            [$lead_id]
        );

        $view_row = $page_views->fetch_assoc();
        $page_views->close();

        $view_count = (int)$view_row['count'];
        $score += ($view_count * 3);

        if ($view_count >= 3) {
            $score += 5;
        }

        // Apply decay if no interaction in 30 days
        $days_inactive = $this->db->query(
            'SELECT DATEDIFF(NOW(), MAX(timestamp)) as days_inactive 
             FROM tracking_pixels WHERE lead_id = ?',
            [$lead_id]
        );

        if ($days_row = $days_inactive->fetch_assoc()) {
            $days = (int)($days_row['days_inactive'] ?? 0);
            if ($days > 30) {
                $decay_points = min($score, $days * 2);
                $score -= $decay_points;
            }
        }
        $days_inactive->close();

        // Cap at minimum 0
        $score = max(0, $score);

        // Update lead score
        $this->db->query(
            'UPDATE leads SET score = ? WHERE id = ?',
            [$score, $lead_id]
        );

        return $score;
    }

    /**
     * Get qualified leads (score >= threshold)
     */
    public function getQualifiedLeads($threshold = 40) {
        $result = $this->db->query(
            'SELECT id, name, email, score FROM leads WHERE score >= ? AND status != ? ORDER BY score DESC',
            [$threshold, 'converted']
        );

        $leads = [];
        while ($row = $result->fetch_assoc()) {
            $leads[] = $row;
        }
        $result->close();

        return $leads;
    }

    /**
     * Get lead score percentile
     */
    public function getScorePercentile($score) {
        $result = $this->db->query(
            'SELECT ROUND(COUNT(*) / (SELECT COUNT(*) FROM leads) * 100) as percentile 
             FROM leads WHERE score >= ?',
            [$score]
        );

        $row = $result->fetch_assoc();
        $result->close();

        return $row ? (int)$row['percentile'] : 0;
    }
}
?>
