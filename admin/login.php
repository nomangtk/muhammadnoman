<?php
session_start();
include '../config/db.php';

if(isset($_POST['login'])){

    $username = $_POST['username'];
    $password = $_POST['password'];

    $sql = $conn->prepare(
        "SELECT * FROM admins WHERE username=?"
    );

    $sql->bind_param("s",$username);
    $sql->execute();

    $result = $sql->get_result();

    if($row = $result->fetch_assoc()){

        if(password_verify(
            $password,
            $row['password']
        )){
            $_SESSION['admin'] = $row['id'];

            header("Location: dashboard.php");
        }
    }

    $error = "Invalid Login";
}
?>

<form method="POST">
    <input type="text" name="username">
    <input type="password" name="password">

    <button name="login">
        Login
    </button>
</form>