const express = require('express');
const app = express();

const http = require('http').createServer(app);
const io = require('socket.io')(http);

const port = process.env.PORT || 5000;

require('dotenv').config();

const { createConnection } = require("./Controllers/socket.js");

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

createConnection(io);

http.listen(port, () => console.log(`Example app listening on port ${port}!`));
