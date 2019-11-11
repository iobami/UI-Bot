const request = require('request');
const { getServiceMessage } = require("../Controllers/sessionController.js");


const handleMessage = async (sender_psid, received_message) => {

    // Gets response from Watson
    const serviceReply = await getServiceMessage(received_message.text);
    let response;

    // Sends the response message
    JSON.parse(serviceReply).output.generic.forEach(async (generic) => {
        response = {
            "text": generic.text,
        };
        await callSendAPI(sender_psid, response);
    });
};

const handlePostBack = () => {};

const callSendAPI = (sender_psid, response) => {
    // Construct the message body
    let request_body = {
        "recipient": {
            "id": sender_psid
        },
        "message": response
    };

    // Send the HTTP request to the Messenger Platform
    request({
        "uri": "https://graph.facebook.com/v2.6/me/messages",
        "qs": { "access_token": process.env.PAGE_ACCESS_TOKEN },
        "method": "POST",
        "json": request_body
    }, (err, res, body) => {
        if (!err) {
            console.log('message sent!');
            console.log('--------------------------');
            console.log(body)
        } else {
            console.error("Unable to send message:" + err);
        }
    });
};

module.exports = {
    handleMessage, handlePostBack
};
