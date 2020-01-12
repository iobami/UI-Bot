const { startSession, getServiceMessage } = require("./sessionController.js");
const { getDeptCutOffResponse } = require("./getDeptCutOffResponse.js");
const cutMarks = require("../Uni Ibadan Depts/cutoffMarks.js");
const { fetchCutoff, fetchSchoolFees } = require("../Uni Ibadan Depts/fetchDeptCutoff.js");

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
                const newReply = [];
               console.log('skrrr-------');
                let checkCutOff = false;
               const arrayOfEntities = JSON.parse(reply).output.entities;
               const userDefinedContext = JSON.parse(reply).context.skills[ 'main skill' ].user_defined;
               await arrayOfEntities.forEach( async (entityObject) => {
                   if (!JSON.parse(reply).output.entities.length) {
                       return;
                   }
                   if ((entityObject.entity === 'departments') && (userDefinedContext.check_tuition_department)) {
                       checkCutOff = true;
                       const schoolFees = await fetchSchoolFees(userDefinedContext.check_tuition_department);
                       newReply.push(getDeptCutOffResponse(schoolFees));

                   } else if (entityObject.entity === 'departments') {
                        checkCutOff = true;
                        let matchedCutoff = await fetchCutoff(entityObject.value, cutMarks);
                        const newReplyObject = [];
                        await matchedCutoff.forEach((matchedCutoffObject) => {
                            // const resText = `Faculty: ${matchedCutoffObject.faculty} || Department: ${matchedCutoffObject.dept} || Cut-Off ${matchedCutoffObject.cutoff}`;
                            const resText = `The cut off mark for ${matchedCutoffObject.dept}, in ${matchedCutoffObject.faculty} is ${matchedCutoffObject.cutoff}`;
                            newReplyObject.push({ response_type: 'text', text: resText });
                        });
                        newReply.push(getDeptCutOffResponse(newReplyObject));
                    }
                });
               // await io.emit('chat message', reply[0].text);
                // sending to individual socketid (private message)
                console.log('Check cutoff: ', checkCutOff);
                if (checkCutOff === true) {
                    await newReply[0];
                    await io.to(`${socket.id}`).emit('chat message', newReply[0]);
                } else {
                    await io.to(`${socket.id}`).emit('chat message', reply);
                }
            }
            return message();
        });
    });

};

module.exports = {
    createConnection
};
