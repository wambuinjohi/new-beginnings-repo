<?php
/**
 * Drip processor — run every 5 minutes via cron:
 *   *\/5 * * * * /usr/bin/php /var/www/html/public/cron/process-drip.php >> /var/log/moris-drip.log 2>&1
 *
 * Sends pending Day-2 / Day-7 drip emails for leads enrolled by LeadHandler.
 * Day-0 sends inline at lead-creation time, so this only handles step 2 and 7.
 */

require_once __DIR__ . '/../config.php';
require_once __DIR__ . '/../EmailService.php';

$db = Database::getInstance();
$email = new EmailService();

$rows = $db->fetchAll(
    "SELECT s.id, s.lead_id, s.step, l.name, l.email, l.product_interest, l.status
       FROM lead_drip_schedule s
       JOIN leads l ON l.id = s.lead_id
      WHERE s.status = 'pending'
        AND s.scheduled_at <= NOW()
        AND s.step IN (2, 7)
      ORDER BY s.scheduled_at ASC
      LIMIT 100"
);

$sent = 0; $skipped = 0; $failed = 0;

foreach ($rows as $row) {
    // Skip converted or unsubscribed leads
    if (in_array(strtolower($row['status'] ?? ''), ['converted', 'lost', 'unsubscribed'], true)) {
        $db->execute(
            "UPDATE lead_drip_schedule SET status='skipped' WHERE id=?",
            [(int)$row['id']]
        );
        $skipped++;
        continue;
    }

    $tplFile = $row['step'] == 2 ? 'drip-day2.html' : 'drip-day7.html';
    $subject = $row['step'] == 2
        ? 'A few HACH picks for your lab'
        : 'Still considering us? A quick note from Moris One';

    $path = __DIR__ . '/../email-templates/' . $tplFile;
    if (!file_exists($path)) { $failed++; continue; }

    $body = $email->renderTemplate(file_get_contents($path), [
        'name' => $row['name'] ?: 'there',
        'product_interest' => $row['product_interest'] ?: 'our products',
    ]);

    $token = bin2hex(random_bytes(16));
    $ok = $email->sendCampaignEmail(
        $row['email'],
        $subject,
        $body,
        null,
        (int)$row['lead_id'],
        $token
    );

    if ($ok) {
        $db->execute(
            "UPDATE lead_drip_schedule SET status='sent', sent_at=NOW(), attempts=attempts+1 WHERE id=?",
            [(int)$row['id']]
        );
        $sent++;
    } else {
        $db->execute(
            "UPDATE lead_drip_schedule SET attempts=attempts+1, last_error=? WHERE id=?",
            ['Send failed', (int)$row['id']]
        );
        $failed++;
    }
}

echo sprintf("[%s] drip processed=%d sent=%d skipped=%d failed=%d\n",
    date('c'), count($rows), $sent, $skipped, $failed);
