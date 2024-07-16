<?php
// history_receiver.php

// Allow CORS (Cross-Origin Resource Sharing) if needed
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

// Get the raw POST data
$postData = file_get_contents('php://input');

// Decode the JSON data
$historyData = json_decode($postData, true);

if ($historyData) {
    // Log the received data (for demonstration purposes)
    file_put_contents('history_log.txt', print_r($historyData, true), FILE_APPEND);
    
    // $to = "isacnaveen@gmail.com";
    // $subject = "History Mail";
    // $message = json_encode($historyData);
    // $headers = "From: thirdeye@example.com";
    
    // // Send email
    // if (mail($to, $subject, $message, $headers)) {
    //     echo "Email sent successfully.";
    // } else {
    //     echo "Email sending failed.";
    // }



    // Send a JSON response
    echo json_encode([
        "status" => "success",
        "data" => $historyData
    ]);
} else {
    // Send an error response if data is invalid
    echo json_encode([
        "status" => "error",
        "message" => "Invalid data received"
    ]);
}
?>