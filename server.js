const express = require('express');
const app = express();

const http = require('http').createServer(app);
const io = require('socket.io')(http);

const port = process.env.PORT || 5000;

require('dotenv').config();

const { startSession } = require("./Controllers/sessionController.js");

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
    console.log('a user connected ', socket.id);
    socket.on('disconnect', function(){
        console.log('user disconnected');
    });

    socket.on('chat message', function(msg){
        console.log('message: ' + msg);
        // startSession(msg);
        async function message() {
            await startSession(msg);
            await io.emit('chat message', 'sup yo');
        }
        message();
    });
});

http.listen(port, () => console.log(`Example app listening on port ${port}!`));
