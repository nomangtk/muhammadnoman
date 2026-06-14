<?php
// ═══════════════════════════════════════════════
//  api/projects.php  — PUBLIC endpoint
//  GET  /api/projects.php            → all projects
//  GET  /api/projects.php?cat=avatar → filtered
// ═══════════════════════════════════════════════

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
require_once 'config.php';

$db  = getDB();
$cat = $_GET['cat'] ?? 'all';

if ($cat && $cat !== 'all') {
    $stmt = $db->prepare(
        'SELECT * FROM projects WHERE category = ? ORDER BY sort_order ASC, id DESC'
    );
    $stmt->execute([$cat]);
} else {
    $stmt = $db->query(
        'SELECT * FROM projects ORDER BY sort_order ASC, id DESC'
    );
}

$projects = $stmt->fetchAll();

// Make media_path a full URL if it's a local upload
foreach ($projects as &$p) {
    if ($p['media_path'] && !str_starts_with($p['media_path'], 'http')) {
        // already relative path from portfolio root — keep as-is
    }
}

echo json_encode($projects);
