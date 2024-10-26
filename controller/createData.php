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
                    // $imageUrl  = $_POST[ 'image_url' ];
                    //xy ly anh
                    if (isset($_FILES['image']) && $_FILES['image']['error'] == 0) {
                        $targetDir = '../assets/img_upload/';
                        $targetFile = $targetDir . basename($_FILES['image']['name']);
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
                            echo json_encode(['status' => 'error', 'title' => 'Đã xảy ra lỗi', 'content' => 'Đã có lỗi khi tải lên ảnh']);
                            exit;
                        }
                    } else {
                        echo json_encode(['status' => 'error', 'title' => 'Đã xảy ra lỗi', 'content' => 'Không có ảnh nào được chọn, hoặc tải lên bị lỗi']);
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
                        echo json_encode(['director'=>'bottom','status' => 'success', 'title' => 'Thành công', 'content' => 'Sản phẩm đã được thêm']);
                    } else {
                        echo json_encode(['status' => 'error', 'title' => 'Đã xảy ra lỗi', 'content' => 'Không thể thêm sản phẩm']);
                    }

                    break;
                case 'orders':
                    $customer_id = $_POST['customer_id'];
                    $total_amount  = $_POST['total_amount'];
                    $shipping_adress  = $_POST['shipping_adress'];

                    $sql = 'INSERT INTO orders (customer_id, total_amount, shipping_adress) 
                                VALUES (:customer_id, :total_amount, :shipping_adress)';
                    $stmt = $pdo->prepare($sql);
                    $stmt->bindParam(':customer_id', $customer_id);
                    $stmt->bindParam(':total_amount', $total_amount);
                    $stmt->bindParam(':shipping_adress', $shipping_adress);

                    if ($stmt->execute()) {
                        echo json_encode(['director'=>'bottom','status' => 'success', 'title' => 'Thành công', 'content' => 'Đặt hàng thành công', 'order' => 'order']);
                    } else {
                        echo json_encode(['status' => 'error', 'title' => 'Đã xảy ra lỗi', 'content' => 'Đặt hàng thất bại']);
                    }
                    break;
                    
                case 'discounts':
                    $code = $_POST['code'];
                    $discount  = $_POST['discount'];

                    $sql = 'INSERT INTO discounts (code, discount) 
                                VALUES (:code, :discount)';
                    $stmt = $pdo->prepare($sql);
                    $stmt->bindParam(':code', $code);
                    $stmt->bindParam(':discount', $discount);

                    if ($stmt->execute()) {
                        echo json_encode(['director'=>'bottom','status' => 'success', 'title' => 'Thành công', 'content' => 'Tạo mã thành công']);
                    } else {
                        echo json_encode(['status' => 'error', 'title' => 'Đã xảy ra lỗi', 'content' => 'Tạo mã thất bại']);
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
