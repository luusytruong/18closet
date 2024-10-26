<?php
include __DIR__ . '/../model/db.php';
try {
    header('Content-Type: application/json; charset=UTF-8');

    function clearSession()
    {
        session_unset();
        session_destroy();
        $_SESSION = [];

        // Xóa cookie chứa session ID
        if (ini_get("session.use_cookies")) {
            $params = session_get_cookie_params();
            setcookie(
                session_name(),
                '',
                time() - 42000,
                $params["path"],
                $params["domain"],
                $params["secure"],
                $params["httponly"]
            );
        }
    }
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $action = isset($_POST['action']) ? $_POST['action'] : null;
        if ($action) {
            switch ($action) {

                case 'register':

                    $fullName = $_POST['full_name'];
                    $phoneNumber = $_POST['phone_number'];
                    $password = $_POST['password'];

                    // xác thực đầu vào
                    if (empty($fullName)) {
                        echo json_encode([
                            'status' => 'error',
                            'title' => 'Đã xảy ra lỗi',
                            'content' => 'Vui lòng nhập họ và tên'
                        ]);
                        exit;
                    }

                    if (empty($phoneNumber)) {
                        echo json_encode([
                            'status' => 'error',
                            'title' => 'Đã xảy ra lỗi',
                            'content' => 'Vui lòng nhập số điện thoại'
                        ]);
                        exit;
                    }

                    if (empty($password)) {
                        echo json_encode([
                            'status' => 'error',
                            'title' => 'Đã xảy ra lỗi',
                            'content' => 'Vui lòng nhập mật khẩu'
                        ]);
                        exit;
                    } elseif (strlen($password) < 6) {
                        echo json_encode([
                            'status' => 'error',
                            'title' => 'Đã xảy ra lỗi',
                            'content' => 'Vui lòng dùng mật khẩu mạnh hơn'
                        ]);
                        exit;
                    }

                    $sql = 'SELECT phone_number FROM users WHERE phone_number = :phone_number';

                    $stmt = $pdo->prepare($sql);
                    $stmt->bindParam(':phone_number', $phoneNumber);
                    $stmt->execute();

                    if ($stmt->rowCount() > 0) {
                        echo json_encode([
                            'status' => 'error',
                            'title' => 'Đã xảy ra lỗi',
                            'content' => 'Số điện thoại đã tồn tại'
                        ]);
                        exit;
                    }

                    // mã hoá mật khẩu
                    $password = password_hash($_POST['password'], PASSWORD_DEFAULT);
                    //chuẩn bị query
                    $sql = "INSERT INTO users (full_name, phone_number, password) VALUES (:full_name, :phone_number, :password)";

                    $stmt = $pdo->prepare($sql);
                    $stmt->bindParam(':full_name', $fullName);
                    $stmt->bindParam(':phone_number', $phoneNumber);
                    $stmt->bindParam(':password', $password);

                    if ($stmt->execute()) {

                        echo json_encode([
                            'status' => 'success',
                            'title' => 'Thành công',
                            'content' => 'Đăng ký tài khoản thành công',
                            'register' => 'register'
                        ]);
                        exit;
                    } else {
                        echo json_encode([
                            'status' => 'error',
                            'title' => 'Đã xảy ra lỗi',
                            'content' => 'Đăng ký tài khoản thất bại'
                        ]);
                        exit;
                    }
                    break;
                case 'login':

                    $phoneNumber = $_POST['phone_number'];
                    $password = $_POST['password'];

                    // xác thực đầu vào

                    if (empty($phoneNumber)) {
                        echo json_encode([
                            'status' => 'error',
                            'title' => 'Đã xảy ra lỗi',
                            'content' => 'Vui lòng nhập số điện thoại'
                        ]);
                        exit;
                    }

                    if (empty($password)) {
                        echo json_encode([
                            'status' => 'error',
                            'title' => 'Đã xảy ra lỗi',
                            'content' => 'Vui lòng nhập mật khẩu'
                        ]);
                        exit;
                    } elseif (strlen($password) < 6) {
                        echo json_encode([
                            'status' => 'error',
                            'title' => 'Đã xảy ra lỗi',
                            'content' => 'Mật không dưới 6 ký tự'
                        ]);
                        exit;
                    }

                    $sql = 'SELECT id, password FROM users WHERE phone_number = :phone_number';

                    $stmt = $pdo->prepare($sql);
                    $stmt->bindParam(':phone_number', $phoneNumber);
                    $stmt->execute();

                    if ($stmt->rowCount() > 0) {
                        $stmt->bindColumn(1, $id);
                        $stmt->bindColumn(2, $hash_password);
                        $stmt->fetchAll(PDO::FETCH_BOUND);

                        if (password_verify($password, $hash_password)) {

                            session_start();

                            $_SESSION['user_id'] = $id;
                            $_SESSION['phone_number'] = $phoneNumber;

                            echo json_encode([
                                'status' => 'success',
                                'title' => 'Thành công' . session_id(),
                                'content' => 'Đăng nhập thành công',
                                'session_id' => session_id()
                            ]);
                            exit;
                        } else {
                            echo json_encode([
                                'status' => 'error',
                                'title' => 'Đăng nhập thất bại',
                                'content' => 'Số điện thoại hoặc mật khẩu không đúng'
                            ]);
                            exit;
                        }
                    } else {
                        echo json_encode([
                            'status' => 'error',
                            'title' => 'Đăng nhập thất bại',
                            'content' => 'Số điện thoại không tồn tại'
                        ]);
                        exit;
                    }
                    break;
                case 'admin':

                    $email = $_POST['email'];
                    $password = $_POST['password'];

                    // xác thực đầu vào

                    if (empty($email)) {
                        echo json_encode([
                            'status' => 'error',
                            'title' => 'Đã xảy ra lỗi',
                            'content' => 'Vui lòng nhập email'
                        ]);
                        exit;
                    }

                    if (empty($password)) {
                        echo json_encode([
                            'status' => 'error',
                            'title' => 'Đã xảy ra lỗi',
                            'content' => 'Vui lòng nhập mật khẩu'
                        ]);
                        exit;
                    } elseif (strlen($password) < 5) {
                        echo json_encode([
                            'status' => 'error',
                            'title' => 'Đã xảy ra lỗi',
                            'content' => 'Mật không dưới 5 ký tự'
                        ]);
                        exit;
                    }

                    $sql = 'SELECT id, password FROM admins WHERE email = :email';

                    $stmt = $pdo->prepare($sql);
                    $stmt->bindParam(':email', $email);
                    $stmt->execute();

                    if ($stmt->rowCount() > 0) {
                        $stmt->bindColumn(1, $id);
                        $stmt->bindColumn(2, $passworddb);
                        $stmt->fetchAll(PDO::FETCH_BOUND);

                        if (($password === $passworddb)) {

                            session_start();

                            $_SESSION['admin'] = $id;
                            $_SESSION['email'] = $email;

                            echo json_encode(['status' => 'success', 'admin_login' => true, 'login' => true, 'admin_id' => $_SESSION['admin'], 'title' => 'Thành công'. session_id(), 'content' => 'Đăng nhập thành công']);
                            exit;
                        } else {
                            echo json_encode([
                                'status' => 'error',
                                'title' => 'Đăng nhập thất bại',
                                'content' => 'Số điện thoại hoặc mật khẩu không đúng'
                            ]);
                            exit;
                        }
                    } else {
                        echo json_encode([
                            'status' => 'error',
                            'title' => 'Đăng nhập thất bại',
                            'content' => 'Số điện thoại không tồn tại'
                        ]);
                        exit;
                    }
                    break;

                default:
                    echo json_encode(['title' => 'non action!']);
                    break;
            }
        } else {
            echo json_encode(['error' => 'action parameter is missing']);
        }
    } else {
        echo json_encode(['error' => 'invalid request method']);
    }
} catch (PDOException $e) {
    echo json_encode(['error' => $e->getMessage()]);
}
