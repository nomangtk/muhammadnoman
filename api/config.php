<?php
// ═══════════════════════════════════════════════
//  config.php — Database connection
//  EDIT these values to match your hosting
// ═══════════════════════════════════════════════

define('DB_HOST', 'localhost');
define('DB_NAME', 'noman_portfolio');
define('DB_USER', 'root');         // your MySQL username
define('DB_PASS', '');             // your MySQL password
define('DB_CHARSET', 'utf8mb4');

define('UPLOAD_DIR', __DIR__ . '/../uploads/');
define('UPLOAD_URL', '../uploads/');

// ── Connect ────────────────────────────────────
function getDB(): PDO {
    static $pdo = null;
    if ($pdo) return $pdo;

    $dsn = 'mysql:host=' . DB_HOST . ';dbname=' . DB_NAME . ';charset=' . DB_CHARSET;
    $pdo = new PDO($dsn, DB_USER, DB_PASS, [
        PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    ]);
    return $pdo;
}

// ── JSON response helper ───────────────────────
function json(array $data, int $code = 200): never {
    http_response_code($code);
    header('Content-Type: application/json');
    echo json_encode($data);
    exit;
}

// ── Auth check helper ──────────────────────────
function requireAuth(): void {
    session_start();
    if (empty($_SESSION['admin_logged_in'])) {
        json(['error' => 'Unauthorized'], 401);
    }
}
