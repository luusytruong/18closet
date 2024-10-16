<?php

// host info
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "chitchat_db";

try {
    $pdo = new PDO("mysql:host=$servername", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    echo"connected to host\n";

    $sql = "CREATE DATABASE IF NOT EXISTS $dbname";
    $pdo->exec($sql);
    echo"create db successful or db already\n";
    
    $pdo = new PDO("mysql:host=$servername; dbname=$dbname", $username, $password);
    echo"connected to db\n";

} catch (PDOException $e) {
    echo $e->getMessage();
}

?>