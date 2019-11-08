const { startSession, getServiceMessage } = require("./sessionController.js");

const createConnection = (io) => {

    io.on('connection', async function(socket){
        console.log('a user connected ', socket.id);
        socket.on('disconnect', function(){
            console.log('user disconnected');
        });
        const sessionId = await startSession();
        console.log(sessionId);

        socket.on('chat message', function(msg){
            console.log('message: ' + msg);
            // startSession(msg);
            async function message() {
               const [ reply ] = await getServiceMessage(msg);
               console.log(reply);
               // await io.emit('chat message', reply[0].text);
                // sending to individual socketid (private message)
               await io.to(`${socket.id}`).emit('chat message', reply);
            }
            return message();
        });
    });

};

module.exports = {
    createConnection
};
