var peer = new Peer();

peer.on('open', function(id){
    document.getElementById("hostPortInfo").innerHTML = "Enter the id of the host below! Your id is: " + id;
});
