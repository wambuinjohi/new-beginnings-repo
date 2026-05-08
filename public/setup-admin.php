<?php
/**
 * Admin Setup Script
 * Initialize admin username and password for Moris Enterprises
 * 
 * Usage (Command Line):
 * php public/setup-admin.php
 * 
 * Or access via browser:
 * https://yoursite.com/setup-admin.php
 */

// Load configuration
require_once __DIR__ . '/config.php';
require_once __DIR__ . '/Database.php';

// Check if running from CLI or browser
$is_cli = php_sapi_name() === 'cli';

function output($message, $type = 'info') {
    global $is_cli;
    if ($is_cli) {
        echo "\n" . ($type === 'error' ? "❌ " : "✅ ") . $message . "\n";
    } else {
        $class = $type === 'error' ? 'error' : 'success';
        echo "<div class='$class'>$message</div>";
    }
}

function prompt($question) {
    global $is_cli;
    if ($is_cli) {
        echo "\n$question: ";
        return trim(fgets(STDIN));
    } else {
        return null;
    }
}

?>
<!DOCTYPE html>
<html>
<head>
    <title>Moris Enterprises - Admin Setup</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            max-width: 600px;
            margin: 50px auto;
            padding: 20px;
            background: #f5f5f5;
        }
        .container {
            background: white;
            padding: 30px;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        h1 {
            color: #333;
            text-align: center;
        }
        .form-group {
            margin-bottom: 20px;
        }
        label {
            display: block;
            margin-bottom: 5px;
            font-weight: bold;
            color: #555;
        }
        input {
            width: 100%;
            padding: 10px;
            border: 1px solid #ddd;
            border-radius: 4px;
            box-sizing: border-box;
            font-size: 14px;
        }
        button {
            background: #20b2aa;
            color: white;
            padding: 12px 30px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 16px;
            width: 100%;
        }
        button:hover {
            background: #1a8f85;
        }
        .message {
            padding: 15px;
            border-radius: 4px;
            margin-bottom: 20px;
        }
        .success {
            background: #d4edda;
            color: #155724;
            border: 1px solid #c3e6cb;
        }
        .error {
            background: #f8d7da;
            color: #721c24;
            border: 1px solid #f5c6cb;
        }
        .warning {
            background: #fff3cd;
            color: #856404;
            border: 1px solid #ffeeba;
        }
        .info {
            background: #d1ecf1;
            color: #0c5460;
            border: 1px solid #bee5eb;
        }
        .form-group small {
            display: block;
            margin-top: 5px;
            color: #666;
            font-size: 12px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>⚙️ Moris Enterprises Admin Setup</h1>
        
        <?php
        // Handle form submission
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            try {
                $email = trim($_POST['email'] ?? '');
                $password = $_POST['password'] ?? '';
                $confirm_password = $_POST['confirm_password'] ?? '';
                $name = trim($_POST['name'] ?? 'Admin User');

                // Validate inputs
                if (empty($email)) {
                    throw new Exception('Email is required');
                }
                if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
                    throw new Exception('Invalid email format');
                }
                if (empty($password)) {
                    throw new Exception('Password is required');
                }
                if (strlen($password) < 8) {
                    throw new Exception('Password must be at least 8 characters long');
                }
                if ($password !== $confirm_password) {
                    throw new Exception('Passwords do not match');
                }

                // Hash the password
                $password_hash = password_hash($password, PASSWORD_BCRYPT);

                // Connect to database
                $db = Database::getInstance();
                $conn = $db->getConnection();

                // Check if admin already exists
                $stmt = $conn->prepare('SELECT id FROM users WHERE email = ?');
                $stmt->bind_param('s', $email);
                $stmt->execute();
                $result = $stmt->get_result();
                $existing_user = $result->fetch_assoc();
                $stmt->close();

                if ($existing_user) {
                    // Update existing admin
                    $stmt = $conn->prepare('UPDATE users SET name = ?, password_hash = ?, status = ?, role = ? WHERE email = ?');
                    $status = 'active';
                    $role = 'admin';
                    $stmt->bind_param('sssss', $name, $password_hash, $status, $role, $email);
                    $stmt->execute();
                    $stmt->close();
                    echo '<div class="message success">✅ Admin user updated successfully!</div>';
                } else {
                    // Create new admin
                    $stmt = $conn->prepare('INSERT INTO users (name, email, password_hash, role, status) VALUES (?, ?, ?, ?, ?)');
                    $role = 'admin';
                    $status = 'active';
                    $stmt->bind_param('sssss', $name, $email, $password_hash, $role, $status);
                    $stmt->execute();
                    $stmt->close();
                    echo '<div class="message success">✅ Admin user created successfully!</div>';
                }

                echo '<div class="message info">You can now login at <strong>/admin/login</strong><br>Email: ' . htmlspecialchars($email) . '</div>';
            } catch (Exception $e) {
                echo '<div class="message error">❌ Error: ' . htmlspecialchars($e->getMessage()) . '</div>';
            }
        }
        ?>

        <form method="POST">
            <div class="form-group">
                <label for="name">Admin Name</label>
                <input type="text" id="name" name="name" value="Admin User" required>
                <small>Display name for the admin user</small>
            </div>

            <div class="form-group">
                <label for="email">Admin Email</label>
                <input type="email" id="email" name="email" placeholder="admin@morisentreprises.com" required>
                <small>Email for admin login</small>
            </div>

            <div class="form-group">
                <label for="password">Password</label>
                <input type="password" id="password" name="password" placeholder="Min 8 characters" required>
                <small>Must be at least 8 characters long</small>
            </div>

            <div class="form-group">
                <label for="confirm_password">Confirm Password</label>
                <input type="password" id="confirm_password" name="confirm_password" placeholder="Confirm your password" required>
                <small>Must match the password above</small>
            </div>

            <button type="submit">Create/Update Admin User</button>
        </form>

        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; color: #666; font-size: 12px;">
            <p><strong>Command Line Usage:</strong></p>
            <code>php public/setup-admin.php</code>
            <p style="margin-top: 10px; color: #999;">After setup, delete this file for security: <code>rm public/setup-admin.php</code></p>
        </div>
    </div>
</body>
</html>

<?php
// Handle CLI mode
if ($is_cli) {
    echo "\n╔════════════════════════════════════════════════════════╗\n";
    echo "║  Moris Enterprises - Admin Setup Script               ║\n";
    echo "╚════════════════════════════════════════════════════════╝\n";

    try {
        // Get email input
        $email = prompt('Enter admin email');
        if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
            output('Invalid email format', 'error');
            exit(1);
        }

        // Get password input
        $password = prompt('Enter admin password (min 8 chars)');
        if (empty($password) || strlen($password) < 8) {
            output('Password must be at least 8 characters long', 'error');
            exit(1);
        }

        // Confirm password
        $confirm_password = prompt('Confirm admin password');
        if ($password !== $confirm_password) {
            output('Passwords do not match', 'error');
            exit(1);
        }

        // Get name (optional)
        $name = prompt('Enter admin name (default: Admin User)');
        if (empty($name)) {
            $name = 'Admin User';
        }

        // Hash password
        $password_hash = password_hash($password, PASSWORD_BCRYPT);

        // Connect to database
        $db = Database::getInstance();
        $conn = $db->getConnection();

        // Check if admin exists
        $stmt = $conn->prepare('SELECT id FROM users WHERE email = ?');
        $stmt->bind_param('s', $email);
        $stmt->execute();
        $result = $stmt->get_result();
        $existing_user = $result->fetch_assoc();
        $stmt->close();

        if ($existing_user) {
            // Update
            $stmt = $conn->prepare('UPDATE users SET name = ?, password_hash = ?, status = ?, role = ? WHERE email = ?');
            $status = 'active';
            $role = 'admin';
            $stmt->bind_param('sssss', $name, $password_hash, $status, $role, $email);
            $stmt->execute();
            $stmt->close();
            output('Admin user updated successfully!');
        } else {
            // Create
            $stmt = $conn->prepare('INSERT INTO users (name, email, password_hash, role, status) VALUES (?, ?, ?, ?, ?)');
            $role = 'admin';
            $status = 'active';
            $stmt->bind_param('sssss', $name, $email, $password_hash, $role, $status);
            $stmt->execute();
            $stmt->close();
            output('Admin user created successfully!');
        }

        echo "\n📧 Email: $email\n";
        echo "👤 Name: $name\n";
        echo "\n✨ Setup complete! Login at /admin/login\n";
        echo "⚠️  Remember to delete this script for security\n\n";

    } catch (Exception $e) {
        output($e->getMessage(), 'error');
        exit(1);
    }
}
?>
