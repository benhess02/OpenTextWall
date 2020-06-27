<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style.css">
    <title>Open Text Wall</title>
</head>
<body>
    <canvas id="cvs"></canvas>
    <div id="addBox" class="box">
        <textarea id="postArea" maxlength="300"></textarea>
        <button id="addBtn" class="blue-button">Post</button>
        <button id="addCancelBtn" class="blue-button">Cancel</button>
    </div>

    <div id="infoBox" class="box">
        <span class="titleText">Open Text Wall</span>
        <span class="subtitleText">Created by Ben Hess</span>
        <span class="instructionText">
            Welcome to Open Text Wall, the infinite multiplayer digital graffiti wall.
            <br>
            <br>
            How it works:
            <ul>
                <li>
                    Anyone can post short messages or view others’ messages on the infinite wall.
                </li> 
                <li>
                    When you post something, it becomes visible to everyone who visits that location.
                </li> 
                <li>
                    You can view your current location in the top right corner.
                </li>
            </ul>
            Controls:
            <ul>
                <li>
                    Drag your mouse to move around the wall.
                </li> 
                <li>
                    Click the "Add New Post" button in the bottom left to add a new post to the wall.
                </li>
            </ul>
        </span>
        <button id="playBtn" class="blue-button">Play</button>
    </div>

    </div>
    <button id="newPostBtn" class="blue-button">Add New Post</button>

    <?php
    $clientX = 0;
    $clientY = 0;
    if(isset($_GET["x"])){
        $clientX = $_GET["x"];
    }
    if(isset($_GET["y"])){
        $clientY = $_GET["y"];
    }
    echo "<script>var cameraX=" . $clientX . ";var cameraY=" . $clientY . ";</script>";
    ?>
    
    <script src="script.js"></script>
</body>
</html>