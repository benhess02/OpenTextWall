<?php

function sendResponce($status, array $data){
    $obj = array_merge(["status" => $status], $data);
    echo json_encode($obj);
    exit(0);
}

function sendError($message){
    sendResponce("error", ["message" => $message]);
}

function sendOK(){
    sendResponce("ok", []);
}

function requireParam($name){
    if(isset($_REQUEST[$name])){
        return $_REQUEST[$name];
    }
    sendError("Missing request parameter '" . $name . "'.");
}

$json = file_get_contents("data.json");

if(isset($_REQUEST["text"])) {
    $text = requireParam("text");
    $x = intval(requireParam("x"));
    $y = intval(requireParam("y"));

    $data = json_decode($json);
    array_push($data, ["text" => $text, "x" => $x, "y" => $y]);
    $json = json_encode($data);
    file_put_contents("data.json", $json);
    sendOK();
}
else {
    echo $json;
}
?>