<?php
include __DIR__ . '/../model/db.php';
header('Content-Type: application/json; charset=UTF-8');

try {
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $table = isset($_POST['table']) ? $_POST['table'] : null;
        $id = isset($_POST['id']) ? $_POST['id'] : null;
        if ($table && $id) {
            switch ($table) {
                case 'categorys':
                    $categoryName = isset($_POST['category_name']) ? $_POST['category_name'] : null;
                    $description = isset($_POST['description']) ? $_POST['description'] : null;

                    $sql = 'UPDATE categorys SET category_name = :category_name, description = :description WHERE id = :id';

                    $stmt = $pdo->prepare($sql);
                    $stmt->bindParam(':category_name', $categoryName);
                    $stmt->bindParam(':description', $description);
                    $stmt->bindParam(':id', $id);
                    if ($stmt->execute()) {
                        echo json_encode(['message' => 'category updated successfully']);
                    } else {
                        echo json_encode(['error' => 'failed to update category']);
                    }
                    break;
                case 'products':
                    $productName = isset($_POST['product_name']) ? $_POST['product_name'] : null;
                    $categoryId  = isset($_POST['category_id']) ? $_POST['category_id'] : null;
                    $price  = isset($_POST['price']) ? $_POST['price'] : null;
                    $stockQuantity  = isset($_POST['stock_quantity']) ? $_POST['stock_quantity'] : null;
                    $description  = isset($_POST['description']) ? $_POST['description'] : null;
                    // $imageUrl  = isset($_POST['image_url']) ? $_POST['image_url'] : null;
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
                    $sql = 'UPDATE products SET product_name = :product_name, category_id = :category_id, price = :price, stock_quantity = :stock_quantity, description = :description, image_url = :image_url WHERE id = :id';

                    $stmt = $pdo->prepare($sql);
                    $stmt->bindParam(':product_name', $productName);
                    $stmt->bindParam(':category_id', $categoryId);
                    $stmt->bindParam(':price', $price);
                    $stmt->bindParam(':stock_quantity', $stockQuantity);
                    $stmt->bindParam(':description', $description);
                    $stmt->bindParam(':image_url', $imageUrl);
                    $stmt->bindParam(':id', $id);
                    if ($stmt->execute()) {
                        echo json_encode(['message' => 'product updated successfully']);
                    } else {
                        echo json_encode(['error' => 'failed to update product']);
                    }
                    break;
                default:
                    echo json_encode(['error' => 'table not found']);
                    break;
            }
        } else {
            echo json_encode(['error' => 'table parameter or id parameter is missing']);
        }
    } else {
        echo json_encode(['error' => 'invalid request method']);
    }
} catch (PDOException $e) {
    echo json_encode(['error' => $e->getMessage()]);
}
