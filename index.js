var isServer = false;
var isGameStarted = false;
var randomId = Math.floor(Math.random() * 100);
var peer = new Peer("ConnectInfinity" + randomId);
var connectedAddresses = [];

// When peer is created, update the text to show the user your ID
peer.on('open', function(id){
    document.getElementById("hostPortInfo").innerHTML = "Enter the id of the host below! Your id is: " + id;
});


function connectButtonPressed(){
    conn = peer.connect(document.getElementById("hostInput").value);
    conn.on('open', function(){
        // Send the data to the server
        conn.send(peer.id);
    });
}

function hostToggle(){
    if (isServer){
        isServer = false;
    }
    else{
        isServer = true;
    }
}


peer.on('connection', function(conn) {
  conn.on('data', function(data){
    if (isServer){
        if (!isGameStarted){
            // When game has not been started, the server should create a list of addresses that talk to it
            let foundId = false;
            // Check if id is already in list
            for(let i = 0; i < connectedAddresses.length; i++){
                if (data === connectedAddresses[i]){
                    foundId = true;
                }
            }
            // Add if not in list
            if (!foundId){
                connectedAddresses.push(data);
            }

            // con = peer.connect(data);
            // con.on('open', function(){
            //     // Send the data to the server
            //     con.send("Connected");
            // });
        }


    }
    if (!isServer){
        if (!isGameStarted){
            if (data === "Connected"){
                document.getElementById("HostportInfo").innerHTML = "You have connected. Wait for the game to begin";
            }
        }
    }
  });
});

// Server needs to create a bank of all the users connected to it and then broadcast the updates to every user


