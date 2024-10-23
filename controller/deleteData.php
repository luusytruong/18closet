<?php
include __DIR__ . '/../model/db.php';
header('Content-Type: application/json; charset=UTF-8');

try {
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $table = isset($_POST['table']) ? $_POST['table'] : null;
        $id = isset($_POST['id']) ? $_POST['id'] : null;

        if ($table && $id) {
            $sql = "DELETE FROM $table WHERE id = :id";
            $stmt = $pdo->prepare($sql);
            $stmt->bindParam(':id', $id, PDO::PARAM_INT);
            if ($stmt->execute()) {
                echo json_encode(['status' => 'success', 'title'=>'Thành công', 'content'=>'Đã xoá thành công']);
            } else {
                echo json_encode(['status' => 'error', 'title'=>'Đã xảy ra lỗi', 'content'=>'Không thể xoá, vui lòng thử lại sau']);
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
