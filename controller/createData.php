<?php
include __DIR__ . '/../model/db.php';
header('Content-Type: application/json; charset=UTF-8');

try {
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $table = isset($_POST['table']) ? $_POST['table'] : null;
        if ($table) {
            switch ($table) {
                case 'categorys':
                    $cateGoryName = $_POST['category_name'];
                    $description = $_POST['description'];
                    $sql = 'INSERT INTO categorys (category_name, description) VALUES (:category_name, :description)';

                    $stmt = $pdo->prepare($sql);
                    $stmt->bindParam(':category_name', $cateGoryName);
                    $stmt->bindParam(':description', $description);

                    if ($stmt->execute()) {
                        echo json_encode(['message' => 'category added successfully']);
                    } else {
                        echo json_encode(['error' => 'failed to add category']);
                    }
                    break;
                case 'products':
                    $productName = $_POST['product_name'];
                    $categoryId  = $_POST['category_id'];
                    $price  = $_POST['price'];
                    $stockQuantity  = $_POST['stock_quantity'];
                    $description  = $_POST['description'];
                    // $imageUrl  = $_POST['image_url'];
                    //xy ly anh
                    if (isset($_FILES['image']) && $_FILES['image']['error'] == 0) {
                        $targetDir = "../assets/img_upload/";
                        $targetFile = $targetDir . basename($_FILES["image"]["name"]);
                        $imageFileType = strtolower(pathinfo($targetFile, PATHINFO_EXTENSION));
                        //kiem tra kich thuoc anh
                        if ($_FILES['image']['size'] > 1000000) {
                            echo json_encode(['error' => 'file to large']);
                            exit;
                        }
                        //dinh dang anh
                        $validFormats = ['jpg', 'png', 'jpeg', 'gif'];
                        if (!in_array($imageFileType, $validFormats)) {
                        }
                        if (move_uploaded_file($_FILES['image']['tmp_name'], $targetFile)) {
                            $imageUrl = basename($_FILES['image']['name']);
                        } else {
                            echo json_encode(['error' => 'failed to upload image']);
                            exit;
                        }
                    } else {
                        echo json_encode(['error' => 'no image uploaded or upload error']);
                        exit;
                    }
                    $sql = 'INSERT INTO products (product_name, category_id, price, stock_quantity, description, image_url) 
                            VALUES (:product_name, :category_id, :price, :stock_quantity, :description, :image_url)';
                    $stmt = $pdo->prepare($sql);
                    $stmt->bindParam(':product_name', $productName);
                    $stmt->bindParam(':category_id', $categoryId);
                    $stmt->bindParam(':price', $price);
                    $stmt->bindParam(':stock_quantity', $stockQuantity);
                    $stmt->bindParam(':description', $description);
                    $stmt->bindParam(':image_url', $imageUrl);
                    if ($stmt->execute()) {
                        echo json_encode(['message' => 'product added successfully']);
                    } else {
                        echo json_encode(['error' => 'failed to add product']);
                    }

                    break;
                default:
                    echo json_encode(['title' => 'table not found!']);
                    break;
            }
        } else {
            echo json_encode(['error' => 'table parameter is missing']);
        }
    } else {
        echo json_encode(['error' => 'invalid request method']);
    }
} catch (PDOException $e) {
    echo json_encode(['error' => $e->getMessage()]);
}
