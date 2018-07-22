var accountSid = 'AC534c012462716fe38dc6b7db52133278';
var authToken = '2bc099423196c706f3fc34f257ecb83e';

var client = new twilio(accountSid, authToken);
//TODO:
exports.twilio = (req, res) => {
    const { params: body = messageBody, to = toPhoneNumber } = req;

}

function sendMessage(toPhoneNumber, messageBody) {

    client.messages.create({
            body: messageBody,
            to: toPhoneNumber, // Text this number
            from: '+17738325654' // From a valid Twilio number
        })
        .then((message) => console.log(message.sid));
}