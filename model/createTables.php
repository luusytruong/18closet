<?php

include 'createDb.php';

// Create table admin
$sql = "CREATE TABLE IF NOT EXISTS admins (
    id INT AUTO_INCREMENT PRIMARY KEY,
    adminname VARCHAR(50) NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE
)";

$pdo->exec( $sql );

// Create table users
$sql = "CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(50) NOT NULL,
    phone_number VARCHAR(20) NOT NULL UNIQUE,
    email VARCHAR(100) UNIQUE,
    address VARCHAR(255),
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)";

$pdo->exec( $sql );

//create default account admin
$adminname = "admin";
$password = "admin";
$email = "admin@gmail.com";

$sql = "INSERT INTO admins (adminname, password, email) VALUES (:adminname, :password, :email)";

$stmt = $pdo->prepare($sql);
$stmt->bindParam(':adminname', $adminname);
$stmt->bindParam(':password', $password);
$stmt->bindParam(':email', $email);
$stmt->execute();

// Create table categorys
$sql = "CREATE TABLE IF NOT EXISTS categorys (
    id INT AUTO_INCREMENT PRIMARY KEY,
    category_name VARCHAR(100) NOT NULL,
    description TEXT
)";

$pdo->exec( $sql );

// Create table products
$sql = "CREATE TABLE IF NOT EXISTS products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_name VARCHAR(255) NOT NULL,
    category_id INT NOT NULL,
    price INT NOT NULL,
    stock_quantity INT NOT NULL,
    description TEXT,
    image_url VARCHAR(255),
    added_date TIMESTAMP DEFAULT  CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categorys(id) ON DELETE CASCADE
)";

$pdo->exec( $sql );

// Create table orders
$sql = "CREATE TABLE IF NOT EXISTS orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    customer_id INT NOT NULL,
    order_date TIMESTAMP DEFAULT  CURRENT_TIMESTAMP,
    total_amount INT NOT NULL,
    shipping_adress VARCHAR(255) NOT NULL,
    payment_status VARCHAR(255) NOT NULL,
    FOREIGN KEY (customer_id) REFERENCES users(id) ON DELETE CASCADE
)";

$pdo->exec( $sql );

// Create table carts
$sql = "CREATE TABLE IF NOT EXISTS carts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    customer_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    FOREIGN KEY (customer_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
)";

$pdo->exec( $sql );

// Create table discounts
$sql = "CREATE TABLE IF NOT EXISTS discounts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    code VARCHAR(100) NOT NULL,
    discount INT NOT NULL
)";

$pdo->exec( $sql );

echo 'All tables have been created.';

?>