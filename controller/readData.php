<?php
include __DIR__ . '/../model/db.php';
header('Content-Type: application/json; charset=UTF-8');

try {
    if ($_SERVER['REQUEST_METHOD'] === 'GET') {
        $table = isset($_GET['table']) ? $_GET['table'] : null;
        if ($table) {
            $sql = "SELECT * FROM $table ORDER BY id ASC";
            $stmt = $pdo->prepare($sql);
            if ($stmt->execute()) {
                $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
                echo json_encode($data);
            } else {
                echo json_encode(['status' => 'error', 'title' => 'Đã xảy ra lỗi', 'content' => 'Không thể thực hiện truy vấn']);
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
