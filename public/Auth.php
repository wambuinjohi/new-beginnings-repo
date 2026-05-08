<?php
/**
 * Authentication Utility
 */

class Auth {
    /**
     * Hash password
     */
    public static function hashPassword($password) {
        return password_hash($password, PASSWORD_BCRYPT, ['cost' => 10]);
    }

    /**
     * Verify password
     */
    public static function verifyPassword($password, $hash) {
        return password_verify($password, $hash);
    }

    /**
     * Generate token
     */
    public static function generateToken($user_id, $email) {
        return AuthMiddleware::generateToken($user_id, $email);
    }

    /**
     * Verify token
     */
    public static function verifyToken($token) {
        return AuthMiddleware::verifyToken($token);
    }

    /**
     * Get current user from request
     */
    public static function getCurrentUser() {
        if (isset($_REQUEST['user_id'])) {
            return [
                'id' => $_REQUEST['user_id'],
                'email' => $_REQUEST['user_email'] ?? null
            ];
        }
        return null;
    }

    /**
     * Check if user is authenticated
     */
    public static function isAuthenticated() {
        return isset($_REQUEST['user_id']);
    }

    /**
     * Generate secure random token
     */
    public static function generateSecureToken($length = 32) {
        return bin2hex(random_bytes($length));
    }
}
?>
