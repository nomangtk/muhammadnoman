<?php

$name = $_POST['name'];
$email = $_POST['email'];
$message = $_POST['message'];

$to = "khurramh401@gmail.com";
$subject = "New Portfolio Contact";

$body = "
Name: $name

Email: $email

Message:
$message
";

$headers = "From: $email";

mail($to, $subject, $body, $headers);

header("Location: contact.html");

?>