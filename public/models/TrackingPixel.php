<?php
/**
 * Tracking Pixel Model
 */

class TrackingPixel {
    private $db;

    public function __construct() {
        $this->db = Database::getInstance();
    }

    /**
     * Create tracking pixel record
     */
    public function create($data) {
        return $this->db->execute(
            'INSERT INTO tracking_pixels (lead_id, page_url, utm_source, utm_medium, utm_campaign, user_agent, ip_address) 
             VALUES (?, ?, ?, ?, ?, ?, ?)',
            [
                $data['lead_id'] ?? null,
                $data['page_url'] ?? null,
                $data['utm_source'] ?? null,
                $data['utm_medium'] ?? null,
                $data['utm_campaign'] ?? null,
                $data['user_agent'] ?? null,
                $data['ip_address'] ?? null
            ]
        );
    }

    /**
     * Get tracking stats for lead
     */
    public function getLeadStats($lead_id) {
        return $this->db->fetchAll(
            'SELECT * FROM tracking_pixels WHERE lead_id = ? ORDER BY timestamp DESC LIMIT 50',
            [(int)$lead_id]
        );
    }

    /**
     * Get top pages
     */
    public function getTopPages($days = 30) {
        return $this->db->fetchAll(
            'SELECT page_url, COUNT(*) as views FROM tracking_pixels 
             WHERE timestamp >= DATE_SUB(NOW(), INTERVAL ? DAY)
             GROUP BY page_url 
             ORDER BY views DESC LIMIT 20',
            [(int)$days]
        );
    }

    /**
     * Get UTM source breakdown
     */
    public function getUtmSources($days = 30) {
        return $this->db->fetchAll(
            'SELECT utm_source, COUNT(*) as count FROM tracking_pixels 
             WHERE timestamp >= DATE_SUB(NOW(), INTERVAL ? DAY) AND utm_source IS NOT NULL
             GROUP BY utm_source 
             ORDER BY count DESC',
            [(int)$days]
        );
    }

    /**
     * Get conversion funnel (page visit counts)
     */
    public function getConversionFunnel($days = 30) {
        return $this->db->fetchOne(
            'SELECT 
                COUNT(DISTINCT lead_id) as unique_visitors,
                COUNT(DISTINCT ip_address) as unique_ips,
                COUNT(*) as total_events
             FROM tracking_pixels 
             WHERE timestamp >= DATE_SUB(NOW(), INTERVAL ? DAY)',
            [(int)$days]
        );
    }
}
?>
