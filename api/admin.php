<?php
// ═══════════════════════════════════════════════
//  api/admin.php — PROTECTED admin actions
//
//  POST action=login      → { username, password }
//  POST action=logout     → {}
//  GET  action=list       → all projects (admin)
//  POST action=add        → add project
//  POST action=edit       → edit project
//  POST action=delete     → delete project
//  POST action=reorder    → update sort_order
// ═══════════════════════════════════════════════

require_once 'config.php';
session_start();

$action = $_POST['action'] ?? $_GET['action'] ?? '';

/* ── LOGIN ──────────────────────────────────── */
if ($action === 'login') {
    $username = trim($_POST['username'] ?? '');
    $password = $_POST['password'] ?? '';

    $db   = getDB();
    $stmt = $db->prepare('SELECT * FROM admin_users WHERE username = ? LIMIT 1');
    $stmt->execute([$username]);
    $user = $stmt->fetch();

    if ($user && password_verify($password, $user['password'])) {
        $_SESSION['admin_logged_in'] = true;
        $_SESSION['admin_username']  = $username;
        json(['success' => true]);
    }
    json(['error' => 'Invalid credentials'], 401);
}

/* ── LOGOUT ─────────────────────────────────── */
if ($action === 'logout') {
    session_destroy();
    json(['success' => true]);
}

/* ── All actions below require auth ─────────── */
if (empty($_SESSION['admin_logged_in'])) {
    json(['error' => 'Unauthorized'], 401);
}

$db = getDB();

/* ── LIST ───────────────────────────────────── */
if ($action === 'list') {
    $rows = $db->query('SELECT * FROM projects ORDER BY sort_order ASC, id DESC')->fetchAll();
    json(['projects' => $rows]);
}

/* ── ADD ────────────────────────────────────── */
if ($action === 'add') {
    $title       = trim($_POST['title']       ?? '');
    $description = trim($_POST['description'] ?? '');
    $category    = trim($_POST['category']    ?? '');
    $media_type  = $_POST['media_type']  ?? 'video';
    $duration    = trim($_POST['duration']    ?? '');
    $aspect      = $_POST['aspect']      ?? 'portrait';
    $media_path  = trim($_POST['media_path']  ?? '');

    if (!$title || !$category) json(['error' => 'Title and category are required'], 400);

    // Handle file upload
    if (!empty($_FILES['media_file']['name'])) {
        $media_path = handleUpload($_FILES['media_file'], $media_type);
        if (!$media_path) json(['error' => 'File upload failed'], 500);
    }

    $stmt = $db->prepare('
        INSERT INTO projects (title, description, category, media_type, media_path, duration, aspect)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    ');
    $stmt->execute([$title, $description, $category, $media_type, $media_path, $duration, $aspect]);

    json(['success' => true, 'id' => $db->lastInsertId()]);
}

/* ── EDIT ───────────────────────────────────── */
if ($action === 'edit') {
    $id          = (int)($_POST['id']          ?? 0);
    $title       = trim($_POST['title']        ?? '');
    $description = trim($_POST['description']  ?? '');
    $category    = trim($_POST['category']     ?? '');
    $media_type  = $_POST['media_type']   ?? 'video';
    $duration    = trim($_POST['duration']     ?? '');
    $aspect      = $_POST['aspect']       ?? 'portrait';
    $media_path  = trim($_POST['media_path']   ?? '');

    if (!$id || !$title || !$category) json(['error' => 'Missing required fields'], 400);

    // Handle new file upload
    if (!empty($_FILES['media_file']['name'])) {
        $newPath = handleUpload($_FILES['media_file'], $media_type);
        if ($newPath) {
            // Delete old file
            $old = $db->prepare('SELECT media_path FROM projects WHERE id = ?');
            $old->execute([$id]);
            $row = $old->fetch();
            if ($row && $row['media_path'] && file_exists(UPLOAD_DIR . basename($row['media_path']))) {
                @unlink(UPLOAD_DIR . basename($row['media_path']));
            }
            $media_path = $newPath;
        }
    }

    $stmt = $db->prepare('
        UPDATE projects
        SET title=?, description=?, category=?, media_type=?, media_path=?, duration=?, aspect=?
        WHERE id=?
    ');
    $stmt->execute([$title, $description, $category, $media_type, $media_path, $duration, $aspect, $id]);

    json(['success' => true]);
}

/* ── DELETE ─────────────────────────────────── */
if ($action === 'delete') {
    $id = (int)($_POST['id'] ?? 0);
    if (!$id) json(['error' => 'Missing id'], 400);

    // Delete uploaded file
    $stmt = $db->prepare('SELECT media_path FROM projects WHERE id = ?');
    $stmt->execute([$id]);
    $row = $stmt->fetch();
    if ($row && $row['media_path'] && strpos($row['media_path'], 'uploads/') !== false) {
        @unlink(UPLOAD_DIR . basename($row['media_path']));
    }

    $db->prepare('DELETE FROM projects WHERE id = ?')->execute([$id]);
    json(['success' => true]);
}

/* ── REORDER ────────────────────────────────── */
if ($action === 'reorder') {
    $ids = json_decode($_POST['ids'] ?? '[]', true);
    foreach ($ids as $order => $id) {
        $db->prepare('UPDATE projects SET sort_order = ? WHERE id = ?')
           ->execute([$order, (int)$id]);
    }
    json(['success' => true]);
}

json(['error' => 'Unknown action'], 400);

/* ── FILE UPLOAD HELPER ─────────────────────── */
function handleUpload(array $file, string $type): string|false {
    $allowed_video = ['video/mp4','video/webm','video/ogg','video/quicktime'];
    $allowed_image = ['image/jpeg','image/png','image/webp','image/gif'];
    $allowed = $type === 'video' ? $allowed_video : $allowed_image;

    if (!in_array($file['type'], $allowed)) return false;
    if ($file['size'] > 200 * 1024 * 1024) return false; // 200MB max

    if (!is_dir(UPLOAD_DIR)) mkdir(UPLOAD_DIR, 0755, true);

    $ext      = pathinfo($file['name'], PATHINFO_EXTENSION);
    $filename = uniqid('media_', true) . '.' . strtolower($ext);
    $dest     = UPLOAD_DIR . $filename;

    if (move_uploaded_file($file['tmp_name'], $dest)) {
        return 'uploads/' . $filename;
    }
    return false;
}
