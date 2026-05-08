-- Moris Enterprises Marketing Automation Database Schema
-- Run this migration with: mysql -u user -p database < 001_initial_schema.sql

-- Create users table (admin users)
CREATE TABLE IF NOT EXISTS `users` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `email` VARCHAR(255) UNIQUE NOT NULL,
  `password_hash` VARCHAR(255) NOT NULL,
  `name` VARCHAR(255),
  `status` ENUM('active', 'inactive') DEFAULT 'active',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX `idx_email` (`email`),
  INDEX `idx_status` (`status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create leads table
CREATE TABLE IF NOT EXISTS `leads` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) UNIQUE NOT NULL,
  `phone` VARCHAR(20),
  `company` VARCHAR(255),
  `source` VARCHAR(100),
  `product_interest` VARCHAR(255),
  `status` ENUM('new', 'contacted', 'qualified', 'converted') DEFAULT 'new',
  `score` INT DEFAULT 0,
  `notes` LONGTEXT,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX `idx_email` (`email`),
  INDEX `idx_status` (`status`),
  INDEX `idx_score` (`score`),
  INDEX `idx_source` (`source`),
  INDEX `idx_created_at` (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create customers table
CREATE TABLE IF NOT EXISTS `customers` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `lead_id` INT UNIQUE,
  `name` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) UNIQUE NOT NULL,
  `phone` VARCHAR(20),
  `company` VARCHAR(255),
  `lifetime_value` DECIMAL(10, 2) DEFAULT 0,
  `last_interaction` TIMESTAMP,
  `status` ENUM('active', 'inactive', 'churned') DEFAULT 'active',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (`lead_id`) REFERENCES `leads`(`id`) ON DELETE CASCADE,
  INDEX `idx_email` (`email`),
  INDEX `idx_status` (`status`),
  INDEX `idx_lifetime_value` (`lifetime_value`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create campaigns table
CREATE TABLE IF NOT EXISTS `campaigns` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `template` LONGTEXT,
  `subject` VARCHAR(255),
  `schedule` DATETIME,
  `status` ENUM('draft', 'scheduled', 'sent', 'cancelled') DEFAULT 'draft',
  `recipients_count` INT DEFAULT 0,
  `sent_count` INT DEFAULT 0,
  `opened_count` INT DEFAULT 0,
  `clicked_count` INT DEFAULT 0,
  `created_by` INT,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (`created_by`) REFERENCES `users`(`id`),
  INDEX `idx_status` (`status`),
  INDEX `idx_schedule` (`schedule`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create campaign logs table
CREATE TABLE IF NOT EXISTS `campaign_logs` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `campaign_id` INT NOT NULL,
  `lead_id` INT NOT NULL,
  `status` ENUM('queued', 'sent', 'failed', 'bounced') DEFAULT 'queued',
  `sent_at` TIMESTAMP NULL,
  `opened_at` TIMESTAMP NULL,
  `clicked_at` TIMESTAMP NULL,
  `tracking_token` VARCHAR(255) UNIQUE,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`campaign_id`) REFERENCES `campaigns`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`lead_id`) REFERENCES `leads`(`id`) ON DELETE CASCADE,
  INDEX `idx_campaign_id` (`campaign_id`),
  INDEX `idx_lead_id` (`lead_id`),
  INDEX `idx_status` (`status`),
  INDEX `idx_tracking_token` (`tracking_token`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create email queue table
CREATE TABLE IF NOT EXISTS `email_queue` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `lead_id` INT NOT NULL,
  `campaign_id` INT,
  `subject` VARCHAR(255) NOT NULL,
  `body` LONGTEXT NOT NULL,
  `scheduled_for` DATETIME,
  `sent_at` TIMESTAMP NULL,
  `status` ENUM('pending', 'sent', 'failed') DEFAULT 'pending',
  `retry_count` INT DEFAULT 0,
  `last_error` TEXT,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`lead_id`) REFERENCES `leads`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`campaign_id`) REFERENCES `campaigns`(`id`) ON DELETE SET NULL,
  INDEX `idx_status` (`status`),
  INDEX `idx_scheduled_for` (`scheduled_for`),
  INDEX `idx_lead_id` (`lead_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create lead scoring rules table
CREATE TABLE IF NOT EXISTS `lead_scoring_rules` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `rule_name` VARCHAR(255) NOT NULL,
  `action` VARCHAR(255) NOT NULL,
  `points` INT DEFAULT 0,
  `status` ENUM('active', 'inactive') DEFAULT 'active',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX `idx_status` (`status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create tracking pixels table
CREATE TABLE IF NOT EXISTS `tracking_pixels` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `lead_id` INT,
  `page_url` VARCHAR(512),
  `utm_source` VARCHAR(255),
  `utm_medium` VARCHAR(255),
  `utm_campaign` VARCHAR(255),
  `user_agent` TEXT,
  `ip_address` VARCHAR(45),
  `timestamp` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`lead_id`) REFERENCES `leads`(`id`) ON DELETE CASCADE,
  INDEX `idx_lead_id` (`lead_id`),
  INDEX `idx_timestamp` (`timestamp`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create products table
CREATE TABLE IF NOT EXISTS `products` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `category` VARCHAR(255),
  `description` LONGTEXT,
  `price` DECIMAL(10, 2),
  `stock` INT DEFAULT 0,
  `sku` VARCHAR(100) UNIQUE,
  `status` ENUM('active', 'inactive') DEFAULT 'active',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX `idx_category` (`category`),
  INDEX `idx_status` (`status`),
  INDEX `idx_sku` (`sku`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insert default lead scoring rules
INSERT INTO `lead_scoring_rules` (`rule_name`, `action`, `points`, `status`) VALUES
('Form Submission', 'form_submission', 10, 'active'),
('Email Opened', 'email_opened', 5, 'active'),
('Email Clicked', 'email_clicked', 10, 'active'),
('Product Page View', 'product_view', 3, 'active'),
('Multiple Page Views', 'multiple_pages', 5, 'active'),
('Long Time on Site', 'time_on_site', 3, 'active'),
('Phone Inquiry', 'phone_inquiry', 20, 'active');

-- Insert default admin user (password: admin123 hashed with password_hash)
INSERT INTO `users` (`email`, `password_hash`, `name`, `status`) VALUES
('admin@moris.co.ke', '$2y$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcg7b3XeKeUxWdeS86E36P4/DJO', 'Admin User', 'active');
