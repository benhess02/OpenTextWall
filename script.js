// *** Game variables ***
var data = [];
var gameEnabled = true;


// *** Graphics variables ***
var cvs = document.getElementById("cvs");
var ctx = cvs.getContext("2d");

var cameraX = 0;
var cameraY = 0;


// *** UI variables ***
var infoBox = document.getElementById("infoBox");
var playBtn = document.getElementById("playBtn");

var addBox = document.getElementById("addBox");
var addBtn = document.getElementById("addBtn");
var addCancelBtn = document.getElementById("addCancelBtn");
var postArea = document.getElementById("postArea");

var newPostBtn = document.getElementById("newPostBtn");


// *** Input variables ***
var mouseX = 0;
var mouseY = 0;
var mouseDown = false;

var dragMouseX = 0;
var dragMouseY = 0;

var dragCameraX = 0;
var dragCameraY = 0;


// *** UI ***
function openWindow(window){
    if(gameEnabled){
        setGameEnabled(false);
        window.style.visibility = "visible";
    }
}

function closeWindow(window){
    setGameEnabled(true);
    window.style.visibility = "hidden";
}

playBtn.onclick = function() {
    closeWindow(infoBox);
};

newPostBtn.onclick = function(){
    openWindow(addBox);
};

addBtn.onclick = function(){
    addBtn.disabled = true;
    addBtn.innerText = "Posting...";

    var text = postArea.value;
    var x = cameraX;
    var y = cameraY;

    var req = new XMLHttpRequest();
    req.open("POST", "server.php"); 
    req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    req.send(encodeURI("text=" + text + "&x=" + x + "&y=" + y));

    req.onreadystatechange = function(ev){
        if(req.readyState != 4) return;

        data.push({"text": text, "x": x, "y": y});
        closeWindow(addBox);
        addBtn.disabled = false;
        addBtn.innerText = "Post";
        postArea.value = "";
    }
};

addCancelBtn.onclick = function(){
    closeWindow(addBox);
    postArea.value = "";
}

// *** Network ***
function getData(){
    var req = new XMLHttpRequest();
    req.open("GET", "server.php");
    req.send();
    req.onreadystatechange = function(ev){
        if(req.readyState != 4) return;
        data = JSON.parse(req.responseText);
        window.setTimeout(getData, 4000);
    }
}


// *** Graphics ***
function resizeCanvas(){
    this.cvs.width = this.cvs.clientWidth;
    this.cvs.height = this.cvs.clientHeight;
}

function drawBackground(){
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, cvs.width, cvs.height);

    ctx.strokeStyle = "grey";
// Test
    var gridSize = 150;

    var xLines = Math.ceil(cvs.width / gridSize);
    var yLines = Math.ceil(cvs.height / gridSize);

    var xLineOffset = (cvs.width / 2 - cameraX) % gridSize;
    var yLineOffset = (cvs.height / 2 - cameraY) % gridSize;

    if(xLineOffset < 0) xLineOffset += gridSize;
    if(yLineOffset < 0) yLineOffset += gridSize;

    for(var xl = 0; xl < xLines; xl++){
        ctx.beginPath();
        ctx.moveTo(xl * gridSize + xLineOffset, 0);
        ctx.lineTo(xl * gridSize + xLineOffset, cvs.height);
        ctx.stroke();
    }

    for(var yl = 0; yl < yLines; yl++){
        ctx.beginPath();
        ctx.moveTo(0, yl * gridSize + yLineOffset);
        ctx.lineTo(cvs.width, yl * gridSize + yLineOffset);
        ctx.stroke();
    }
}

function drawText(){
    var xOffset = cvs.width / 2 - cameraX;
    var yOffset = cvs.height / 2 - cameraY;

    var textSize = 15;

    ctx.fillStyle = "black";
    ctx.font = textSize + "px sans-serif";
    ctx.textAlign = "center";

    for(var i = 0; i < data.length; i++){
        var _x = data[i].x + xOffset;
        var _y = data[i].y + yOffset;
        var lines = data[i].text.split("\n");
        for(var l = 0; l < lines.length; l++){
            ctx.fillText(lines[l], _x, _y + (l * textSize));
        }
    }
}

function drawStatusText(){
    ctx.fillStyle = "black";
    ctx.font = "15px sans-serif";
    ctx.textAlign = "left";
    ctx.fillText("X: " + cameraX + "  Y: " + cameraY, 15, 25);
}


// *** Input ***
window.onresize = function(){
    this.resizeCanvas();
};

window.onmousemove = function(ev){
    if(this.gameEnabled){
        this.mouseX = ev.clientX;
        this.mouseY = ev.clientY;
    }
};

window.onmousedown = function(ev){
    if(this.gameEnabled){
        if(ev.button != 0) return;
        this.mouseDown = true;
        this.dragMouseX = this.mouseX;
        this.dragMouseY = this.mouseY;
        this.dragCameraX = this.cameraX;
        this.dragCameraY = this.cameraY;
    }
};

window.onmouseup = function(ev){
    if(ev.button != 0) return;
    this.mouseDown = false;
};

window.oncontextmenu = function() {
    return false;
};

// *** Game ***
function setGameEnabled(enabled){
    gameEnabled = enabled;
    newPostBtn.disabled = !enabled;
    if(!enabled) mouseDown = false;
}

window.setInterval(function(){
    drawBackground();
    drawText();
    drawStatusText();
    if(mouseDown){
        cameraX = Math.floor(dragCameraX + (dragMouseX - mouseX));
        cameraY = Math.floor(dragCameraY + (dragMouseY - mouseY));
    }
}, 30);

resizeCanvas();
openWindow(infoBox);
getData();