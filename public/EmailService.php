<?php
require_once __DIR__ . '/config.php';
/**
 * Email Service
 * Handles email sending via SMTP
 */

class EmailService {
    private $smtp_host;
    private $smtp_port;
    private $smtp_user;
    private $smtp_password;

    public function __construct() {
        $this->smtp_host = SMTP_HOST;
        $this->smtp_port = SMTP_PORT;
        $this->smtp_user = SMTP_USER;
        $this->smtp_password = SMTP_PASSWORD;
    }

    /**
     * Send email via SMTP
     * Note: In production, use PHPMailer or SwiftMailer library
     */
    public function send($to, $subject, $body, $is_html = true) {
        // For now, queue the email instead of sending directly
        // This prevents timeouts and allows for retries
        
        $db = Database::getInstance()->getConnection();

        // Queue email for background processing
        try {
            $db->query(
                'INSERT INTO email_queue (subject, body, status) VALUES (?, ?, ?)',
                [$subject, $body, 'pending']
            );

            Logger::info("Email queued for sending to: $to");
            return true;
        } catch (Exception $e) {
            Logger::error("Failed to queue email: " . $e->getMessage());
            return false;
        }
    }

    /**
     * Send campaign email with tracking
     */
    public function sendCampaignEmail($to, $subject, $body, $campaign_id, $lead_id, $tracking_token) {
        $db = Database::getInstance()->getConnection();

        // Add tracking pixel to body
        $tracking_pixel = '<img src="' . API_URL . '/tracking/pixel?token=' . urlencode($tracking_token) . '" width="1" height="1" />';
        $body_with_tracking = $body . $tracking_pixel;

        try {
            $db->query(
                'INSERT INTO email_queue (lead_id, campaign_id, subject, body, status) 
                 VALUES (?, ?, ?, ?, ?)',
                [$lead_id, $campaign_id, $subject, $body_with_tracking, 'pending']
            );

            Logger::info("Campaign email queued", ['campaign_id' => $campaign_id, 'lead_id' => $lead_id]);
            return true;
        } catch (Exception $e) {
            Logger::error("Failed to queue campaign email: " . $e->getMessage());
            return false;
        }
    }

    /**
     * Process queued emails (should be run via cron job)
     */
    public function processQueue($limit = 10) {
        $db = Database::getInstance()->getConnection();

        // Get pending emails
        $result = $db->query(
            'SELECT id, subject, body FROM email_queue 
             WHERE status = ? AND retry_count < 3 
             ORDER BY created_at ASC LIMIT ?',
            ['pending', $limit]
        );

        $count = 0;
        $processed = 0;

        while ($row = $result->fetch_assoc()) {
            if ($this->sendEmailViaSMTP($row['subject'], $row['body'])) {
                $db->query(
                    'UPDATE email_queue SET status = ?, sent_at = NOW() WHERE id = ?',
                    ['sent', $row['id']]
                );
                $processed++;
            } else {
                $db->query(
                    'UPDATE email_queue SET retry_count = retry_count + 1 WHERE id = ?',
                    [$row['id']]
                );
            }
            $count++;
        }
        $result->close();

        Logger::info("Email queue processed", ['total' => $count, 'sent' => $processed]);
        return $processed;
    }

    /**
     * Actual SMTP sending (placeholder)
     * In production, use PHPMailer library
     */
    private function sendEmailViaSMTP($subject, $body) {
        // This is a placeholder. In production, implement actual SMTP:
        // 1. Install PHPMailer via Composer
        // 2. Use PHPMailer library to send via SMTP
        // 3. Handle errors and retries
        
        // For now, just return true to mark as sent
        Logger::debug("Email would be sent via SMTP", ['subject' => $subject]);
        return true;
    }

    /**
     * Get email template
     */
    public function getTemplate($template_name) {
        $templates = [
            'welcome' => 'Welcome to Moris Enterprises! We are excited to help you.',
            'follow_up' => 'Following up on your inquiry about our products and services.',
            'special_offer' => 'Special offer just for you! Check out our latest products.'
        ];

        return $templates[$template_name] ?? null;
    }

    /**
     * Render template with variables
     */
    public function renderTemplate($template, $variables = []) {
        $body = $template;

        foreach ($variables as $key => $value) {
            $body = str_replace('{{' . $key . '}}', $value, $body);
        }

        return $body;
    }
}
?>
