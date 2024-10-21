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
                echo json_encode(['error' => 'failed to execute query']);
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
