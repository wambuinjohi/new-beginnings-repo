<?php
/**
 * Product Handler
 */

class ProductHandler {
    private $db;

    public function __construct() {
        $this->db = Database::getInstance()->getConnection();
    }

    /**
     * Get all products
     */
    public function getAll() {
        try {
            $category = $_GET['category'] ?? null;
            $status = $_GET['status'] ?? 'active';
            $limit = min($_GET['limit'] ?? 100, 500);
            $offset = $_GET['offset'] ?? 0;

            $query = 'SELECT * FROM products WHERE 1=1';
            $params = [];

            if ($status) {
                $query .= ' AND status = ?';
                $params[] = $status;
            }
            if ($category) {
                $query .= ' AND category = ?';
                $params[] = $category;
            }

            $query .= ' ORDER BY created_at DESC LIMIT ? OFFSET ?';
            $params[] = (int)$limit;
            $params[] = (int)$offset;

            $products = $this->db->fetchAll($query, $params);

            http_response_code(200);
            echo json_encode([
                'products' => $products,
                'count' => count($products)
            ]);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['error' => $e->getMessage()]);
        }
    }

    /**
     * Get single product
     */
    public function getById($id) {
        try {
            $product = $this->db->fetchOne(
                'SELECT * FROM products WHERE id = ?',
                [(int)$id]
            );

            if (!$product) {
                http_response_code(404);
                echo json_encode(['error' => 'Product not found']);
                return;
            }

            http_response_code(200);
            echo json_encode(['product' => $product]);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['error' => $e->getMessage()]);
        }
    }

    /**
     * Create product
     */
    public function create() {
        try {
            $input = json_decode(file_get_contents('php://input'), true);

            $name = $input['name'] ?? null;
            $category = $input['category'] ?? null;
            $price = $input['price'] ?? 0;
            $stock = $input['stock'] ?? 0;
            $sku = $input['sku'] ?? null;
            $description = $input['description'] ?? null;

            if (!$name) {
                http_response_code(400);
                echo json_encode(['error' => 'Product name is required']);
                return;
            }

            $id = $this->db->insert(
                'INSERT INTO products (name, category, price, stock, sku, description, status) 
                 VALUES (?, ?, ?, ?, ?, ?, ?)',
                [$name, $category, $price, $stock, $sku, $description, 'active']
            );

            http_response_code(201);
            echo json_encode([
                'message' => 'Product created',
                'product_id' => $id
            ]);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['error' => $e->getMessage()]);
        }
    }

    /**
     * Update product
     */
    public function update($id) {
        try {
            $input = json_decode(file_get_contents('php://input'), true);

            $update_fields = [];
            $params = [];

            if (isset($input['name'])) {
                $update_fields[] = 'name = ?';
                $params[] = $input['name'];
            }
            if (isset($input['category'])) {
                $update_fields[] = 'category = ?';
                $params[] = $input['category'];
            }
            if (isset($input['price'])) {
                $update_fields[] = 'price = ?';
                $params[] = (float)$input['price'];
            }
            if (isset($input['stock'])) {
                $update_fields[] = 'stock = ?';
                $params[] = (int)$input['stock'];
            }
            if (isset($input['description'])) {
                $update_fields[] = 'description = ?';
                $params[] = $input['description'];
            }
            if (isset($input['status'])) {
                $update_fields[] = 'status = ?';
                $params[] = $input['status'];
            }

            if (empty($update_fields)) {
                http_response_code(400);
                echo json_encode(['error' => 'No fields to update']);
                return;
            }

            $params[] = (int)$id;
            $query = 'UPDATE products SET ' . implode(', ', $update_fields) . ' WHERE id = ?';
            
            $this->db->execute($query, $params);

            http_response_code(200);
            echo json_encode(['message' => 'Product updated']);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['error' => $e->getMessage()]);
        }
    }

    /**
     * Delete product
     */
    public function delete($id) {
        try {
            // Soft delete by setting status to inactive
            $this->db->execute(
                'UPDATE products SET status = ? WHERE id = ?',
                ['inactive', (int)$id]
            );

            http_response_code(200);
            echo json_encode(['message' => 'Product deleted']);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['error' => $e->getMessage()]);
        }
    }
}
?>
