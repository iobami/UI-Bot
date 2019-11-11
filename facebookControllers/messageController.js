const request = require('request');

const callSendAPI = (sender_psid) => {
    // Construct the message body
    let request_body = {
        "recipient": {
            "id": sender_psid
        },
        "message": 'Wassup Ayo'
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
    callSendAPI
};
