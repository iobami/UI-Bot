const { startSession } = require("./sessionController.js");

const createConnection = (io) => {

    io.on('connection', function(socket){
        console.log('a user connected ', socket.id);
        socket.on('disconnect', function(){
            console.log('user disconnected');
        });

        socket.on('chat message', function(msg){
            console.log('message: ' + msg);
            // startSession(msg);
            async function message() {
               const [ reply ] = await startSession(msg);
               console.log(reply[0].text);
               // await io.emit('chat message', reply[0].text);
                // sending to individual socketid (private message)
               await io.to(`${socket.id}`).emit('chat message', reply[0].text);
            }
            return message();
        });
    });

};

module.exports = {
    createConnection
};
