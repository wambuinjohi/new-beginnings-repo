<?php
/**
 * File Upload Handler
 * Handles uploads for products, campaigns, and documents
 */

require_once __DIR__ . '/config.php';
require_once __DIR__ . '/Database.php';
require_once __DIR__ . '/AuthMiddleware.php';

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

try {
    // Verify authentication
    AuthMiddleware::verify();

    // Check if file is uploaded
    if (!isset($_FILES['file'])) {
        http_response_code(400);
        echo json_encode(['error' => 'No file provided']);
        exit();
    }

    $file = $_FILES['file'];
    $upload_type = $_POST['type'] ?? 'documents'; // products, campaigns, documents

    // Validate upload type
    $allowed_types = ['products', 'campaigns', 'documents'];
    if (!in_array($upload_type, $allowed_types)) {
        http_response_code(400);
        echo json_encode(['error' => 'Invalid upload type']);
        exit();
    }

    // Validate file
    if ($file['error'] !== UPLOAD_ERR_OK) {
        http_response_code(400);
        echo json_encode(['error' => 'File upload error: ' . $file['error']]);
        exit();
    }

    // File size limit (10MB)
    $max_size = 10 * 1024 * 1024;
    if ($file['size'] > $max_size) {
        http_response_code(400);
        echo json_encode(['error' => 'File size exceeds 10MB limit']);
        exit();
    }

    // Allowed file types
    $allowed_extensions = ['jpg', 'jpeg', 'png', 'gif', 'pdf', 'doc', 'docx'];
    $file_ext = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));

    if (!in_array($file_ext, $allowed_extensions)) {
        http_response_code(400);
        echo json_encode(['error' => 'File type not allowed']);
        exit();
    }

    // Create uploads directory if not exists
    $upload_dir = __DIR__ . '/uploads/' . $upload_type;
    if (!is_dir($upload_dir)) {
        mkdir($upload_dir, 0755, true);
    }

    // Generate unique filename
    $timestamp = time();
    $random_str = substr(md5(rand()), 0, 8);
    $filename = $timestamp . '_' . $random_str . '.' . $file_ext;
    $filepath = $upload_dir . '/' . $filename;

    // Move uploaded file
    if (!move_uploaded_file($file['tmp_name'], $filepath)) {
        http_response_code(500);
        echo json_encode(['error' => 'Failed to save file']);
        exit();
    }

    // Generate URL
    $file_url = '/uploads/' . $upload_type . '/' . $filename;

    // Log to database
    $db = Database::getInstance();
    $db->execute(
        'INSERT INTO file_uploads (filename, original_name, file_type, file_path, file_url, file_size, mime_type, uploaded_by) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        [
            $filename,
            $file['name'],
            $upload_type,
            $filepath,
            $file_url,
            $file['size'],
            $file['type'],
            $_REQUEST['user_id'] ?? null
        ]
    );

    http_response_code(200);
    echo json_encode([
        'success' => true,
        'message' => 'File uploaded successfully',
        'filename' => $filename,
        'url' => $file_url,
        'size' => $file['size'],
        'type' => $upload_type
    ]);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'error' => 'Upload failed',
        'message' => $e->getMessage()
    ]);
}
?>
