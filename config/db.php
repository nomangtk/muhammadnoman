<?php

$conn = new mysqli(
    "localhost",
    "root",
    "",
    "portfolio_db"
);

if($conn->connect_error){
    die("Connection Failed");
}
?>