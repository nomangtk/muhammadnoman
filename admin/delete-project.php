<?php

include '../config/db.php';

$id = $_GET['id'];

$conn->query(
"DELETE FROM projects WHERE id=$id"
);

header("Location: dashboard.php");