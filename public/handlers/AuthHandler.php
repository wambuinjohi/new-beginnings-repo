<?php
require_once __DIR__ . '/../config.php';
/**
 * Authentication Handler
 */

class AuthHandler {
    private $db;

    public function __construct() {
        $this->db = Database::getInstance();
    }

    /**
     * Admin login
     */
    public function login() {
        try {
            $raw_input = file_get_contents('php://input');
            $input = json_decode($raw_input, true);
            $email = isset($input['email']) ? trim($input['email']) : 'missing';

            error_log(sprintf('[auth] Login attempt received for email=%s', $email));

            if (!is_array($input) || !isset($input['email']) || !isset($input['password'])) {
                error_log('[auth] Login request missing required fields or contains invalid JSON');
                http_response_code(400);
                echo json_encode(['error' => 'Email and password are required']);
                return;
            }

            $email = trim($input['email']);
            $password = $input['password'];

            $conn = $this->db->getConnection();
            $stmt = $conn->prepare('SELECT id, email, password_hash, name FROM users WHERE email = ? AND status = ? LIMIT 1');
            $status = 'active';
            $stmt->bind_param('ss', $email, $status);
            $stmt->execute();

            $result = $stmt->get_result();

            if ($result && $result->num_rows > 0) {
                $user = $result->fetch_assoc();
            } else {
                $user = null;
            }

            $stmt->close();

            if (!$user) {
                error_log(sprintf('[auth] Login failed: user not found for email=%s', $email));
                http_response_code(401);
                echo json_encode(['error' => 'Invalid credentials']);
                return;
            }

            // Verify password
            if (!password_verify($password, $user['password_hash'])) {
                error_log(sprintf('[auth] Login failed: invalid password for email=%s', $email));
                http_response_code(401);
                echo json_encode(['error' => 'Invalid credentials']);
                return;
            }

            // Generate JWT token
            $token = AuthMiddleware::generateToken($user['id'], $user['email']);

            error_log(sprintf('[auth] Login successful for user_id=%s email=%s', $user['id'], $email));
            http_response_code(200);
            echo json_encode([
                'token' => $token,
                'user' => [
                    'id' => $user['id'],
                    'email' => $user['email'],
                    'name' => $user['name']
                ]
            ]);
        } catch (Exception $e) {
            error_log(sprintf('[auth] Login exception: %s', $e->getMessage()));
            http_response_code(500);
            echo json_encode(['error' => $e->getMessage()]);
        }
    }

    /**
     * Logout (client-side token deletion)
     */
    public function logout() {
        http_response_code(200);
        echo json_encode(['message' => 'Logged out successfully']);
    }

    /**
     * Verify token
     */
    public function verify() {
        try {
            error_log('[auth] Token verification requested');
            AuthMiddleware::verify();

            $user_id = $_REQUEST['user_id'];

            // Get user details
            $user = $this->db->fetchOne(
                'SELECT id, email, name FROM users WHERE id = ?',
                [$user_id]
            );

            if (!$user) {
                error_log(sprintf('[auth] Token verification failed: user not found for user_id=%s', $user_id));
                http_response_code(401);
                echo json_encode(['error' => 'User not found']);
                return;
            }

            error_log(sprintf('[auth] Token verification successful for user_id=%s', $user_id));
            http_response_code(200);
            echo json_encode([
                'user' => $user,
                'valid' => true
            ]);
        } catch (Exception $e) {
            error_log(sprintf('[auth] Token verification failed: %s', $e->getMessage()));
            http_response_code(401);
            echo json_encode(['error' => $e->getMessage()]);
        }
    }
}
?>
