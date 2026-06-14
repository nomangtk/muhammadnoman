<?php

include '../config/db.php';

if(isset($_POST['submit'])){

    $title = $_POST['title'];
    $category = $_POST['category'];
    $description = $_POST['description'];

    $video =
        time().$_FILES['video']['name'];

    move_uploaded_file(
        $_FILES['video']['tmp_name'],
        "../uploads/videos/".$video
    );

    $thumb =
        time().$_FILES['thumbnail']['name'];

    move_uploaded_file(
        $_FILES['thumbnail']['tmp_name'],
        "../uploads/thumbnails/".$thumb
    );

    $sql = $conn->prepare(
    "INSERT INTO projects
    (title,category,description,video,thumbnail)
    VALUES(?,?,?,?,?)"
    );

    $sql->bind_param(
        "sssss",
        $title,
        $category,
        $description,
        $video,
        $thumb
    );

    $sql->execute();

    header("Location: dashboard.php");
}
?>

<form method="POST"
enctype="multipart/form-data">

<input type="text"
name="title"
placeholder="Project Title">

<select name="category">

<option value="avatar">
Avatar
</option>

<option value="animation">
Animation
</option>

<option value="thumbnail">
Thumbnail
</option>

<option value="short-form">
Short Form
</option>

<option value="long-form">
Long Form
</option>

<option value="talking-head">
Talking Head
</option>

</select>

<textarea
name="description">
</textarea>

<input type="file" name="video">

<input type="file" name="thumbnail">

<button name="submit">
Add Project
</button>

</form>