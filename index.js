let chat = "";
let connected = false;
// const canvas = document.getElementById("chatCanvas");
// const ctx = canvas.getContext("2d");

var peer = new Peer({debug: 3});
var conn = null;


peer.on('open', function(id) {
	console.log('My peer ID is: ' + id);
  });

// function canvasClear(){
//     ctx.fillStyle = "rgba(222, 230, 246, 1)";

//     ctx.clearRect(0, 0, canvas.width, canvas.height);
//     ctx.fillRect(0, 0, canvas.width, canvas.height);
// }

function drawText(){
    // let canvasDrawX = 0;
    // let canvasDrawY = 0;

    // const XIncrement = 64;
    // const YIncrement = 64;

    // canvasClear();

    // for (let i = 0; i < chat.length; i++){
    //     ctx.drawImage(document.getElementById(chat[i]), canvasDrawX, canvasDrawY);
    //     canvasDrawX += XIncrement;
    //     if (canvasDrawX + XIncrement > canvas.width){
    //         canvasDrawX = 0;
    //         canvasDrawY += YIncrement;
    //     }
    // }
    document.getElementById("chat").innerHTML = chat;
}

// Register when a key is pressed and add it to the paragraphText
document.body.onkeydown = function (key) {
    if (key.key === "Backspace"){
        chat = chat.slice(0, -1);
    }
    else{
        chat += key.key;
    }
    sendKey(key.key);
    drawText();
};

function receiveKey(key) {
    if (letterImageMap.has(key)){
        chat += key;
    }
    else if (key === "Backspace"){
        chat = chat.slice(0, -1);
    }
    drawText();
}

function sendKey(key){
    // Broadcast the key you pressed to all peers on the network
    // for (let i = 0; i < conList.length; i++){
    //     conList[i].send(key);
    // }
    conn.send(key);
}

function getSelfId(){
    document.getElementById("IdBox").innerHTML = "Your id is: " + peer.id;
}

function connectButtonPressed(){
    setTimeout(() => {
        conn = peer.connect(document.getElementById("hostInput").value);
    }, 1000);
    setupConnection(conn);
    console.log("Established connection with user: " + conn.peer);
}

function changeDisplayToConnected(){
    document.getElementById("IdBox").innerHTML = "Connected! :)";
}

function setupConnection(connection) {
  conn = connection;
  conn.on("open", () => {
    console.log("connected to", conn.peer);
    connected = true;
    changeDisplayToConnected();
  });
  conn.on("data", (data) => {
    console.log("received", data);
    receiveKey(data);
  });
}

peer.on('connection', function(conn) {
    setTimeout(() => {
        setupConnection(conn);
    }, 1000);
});

function resizePage() {

    // canvas.width = window.innerWidth * 0.9;
    // canvas.height = window.innerHeight * 0.8;

    // canvasClear();

    drawText();
}

window.onload = window.onresize = function () {
    resizePage();
};
