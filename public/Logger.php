<?php
/**
 * Logger Utility
 */

class Logger {
    private static $log_dir = __DIR__ . '/../../logs';

    /**
     * Initialize log directory
     */
    public static function init() {
        if (!is_dir(self::$log_dir)) {
            mkdir(self::$log_dir, 0755, true);
        }
    }

    /**
     * Log message
     */
    public static function log($message, $level = 'INFO', $context = []) {
        self::init();
        
        $log_file = self::$log_dir . '/app_' . date('Y-m-d') . '.log';
        $timestamp = date('Y-m-d H:i:s');
        
        $log_entry = "[$timestamp] [$level] $message";
        
        if (!empty($context)) {
            $log_entry .= ' ' . json_encode($context);
        }
        
        error_log($log_entry . "\n", 3, $log_file);
    }

    /**
     * Log info
     */
    public static function info($message, $context = []) {
        self::log($message, 'INFO', $context);
    }

    /**
     * Log error
     */
    public static function error($message, $context = []) {
        self::log($message, 'ERROR', $context);
    }

    /**
     * Log warning
     */
    public static function warning($message, $context = []) {
        self::log($message, 'WARNING', $context);
    }

    /**
     * Log debug
     */
    public static function debug($message, $context = []) {
        if (getenv('APP_ENV') === 'development') {
            self::log($message, 'DEBUG', $context);
        }
    }

    /**
     * Log API request
     */
    public static function logRequest($route, $method, $user_id = null) {
        self::info("API Request: $method $route", ['user_id' => $user_id]);
    }

    /**
     * Log API response
     */
    public static function logResponse($status_code) {
        self::info("API Response: $status_code");
    }
}
?>
