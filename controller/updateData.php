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
                        echo json_encode(['status' => 'success', 'title' => 'Thành công', 'content' => 'Thông tin đã được chỉnh sửa']);
                    } else {
                        echo json_encode(['status' => 'error', 'title' => 'Đã xảy ra lỗi', 'content' => 'Sửa thông tin không thành công']);
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
                        if ($_FILES['image']['size'] > 5000000) {
                            echo json_encode(['status' => 'error', 'title' => 'Đã xảy ra lỗi', 'content' => 'Kích thước của ảnh quá lớn']);
                            exit;
                        }
                        //dinh dang anh
                        $validFormats = ['jpg', 'png', 'jpeg', 'gif'];
                        if (!in_array($imageFileType, $validFormats)) {
                            echo json_encode(['status' => 'error', 'title' => 'Đã xảy ra lỗi', 'content' => 'Tệp tin không phải là ảnh']);
                            exit;
                        }
                        if (move_uploaded_file($_FILES['image']['tmp_name'], $targetFile)) {
                            $imageUrl = basename($_FILES['image']['name']);
                        } else {
                            echo json_encode(['status' => 'error', 'title' => 'Đã xảy ra lỗi', 'content' => 'Không thể tải lên hình ảnh']);
                            exit;
                        }
                    } else {
                        echo json_encode(['status' => 'error', 'title' => 'Đã xảy ra lỗi', 'content' => 'Không có ảnh nào được chọn, hoặc không thể tải lên']);
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
                        echo json_encode(['status' => 'success', 'title' => 'Thành công', 'content' => 'Thông tin đã được chỉnh sửa']);
                    } else {
                        echo json_encode(['status' => 'error', 'title' => 'Đã xảy ra lỗi', 'content' => 'Sửa thông tin không thành công']);
                    }
                    break;

                case 'orders':
                    $customer_id = $_POST['customer_id'];
                    $total_amount  = $_POST['total_amount'];
                    $shipping_adress  = $_POST['shipping_adress'];

                    $sql = 'UPDATE orders SET 
                    customer_id = :customer_id, 
                    total_amount = :total_amount,
                    shipping_adress = :shipping_adress
                    WHERE id = :id';

                    $stmt = $pdo->prepare($sql);
                    $stmt->bindParam(':customer_id', $customer_id);
                    $stmt->bindParam(':total_amount', $total_amount);
                    $stmt->bindParam(':shipping_adress', $shipping_adress);
                    $stmt->bindParam(':id', $id);

                    if ($stmt->execute()) {
                        echo json_encode(['status' => 'success', 'title' => 'Thành công', 'content' => 'Thông tin đã được chỉnh sửa']);
                    } else {
                        echo json_encode(['status' => 'error', 'title' => 'Đã xảy ra lỗi', 'content' => 'Sửa thông tin không thành công']);
                    }
                    break;
                default:
                    echo json_encode(['status' => 'error', 'title' => 'Đã xảy ra lỗi', 'content' => 'Không tìm thấy bảng']);
                    break;
            }
        } else {
            echo json_encode(['status' => 'error', 'title' => 'Đã xảy ra lỗi', 'content' => 'Chưa định nghĩa bảng']);
        }
    } else {
        echo json_encode(['status' => 'error', 'title' => 'Đã xảy ra lỗi', 'content' => 'Phương thức không hợp lệ']);
    }
} catch (PDOException $e) {
    echo json_encode(['status' => 'error', 'title' => 'Đã xảy ra lỗi', 'content' => $e->getMessage()]);
}
