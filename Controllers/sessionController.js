const AssistantV2 = require('ibm-watson/assistant/v2');
const { IamAuthenticator } = require('ibm-watson/auth');

const startSession = async (message) => {
    const service = new AssistantV2({
        version: process.env.WATSON_VERSION,
        authenticator: new IamAuthenticator({
            apikey: process.env.WASTON_APIKEY,
        }),
        url: process.env.WATSON_URL,
    });

    const serviceMessage = [];

    async function createSessionId() {
        const getSession = await service.createSession({
            assistantId: process.env.WATSON_ASSISTANT_ID
        }).then(res => {
            // console.log(JSON.stringify(res, null, 2));
            // newSessionId.push(res.result.session_id);
            return res.result.session_id;
        })
            .catch(err => {
                console.log(err);
            });

        await service.message({
            assistantId: process.env.WATSON_ASSISTANT_ID,
            sessionId: getSession,
            input: {
                'message_type': 'text',
                'text': message
            }
        }).then(res => {
            // console.log(JSON.stringify(res, null, 2));
            // console.log(res.result.output.generic);
            serviceMessage.push(res.result.output.generic);
        })
            .catch(err => {
                console.log(err);
            });

    }
    await createSessionId();
    return await serviceMessage;
};

module.exports = {
    startSession,
};
