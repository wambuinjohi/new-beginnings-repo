-- Moris Enterprises Database Migrations
-- Database: excelmed_morismarketing
-- Created for API and Admin Dashboard

-- ============================================================================
-- 1. USERS TABLE - Admin users for authentication
-- ============================================================================
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(50) DEFAULT 'admin' COMMENT 'admin, manager, viewer',
  status VARCHAR(50) DEFAULT 'active' COMMENT 'active, inactive, suspended',
  last_login DATETIME,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_email (email),
  INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================================
-- 2. LEADS TABLE - Lead management and scoring
-- ============================================================================
CREATE TABLE IF NOT EXISTS leads (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  phone VARCHAR(20),
  company VARCHAR(255),
  source VARCHAR(100) DEFAULT 'form' COMMENT 'form, email, social, referral, other',
  product_interest VARCHAR(255) COMMENT 'Products/services they are interested in',
  status VARCHAR(50) DEFAULT 'new' COMMENT 'new, contacted, qualified, converted, lost, nurture',
  score INT DEFAULT 0 COMMENT 'Lead scoring points',
  notes LONGTEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_email (email),
  INDEX idx_status (status),
  INDEX idx_source (source),
  INDEX idx_score (score),
  INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================================
-- 3. CUSTOMERS TABLE - Converted leads and customer management
-- ============================================================================
CREATE TABLE IF NOT EXISTS customers (
  id INT AUTO_INCREMENT PRIMARY KEY,
  lead_id INT,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  phone VARCHAR(20),
  company VARCHAR(255),
  status VARCHAR(50) DEFAULT 'active' COMMENT 'active, inactive, churned, suspended',
  lifetime_value DECIMAL(12, 2) DEFAULT 0,
  total_purchases INT DEFAULT 0,
  last_purchase_date DATETIME,
  payment_status VARCHAR(50) DEFAULT 'current' COMMENT 'current, overdue, defaulted',
  notes LONGTEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (lead_id) REFERENCES leads(id) ON DELETE SET NULL,
  INDEX idx_email (email),
  INDEX idx_status (status),
  INDEX idx_lifetime_value (lifetime_value),
  INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================================
-- 4. PRODUCTS TABLE - Product catalog management
-- ============================================================================
CREATE TABLE IF NOT EXISTS products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description LONGTEXT,
  category VARCHAR(100) COMMENT 'Laboratory Chemicals, Medical Equipment, Automobile Supplies, etc.',
  price DECIMAL(12, 2),
  stock INT DEFAULT 0,
  status VARCHAR(50) DEFAULT 'active' COMMENT 'active, inactive, discontinued',
  sku VARCHAR(100) UNIQUE,
  image_url VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_category (category),
  INDEX idx_status (status),
  INDEX idx_price (price)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================================
-- 5. CAMPAIGNS TABLE - Email marketing campaigns
-- ============================================================================
CREATE TABLE IF NOT EXISTS campaigns (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  subject VARCHAR(255),
  template LONGTEXT COMMENT 'Email template HTML',
  schedule DATETIME COMMENT 'Scheduled send time',
  status VARCHAR(50) DEFAULT 'draft' COMMENT 'draft, scheduled, sent, paused, failed',
  created_by INT,
  recipients_count INT DEFAULT 0,
  sent_count INT DEFAULT 0 COMMENT 'Total sent',
  opened_count INT DEFAULT 0 COMMENT 'Email opens',
  clicked_count INT DEFAULT 0 COMMENT 'Link clicks',
  unsubscribe_count INT DEFAULT 0,
  bounce_count INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  sent_at DATETIME,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL,
  INDEX idx_status (status),
  INDEX idx_created_at (created_at),
  INDEX idx_sent_at (sent_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================================
-- 6. TRACKING_PIXELS TABLE - Retargeting and analytics tracking
-- ============================================================================
CREATE TABLE IF NOT EXISTS tracking_pixels (
  id INT AUTO_INCREMENT PRIMARY KEY,
  lead_id INT,
  page_url VARCHAR(500),
  utm_source VARCHAR(100) COMMENT 'UTM source parameter',
  utm_medium VARCHAR(100) COMMENT 'UTM medium parameter',
  utm_campaign VARCHAR(100) COMMENT 'UTM campaign parameter',
  user_agent LONGTEXT,
  ip_address VARCHAR(45),
  event_type VARCHAR(100) DEFAULT 'pageview' COMMENT 'pageview, click, form, etc.',
  event_data LONGTEXT COMMENT 'JSON event data',
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (lead_id) REFERENCES leads(id) ON DELETE CASCADE,
  INDEX idx_lead_id (lead_id),
  INDEX idx_timestamp (timestamp),
  INDEX idx_utm_source (utm_source),
  INDEX idx_utm_campaign (utm_campaign),
  INDEX idx_page_url (page_url)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================================
-- 7. CAMPAIGN_RECIPIENTS TABLE - Track campaign delivery
-- ============================================================================
CREATE TABLE IF NOT EXISTS campaign_recipients (
  id INT AUTO_INCREMENT PRIMARY KEY,
  campaign_id INT NOT NULL,
  customer_id INT,
  lead_id INT,
  email VARCHAR(255) NOT NULL,
  status VARCHAR(50) DEFAULT 'pending' COMMENT 'pending, sent, opened, clicked, bounced, unsubscribed',
  opened_at DATETIME,
  clicked_at DATETIME,
  sent_at DATETIME,
  bounce_reason VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (campaign_id) REFERENCES campaigns(id) ON DELETE CASCADE,
  FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE SET NULL,
  FOREIGN KEY (lead_id) REFERENCES leads(id) ON DELETE SET NULL,
  INDEX idx_campaign_id (campaign_id),
  INDEX idx_email (email),
  INDEX idx_status (status),
  INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================================
-- 8. AUDIT_LOG TABLE - System audit trail
-- ============================================================================
CREATE TABLE IF NOT EXISTS audit_log (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  action VARCHAR(100) COMMENT 'create, update, delete, login, logout',
  entity_type VARCHAR(100) COMMENT 'lead, customer, campaign, product, etc.',
  entity_id INT,
  old_values LONGTEXT COMMENT 'JSON old values',
  new_values LONGTEXT COMMENT 'JSON new values',
  ip_address VARCHAR(45),
  user_agent LONGTEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
  INDEX idx_user_id (user_id),
  INDEX idx_action (action),
  INDEX idx_entity_type (entity_type),
  INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================================
-- INSERT DEFAULT ADMIN USER
-- ============================================================================
-- Default admin user: admin@morisentreprises.com
-- Password: Sirgeorge.12 (already hashed with password_hash())
-- You need to generate the hash from your admin interface or run:
-- echo password_hash('Sirgeorge.12', PASSWORD_BCRYPT);

INSERT INTO users (name, email, password_hash, role, status) VALUES 
(
  'Admin User',
  'admin@morisentreprises.com',
  '$2y$10$YourHashedPasswordHere', -- Replace with actual hash from password_hash()
  'admin',
  'active'
) ON DUPLICATE KEY UPDATE updated_at = CURRENT_TIMESTAMP;

-- ============================================================================
-- SAMPLE DATA (Optional - uncomment to use)
-- ============================================================================

-- Sample Products
INSERT INTO products (name, description, category, price, stock, status, sku) VALUES
('Laboratory Grade Chemicals', 'High purity chemicals for laboratory use', 'Laboratory Chemicals', 5000.00, 50, 'active', 'CHEM-001'),
('Medical Diagnostic Equipment', 'Advanced diagnostic equipment', 'Medical Equipment', 250000.00, 10, 'active', 'MED-001'),
('KOMU Suspension Coils', 'Premium suspension coils for vehicles', 'Automobile Supplies', 8000.00, 100, 'active', 'AUTO-001')
ON DUPLICATE KEY UPDATE updated_at = CURRENT_TIMESTAMP;

-- ============================================================================
-- 9. FILE_UPLOADS TABLE - Track uploaded files
-- ============================================================================
CREATE TABLE IF NOT EXISTS file_uploads (
  id INT AUTO_INCREMENT PRIMARY KEY,
  filename VARCHAR(255) NOT NULL COMMENT 'Hashed filename',
  original_name VARCHAR(255) NOT NULL COMMENT 'Original filename',
  file_type VARCHAR(100) COMMENT 'products, campaigns, documents',
  file_path VARCHAR(500) NOT NULL COMMENT 'Physical file path',
  file_url VARCHAR(500) NOT NULL COMMENT 'Public URL to file',
  file_size INT COMMENT 'File size in bytes',
  mime_type VARCHAR(100) COMMENT 'MIME type',
  uploaded_by INT COMMENT 'User ID who uploaded',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (uploaded_by) REFERENCES users(id) ON DELETE SET NULL,
  INDEX idx_file_type (file_type),
  INDEX idx_created_at (created_at),
  INDEX idx_uploaded_by (uploaded_by)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================================
-- CREATE INDEXES FOR PERFORMANCE
-- ============================================================================
CREATE INDEX idx_leads_email_status ON leads(email, status);
CREATE INDEX idx_customers_email_status ON customers(email, status);
CREATE INDEX idx_tracking_lead_timestamp ON tracking_pixels(lead_id, timestamp);
CREATE INDEX idx_campaign_recipients_campaign_status ON campaign_recipients(campaign_id, status);
