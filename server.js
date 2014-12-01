var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var server = require('http').createServer(app);


var ipaddress = process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1";
var port = process.env.OPENSHIFT_NODEJS_PORT || 8080;


app.get('/', function (req, res) {
    res.sendfile(__dirname + '/index.html');
});


io.on('connection', function (socket) {
    socket.on('chat message', function (msg) {
        console.log("Chat running");
        io.emit('chat message', msg);
    });
});


http.listen(port, function () {
    console.log('listening on *:3000');
});

