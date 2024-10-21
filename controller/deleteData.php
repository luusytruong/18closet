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
                echo json_encode(['message' => 'data deleted successfully']);
            } else {
                echo json_encode(['error' => 'failed to delete data']);
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
