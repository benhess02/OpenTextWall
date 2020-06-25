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
    if(isset($_POST[$name])){
        return $_POST[$name];
    }
    sendError("Missing request parameter '" . $name . "'.");
}

if(!file_exists("data.json")){
    file_put_contents("data.json", "[]");
}

$json = file_get_contents("data.json");

if($json == ""){
    $json = "[]";
}

if(isset($_POST["text"])) {
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