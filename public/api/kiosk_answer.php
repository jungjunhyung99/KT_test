<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

include 'DbConnect.php';
$objDb = new DbConnect();
$conn = $objDb->connect();


$method = $_SERVER['REQUEST_METHOD'];
switch ($method) {
    case 'POST':
        // 별도의 POST 요청은 받지 않음
        break;

    case 'GET':
        $sql = "SELECT * FROM kiosk_answer WHERE store = :store AND level = :level";
        $stmt = $conn->prepare($sql);

        $stmt->bindParam(':store', $_GET['store']);
        $stmt->bindParam(':level', $_GET['level']);

        $stmt->execute();

        $result = $stmt->fetch(PDO::FETCH_ASSOC);

        echo json_encode($result);

        break;
}
