<?php

// host info
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "closet_18_db";


// connect host
try {
    $pdo = new PDO("mysql:host=$servername; dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo "err" . $e->getMessage() . "\n";
}
