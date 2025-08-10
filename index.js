let isServer = false;
let isGameStarted = false;
let randomId = Math.floor(Math.random() * 100);
let peer = new Peer("ConnectInfinity" + randomId);
let connectedAddresses = [];
let connectedConns = [];
let conn = null;

// Show your ID when peer is created
peer.on('open', function(id){
    document.getElementById("hostPortInfo").innerHTML = "Enter the id of the host below! Your id is: " + id;
});

function connectButtonPressed(){
    conn = peer.connect(document.getElementById("hostInput").value);

    conn.on('open', function(){
        console.log("Client: Connection opened");
        conn.send(peer.id);
    });

    conn.on('data', function(data){
        console.log("Client received:", data);
        if (!isServer && !isGameStarted && data === "Connected"){
            document.getElementById("hostPortInfo").innerHTML = "You have connected. Wait for the game to begin";
        }
    });
}

function hostToggle(){
    isServer = !isServer;
    if (isServer) {
        document.getElementById("hostPortInfo").innerHTML = "You are now hosting. Your ID is: " + peer.id;
    }
}

// Server-side: Handle incoming connections
peer.on('connection', function(newConn) {
    console.log("Server: New connection received");

    newConn.on('open', function() {
        console.log("Server: Connection opened with client");
    });

    newConn.on('data', function(data){
        console.log("Server received:", data);
        if (isServer && !isGameStarted){
            if (!connectedAddresses.includes(data)){
                connectedAddresses.push(data);
                connectedConns.push(newConn);
                console.log("Server: Added new client", data);
                // Notify the new client
                newConn.send("Connected");
            }
        }
    });
});