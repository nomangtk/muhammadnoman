-- ═══════════════════════════════════════════════
--  M.Noman Portfolio — Database Setup
--  Run this once in phpMyAdmin or MySQL CLI
-- ═══════════════════════════════════════════════

CREATE DATABASE IF NOT EXISTS noman_portfolio
  CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE noman_portfolio;

-- Projects table
CREATE TABLE IF NOT EXISTS projects (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  title       VARCHAR(255)  NOT NULL,
  description VARCHAR(500)  DEFAULT '',
  category    VARCHAR(100)  NOT NULL,
  media_type  ENUM('video','image') DEFAULT 'video',
  media_path  VARCHAR(500)  DEFAULT '',
  thumbnail   VARCHAR(500)  DEFAULT '',
  duration    VARCHAR(20)   DEFAULT '',
  aspect      ENUM('portrait','landscape','square') DEFAULT 'portrait',
  sort_order  INT           DEFAULT 0,
  created_at  TIMESTAMP     DEFAULT CURRENT_TIMESTAMP
);

-- Admin users table
CREATE TABLE IF NOT EXISTS admin_users (
  id         INT AUTO_INCREMENT PRIMARY KEY,
  username   VARCHAR(100) NOT NULL UNIQUE,
  password   VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert default admin  (password: admin123)
-- Change this password immediately after setup!
INSERT INTO admin_users (username, password)
VALUES ('admin', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi')
ON DUPLICATE KEY UPDATE username = username;

-- Sample projects (remove after adding real ones)
INSERT INTO projects (title, description, category, media_type, media_path, duration, aspect) VALUES
('AI Sales Avatar',    'AI Cloned Avatar',       'avatar',       'video', 'assets/crime.mp4', '0:52', 'portrait'),
('Podcast Short Edit', 'Short-Form Editing',      'short-form',   'video', '',                 '0:39', 'portrait'),
('Defense AI Film',    'AI Animation',            'animation',    'video', '',                 '0:27', 'landscape'),
('Medical Explainer',  'AI Talking-Head',         'talking-head', 'video', '',                 '0:15', 'portrait'),
('Thumbnail Bundle',   'YouTube Thumbnail Pack',  'thumbnail',    'image', '',                 '',     'landscape');
