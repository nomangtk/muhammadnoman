<?php
session_start();

if(!isset($_SESSION['admin'])){
    header("Location: login.php");
}

include '../config/db.php';

$projects = $conn->query(
"SELECT * FROM projects ORDER BY id DESC"
);
?>

<h1>Projects Dashboard</h1>

<a href="add-project.php">
    Add New Project
</a>

<table border="1">

<tr>
    <th>ID</th>
    <th>Title</th>
    <th>Category</th>
    <th>Action</th>
</tr>

<?php while($row=$projects->fetch_assoc()): ?>

<tr>

<td><?= $row['id']; ?></td>

<td><?= $row['title']; ?></td>

<td><?= $row['category']; ?></td>

<td>

<a href="edit-project.php?id=<?= $row['id']; ?>">
Edit
</a>

<a href="delete-project.php?id=<?= $row['id']; ?>">
Delete
</a>

</td>

</tr>

<?php endwhile; ?>

</table>

<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<title>Admin Dashboard</title>

<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">

<link rel="stylesheet" href="admin.css">
</head>
<body>

<div class="admin-layout">

    <aside class="sidebar">

        <div class="logo">
            M.Noman
        </div>

        <ul>

            <li class="active">
                Dashboard
            </li>

            <li>
                Projects
            </li>

            <li>
                Add Project
            </li>

            <li>
                Settings
            </li>

            <li>
                Logout
            </li>

        </ul>

    </aside>

    <main class="content">

        <div class="topbar">

            <h1>Projects Dashboard</h1>

            <a href="add-project.php" class="add-btn">
                + Add Project
            </a>

        </div>

        <div class="stats">

            <div class="stat-card">
                <h2>42</h2>
                <p>Total Projects</p>
            </div>

            <div class="stat-card">
                <h2>15</h2>
                <p>AI Videos</p>
            </div>

            <div class="stat-card">
                <h2>8</h2>
                <p>Thumbnails</p>
            </div>

        </div>

        <div class="table-card">

            <table>

                <thead>

                <tr>
                    <th>Video</th>
                    <th>Title</th>
                    <th>Category</th>
                    <th>Actions</th>
                </tr>

                </thead>

                <tbody>

                <tr>

                    <td>
                        <video src="uploads/video.mp4"></video>
                    </td>

                    <td>AI Sales Avatar</td>

                    <td>
                        <span class="badge">
                            Avatar
                        </span>
                    </td>

                    <td>

                        <button class="edit-btn">
                            Edit
                        </button>

                        <button class="delete-btn">
                            Delete
                        </button>

                    </td>

                </tr>

                </tbody>

            </table>

        </div>

    </main>

</div>

</body>
</html>