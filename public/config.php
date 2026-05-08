<?php
/**
 * Moris Enterprises API Configuration
 */

// Load environment variables from .env file if it exists
$env_file = __DIR__ . '/.env';
if (file_exists($env_file)) {
    $lines = file($env_file, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    foreach ($lines as $line) {
        if (strpos($line, '#') === 0) continue;
        if (strpos($line, '=') !== false) {
            list($key, $value) = explode('=', $line, 2);
            $key = trim($key);
            $value = trim($value);
            if (!empty($key)) {
                putenv("$key=$value");
            }
        }
    }
}

// Database Configuration
define('DB_HOST', 'localhost');
define('DB_USER', 'excelmed_morismarketing');
define('DB_PASSWORD', 'Sirgeorge.12');
define('DB_NAME', 'excelmed_morismarketing');

// API Configuration
define('API_URL', 'https://morisentreprises.com/api.php');
define('JWT_SECRET', 'your_secret_key_here_change_in_production');

// SMTP Configuration for Email
define('SMTP_HOST', 'smtp.gmail.com');
define('SMTP_PORT', 587);
define('SMTP_USER', 'admin@morisentreprises.com');
define('SMTP_PASSWORD', 'Sirgeorge.12');

// Admin Configuration
define('ADMIN_EMAIL', 'admin@morisentreprises.com');

// Ensure we're using UTC timezone
date_default_timezone_set('UTC');

// Enable error reporting (disable in production)
if (getenv('APP_ENV') === 'development') {
    error_reporting(E_ALL);
    ini_set('display_errors', 1);
} else {
    error_reporting(E_ALL);
    ini_set('display_errors', 0);
}
?>
