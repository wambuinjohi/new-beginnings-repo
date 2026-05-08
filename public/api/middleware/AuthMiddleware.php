<?php
require_once __DIR__ . '/../../config.php';
/**
 * Authentication Middleware
 */

class AuthMiddleware {
    /**
     * Verify JWT token from Authorization header
     */
    public static function verify() {
        $headers = getallheaders();
        
        if (!isset($headers['Authorization'])) {
            http_response_code(401);
            echo json_encode(['error' => 'Missing authorization header']);
            exit();
        }

        $auth_header = $headers['Authorization'];
        
        if (!preg_match('/^Bearer\s+(.+)$/i', $auth_header, $matches)) {
            http_response_code(401);
            echo json_encode(['error' => 'Invalid authorization header format']);
            exit();
        }

        $token = $matches[1];
        
        try {
            $decoded = self::verifyToken($token);
            $_REQUEST['user_id'] = $decoded['user_id'];
            $_REQUEST['user_email'] = $decoded['email'];
        } catch (Exception $e) {
            http_response_code(401);
            echo json_encode(['error' => 'Invalid token: ' . $e->getMessage()]);
            exit();
        }
    }

    /**
     * Generate JWT token
     */
    public static function generateToken($user_id, $email) {
        $header = json_encode(['typ' => 'JWT', 'alg' => 'HS256']);
        $payload = json_encode([
            'user_id' => $user_id,
            'email' => $email,
            'iat' => time(),
            'exp' => time() + (86400 * 7) // 7 days
        ]);

        $header_encoded = self::base64UrlEncode($header);
        $payload_encoded = self::base64UrlEncode($payload);

        $signature = hash_hmac(
            'sha256',
            "$header_encoded.$payload_encoded",
            JWT_SECRET,
            true
        );
        $signature_encoded = self::base64UrlEncode($signature);

        return "$header_encoded.$payload_encoded.$signature_encoded";
    }

    /**
     * Verify JWT token
     */
    public static function verifyToken($token) {
        $parts = explode('.', $token);
        
        if (count($parts) !== 3) {
            throw new Exception('Invalid token format');
        }

        list($header_encoded, $payload_encoded, $signature_encoded) = $parts;

        // Verify signature
        $signature = hash_hmac(
            'sha256',
            "$header_encoded.$payload_encoded",
            JWT_SECRET,
            true
        );
        
        if (self::base64UrlEncode($signature) !== $signature_encoded) {
            throw new Exception('Invalid signature');
        }

        // Decode payload
        $payload_json = self::base64UrlDecode($payload_encoded);
        $payload = json_decode($payload_json, true);

        // Check expiration
        if (isset($payload['exp']) && $payload['exp'] < time()) {
            throw new Exception('Token expired');
        }

        return $payload;
    }

    /**
     * Base64 URL encode
     */
    private static function base64UrlEncode($data) {
        $b64 = base64_encode($data);
        $b64 = str_replace(['+', '/', '='], ['-', '_', ''], $b64);
        return $b64;
    }

    /**
     * Base64 URL decode
     */
    private static function base64UrlDecode($data) {
        $b64 = str_replace(['-', '_'], ['+', '/'], $data);
        $b64 .= str_repeat('=', 4 - strlen($b64) % 4);
        return base64_decode($b64);
    }
}
?>
