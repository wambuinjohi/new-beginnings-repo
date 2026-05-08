<?php
/**
 * Tracking Handler for retargeting pixels and analytics
 */

class TrackingHandler {
    private $db;

    public function __construct() {
        $this->db = Database::getInstance()->getConnection();
    }

    /**
     * Track page pixel/event
     */
    public function trackPixel() {
        try {
            $input = json_decode(file_get_contents('php://input'), true);

            $lead_id = $input['lead_id'] ?? null;
            $page_url = $input['page_url'] ?? $_SERVER['HTTP_REFERER'] ?? null;
            $utm_source = $input['utm_source'] ?? $_GET['utm_source'] ?? null;
            $utm_medium = $input['utm_medium'] ?? $_GET['utm_medium'] ?? null;
            $utm_campaign = $input['utm_campaign'] ?? $_GET['utm_campaign'] ?? null;
            $user_agent = $_SERVER['HTTP_USER_AGENT'] ?? null;
            $ip_address = $_SERVER['REMOTE_ADDR'] ?? null;

            // Log tracking pixel
            $this->db->execute(
                'INSERT INTO tracking_pixels (lead_id, page_url, utm_source, utm_medium, utm_campaign, user_agent, ip_address) 
                 VALUES (?, ?, ?, ?, ?, ?, ?)',
                [$lead_id, $page_url, $utm_source, $utm_medium, $utm_campaign, $user_agent, $ip_address]
            );

            // Update lead score if lead_id provided
            if ($lead_id) {
                $this->db->execute(
                    'UPDATE leads SET score = score + 3 WHERE id = ?',
                    [(int)$lead_id]
                );
            }

            http_response_code(200);
            echo json_encode(['message' => 'Pixel tracked']);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['error' => $e->getMessage()]);
        }
    }

    /**
     * Get tracking stats
     */
    public function getStats() {
        try {
            $lead_id = $_GET['lead_id'] ?? null;
            $days = $_GET['days'] ?? 30;

            $query = 'SELECT 
                        COUNT(*) as total_events,
                        COUNT(DISTINCT lead_id) as unique_leads,
                        COUNT(DISTINCT page_url) as unique_pages
                      FROM tracking_pixels 
                      WHERE timestamp >= DATE_SUB(NOW(), INTERVAL ? DAY)';
            $params = [(int)$days];

            if ($lead_id) {
                $query .= ' AND lead_id = ?';
                $params[] = (int)$lead_id;
            }

            $stats = $this->db->fetchOne($query, $params);

            // Get top pages
            $top_pages = $this->db->fetchAll(
                'SELECT page_url, COUNT(*) as views FROM tracking_pixels 
                 WHERE timestamp >= DATE_SUB(NOW(), INTERVAL ? DAY)
                 GROUP BY page_url 
                 ORDER BY views DESC 
                 LIMIT 10',
                [(int)$days]
            );

            // Get utm source breakdown
            $utm_sources = $this->db->fetchAll(
                'SELECT utm_source, COUNT(*) as count FROM tracking_pixels 
                 WHERE timestamp >= DATE_SUB(NOW(), INTERVAL ? DAY) AND utm_source IS NOT NULL
                 GROUP BY utm_source 
                 ORDER BY count DESC',
                [(int)$days]
            );

            http_response_code(200);
            echo json_encode([
                'stats' => $stats,
                'top_pages' => $top_pages,
                'utm_sources' => $utm_sources
            ]);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['error' => $e->getMessage()]);
        }
    }
}
?>
