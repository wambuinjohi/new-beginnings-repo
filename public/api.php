<?php
/**
 * Moris Enterprises Marketing Automation API
 * Main router for all API endpoints
 */

// Enable CORS
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Content-Type: application/json');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    echo json_encode(['status' => 'ok']);
    exit();
}

// Load configuration
require_once __DIR__ . '/config.php';

// Load database class
require_once __DIR__ . '/Database.php';

// Load middleware
require_once __DIR__ . '/AuthMiddleware.php';

// Load handlers
require_once __DIR__ . '/LeadHandler.php';
require_once __DIR__ . '/CustomerHandler.php';
require_once __DIR__ . '/CampaignHandler.php';
require_once __DIR__ . '/AuthHandler.php';
require_once __DIR__ . '/ProductHandler.php';
require_once __DIR__ . '/TrackingHandler.php';

// Parse URL
$request_uri = $_SERVER['REQUEST_URI'];

// Remove query string
if (strpos($request_uri, '?') !== false) {
    $request_uri = substr($request_uri, 0, strpos($request_uri, '?'));
}

// Extract route - handle both /api.php/ and /api/ patterns
$route = $request_uri;

// Remove /api.php prefix
if (strpos($route, '/api.php') === 0) {
    $route = substr($route, 8); // strlen('/api.php') = 8
}
// Remove /api prefix
elseif (strpos($route, '/api/') === 0) {
    $route = substr($route, 4); // strlen('/api') = 4
}

// Ensure route starts with /
if (empty($route)) {
    $route = '/';
} elseif ($route[0] !== '/') {
    $route = '/' . $route;
}

$method = $_SERVER['REQUEST_METHOD'];

error_log(sprintf('[api] %s %s -> %s', $method, $_SERVER['REQUEST_URI'] ?? '', $route));

// Route handling
try {
    // Auth routes (public)
    if ($route === '/auth/login' && $method === 'POST') {
        error_log('[api] Handling auth login request');
        $handler = new AuthHandler();
        $handler->login();
    } elseif ($route === '/auth/logout' && $method === 'POST') {
        $handler = new AuthHandler();
        $handler->logout();
    } elseif ($route === '/auth/verify' && $method === 'GET') {
        $handler = new AuthHandler();
        $handler->verify();
    }
    // Public lead creation
    elseif ($route === '/leads' && $method === 'POST') {
        $handler = new LeadHandler();
        $handler->create();
    }
    // Protected routes
    else {
        // Verify authentication for protected routes
        AuthMiddleware::verify();

        // Lead routes (protected)
        if ($route === '/leads' && $method === 'GET') {
            $handler = new LeadHandler();
            $handler->getAll();
        } elseif (preg_match('/^\/leads\/(\d+)$/', $route, $matches)) {
            $id = $matches[1];
            if ($method === 'GET') {
                $handler = new LeadHandler();
                $handler->getById($id);
            } elseif ($method === 'PUT') {
                $handler = new LeadHandler();
                $handler->update($id);
            } elseif ($method === 'DELETE') {
                $handler = new LeadHandler();
                $handler->delete($id);
            }
        }
        // Customer routes
        elseif ($route === '/customers' && $method === 'GET') {
            $handler = new CustomerHandler();
            $handler->getAll();
        } elseif (preg_match('/^\/customers\/(\d+)$/', $route, $matches)) {
            $id = $matches[1];
            if ($method === 'GET') {
                $handler = new CustomerHandler();
                $handler->getById($id);
            }
        } elseif (preg_match('/^\/customers\/(\d+)\/convert$/', $route, $matches)) {
            $lead_id = $matches[1];
            if ($method === 'POST') {
                $handler = new CustomerHandler();
                $handler->convertLead($lead_id);
            }
        }
        // Campaign routes
        elseif ($route === '/campaigns' && $method === 'GET') {
            $handler = new CampaignHandler();
            $handler->getAll();
        } elseif ($route === '/campaigns' && $method === 'POST') {
            $handler = new CampaignHandler();
            $handler->create();
        } elseif (preg_match('/^\/campaigns\/(\d+)$/', $route, $matches)) {
            $id = $matches[1];
            if ($method === 'GET') {
                $handler = new CampaignHandler();
                $handler->getById($id);
            } elseif ($method === 'PUT') {
                $handler = new CampaignHandler();
                $handler->update($id);
            }
        } elseif (preg_match('/^\/campaigns\/(\d+)\/send$/', $route, $matches)) {
            $id = $matches[1];
            if ($method === 'POST') {
                $handler = new CampaignHandler();
                $handler->send($id);
            }
        }
        // Product routes
        elseif ($route === '/products' && $method === 'GET') {
            $handler = new ProductHandler();
            $handler->getAll();
        } elseif ($route === '/products' && $method === 'POST') {
            $handler = new ProductHandler();
            $handler->create();
        } elseif (preg_match('/^\/products\/(\d+)$/', $route, $matches)) {
            $id = $matches[1];
            if ($method === 'GET') {
                $handler = new ProductHandler();
                $handler->getById($id);
            } elseif ($method === 'PUT') {
                $handler = new ProductHandler();
                $handler->update($id);
            } elseif ($method === 'DELETE') {
                $handler = new ProductHandler();
                $handler->delete($id);
            }
        }
        // Analytics routes
        elseif ($route === '/analytics' && $method === 'GET') {
            $handler = new \stdClass();
            echo json_encode([
                'total_leads' => 0,
                'conversion_rate' => 0,
                'avg_lead_score' => 0,
                'pipeline_value' => 0
            ]);
        }
        // Tracking routes
        elseif ($route === '/tracking/pixel' && $method === 'POST') {
            $handler = new TrackingHandler();
            $handler->trackPixel();
        } elseif ($route === '/tracking/stats' && $method === 'GET') {
            $handler = new TrackingHandler();
            $handler->getStats();
        }
        else {
            error_log(sprintf('[api] Endpoint not found for route=%s method=%s', $route, $method));
            http_response_code(404);
            echo json_encode(['error' => 'Endpoint not found']);
        }
    }
} catch (Exception $e) {
    error_log(sprintf('[api] Unhandled exception for route=%s method=%s: %s', $route, $method, $e->getMessage()));
    http_response_code(500);
    echo json_encode([
        'error' => 'Server error',
        'message' => $e->getMessage()
    ]);
}
?>
