<?php
include_once __DIR__ . '/../model/db.php';
header('Content-Type: application/json; charset=UTF-8');
try {
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $json_data = file_get_contents('php://input');
        $decode_data = json_decode($json_data, true);

        $table = isset($decode_data['table']) ? $decode_data['table'] : null;
        if ($table) {
            if (isset($decode_data['customer_id'])) {
                $customer_id = $decode_data['customer_id'];
                $sql = "SELECT id FROM orders WHERE customer_id = :customer_id ORDER BY order_date DESC LIMIT 1";
                $stmt = $pdo->prepare($sql);
                $stmt->bindParam('customer_id', $customer_id);

                if ($stmt->execute()) {
                    $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
                    if (isset($data[0]['id'])) {
                        $order_id = $data[0]['id'];
                        if (isset($decode_data['data'])) {
                            $data = $decode_data['data'];
                            $array = [];
                            foreach ($data as $product) {
                                $sql = "INSERT INTO order_detail (order_id, product_id, product_amount) 
                                    VALUE (:order_id, :product_id, :product_amount)";
                                $stmt = $pdo->prepare($sql);
                                $stmt->bindParam('order_id', $order_id);
                                $stmt->bindParam('product_id', $product['id']);
                                $stmt->bindParam('product_amount', $product['count']);
                                $stmt->execute();
                            }
                            echo json_encode(['status' => 'success', 'title' => 'Thành công', 'content' => 'Thêm sản phẩm thành công']);
                            exit;
                        } else {
                            echo json_encode(['status' => 'error', 'title' => 'Đã xảy ra lỗi', 'content' => 'Thiếu data']);
                            exit;
                        }
                    } else {
                        echo json_encode(['status' => 'error', 'title' => 'Đã xảy ra lỗi', 'content' => 'Không tồn tại order_id']);
                        exit;
                    }
                } else {
                    echo json_encode(['status' => 'error', 'title' => 'Đã xảy ra lỗi', 'content' => 'Không thể thực hiện truy vấn']);
                    exit;
                }
            } else {
                echo json_encode(['status' => 'error', 'title' => 'Đã xảy ra lỗi', 'content' => 'Thiếu customer_id']);
                exit;
            }
        } else {
            echo json_encode(['status' => 'error', 'title' => 'Đã xảy ra lỗi', 'content' => 'Chưa định nghĩa bảng']);
            exit;
        }
    } else {
        echo json_encode(['status' => 'error', 'title' => 'Đã xảy ra lỗi', 'content' => 'Phương thức không hợp lệ']);
        exit;
    }
} catch (PDOException $e) {
    echo json_encode(['status' => 'error', 'title' => 'Đã xảy ra lỗi', 'content' => $e->getMessage()]);
    exit;
}
