<?php

header('Content-Type: application/json; charset=UTF-8');
try {
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        if (isset($_POST['case'])) {
            $case = $_POST['case'];
            session_start();
            switch ($case) {
                case 'users':
                    if (isset($_SESSION['user_id']) && isset($_SESSION['phone_number'])) {
                        echo json_encode(['status' => 'success', 'user_login' => true, 'login' => true, 'user_id' => $_SESSION['user_id'], 'title' => 'Thành công', 'content' => 'Đăng nhập thành công']);
                    } else {
                        echo json_encode(['status' => 'error', 'user_login' => true, 'login' => false, 'title' => 'Đã xảy ra lỗi', 'content' => 'Khách hàng chưa đăng nhâp']);
                    }
                    break;
                case 'admin':
                    if (isset($_SESSION['admin']) && isset($_SESSION['email'])) {
                        echo json_encode(['status' => 'success', 'admin_login' => true, 'login' => true, 'admin_id' => $_SESSION['admin'], 'title' => 'Thành công', 'content' => 'Đăng nhập thành công']);
                    } else {
                        echo json_encode(['status' => 'error', 'admin_login' => true, 'login' => false, 'title' => 'Đã xảy ra lỗi', 'content' => 'Admin chưa đăng nhâp']);
                    }
                    break;

                default:
                    echo json_encode(['status' => 'error', 'title' => 'Đã xảy ra lỗi', 'content' => 'Data không tồn tại']);
                    break;
            }
        } else {
            echo json_encode(['status' => 'error', 'title' => 'Đã xảy ra lỗi', 'content' => 'Thiếu Data']);
        }
    } else {
        echo json_encode(['status' => 'error', 'title' => 'Đã xảy ra lỗi', 'content' => 'Phương thức không hợp lệ']);
    }
} catch (PDOException $e) {
    echo json_encode(['status' => 'error', 'title' => 'Đã xảy ra lỗi', 'content' => $e->getMessage()]);
}
