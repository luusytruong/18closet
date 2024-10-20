<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

include __DIR__ . '/../../model/db.php';

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $table = isset($_GET['table']) ? $_GET['table'] : null;

    if ($table) {
        
        $sql = "SELECT * FROM $table ORDER BY id ASC";
        $stmt = $pdo->prepare( $sql );
    
        header( 'Content-Type: application/json; charset=UTF-8' );
        
        if ( $stmt->execute() ) {
            $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
            // send json to client
            echo json_encode( $data );
        } else {
            echo json_encode( [ 'error'=> 'failed to execute query' ] );
        }
    } else {
        echo json_encode( [ 'error'=> 'table parameter is missing' ] );
    }
} else {
    echo json_encode( [ 'error'=> 'invalid request method' ] );
}

?>