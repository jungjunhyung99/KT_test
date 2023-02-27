<?php

// CORS 문제 해결용
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

// DbConnect 참조
include 'DbConnect.php';
$objDb = new DbConnect();
$conn = $objDb->connect();

$method = $_SERVER['REQUEST_METHOD'];
switch ($method) {
    // kiosk_result
    case 'POST':
        $result = json_decode(file_get_contents('php://input'));

        $sql = "INSERT INTO kiosk_result(id, store, level, basket, start_time, end_time) VALUES(NULL, :store, :level, :basket, :start_time, :end_time)";
        $stmt = $conn->prepare($sql);

        $start_time = date('Y-m-d');
        $end_time = date('Y-m-d');

        $stmt->bindParam(':store', $result->store);
        $stmt->bindParam(':level', $result->level);

        $basketArr = json_encode($result->basket);
        $stmt->bindValue(':basket', $basketArr);

        $stmt->bindParam(':start_time', $result->start_time);
        $stmt->bindParam(':end_time', $result->end_time);

        if ($stmt->execute()) {
            $response = ['status' => 1, 'message' => 'Record created successfully.'];
        } else {
            $response = ['status' => 0, 'message' => 'Failed to create record.'];
        }
        echo json_encode($response);
        break;

    case 'GET':
        $sql = "SELECT * FROM kiosk_result";
        $stmt = $conn->prepare($sql);
        $stmt->execute();
        $users = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($users);

        break;
}
