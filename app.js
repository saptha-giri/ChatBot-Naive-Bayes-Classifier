const mlModel = require('./MyClassifier/classifier');
const Mymodel = require('./MyClassifier/Mymodel');
const chat = require('./MyClassifier/chat');
const express = require('express');
const fs = require('fs');

const app = express();
app.use(express.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


// Adding few changes

// trainModel();

app.get('/', (req, res) => {
	let data = {};
	data.text = "Hello World";
    res.send(data);
});

app.post('/api/chat/trainModel', (req, res) => {
    let result = Mymodel.trainModel();
    res.send(result);
});

app.post('/api/chat/reply', (req, res) => {
    let userMessage = req.body.userMessage;
    chat.getAction(userMessage).then((trainedAction) => {

        trainedAction = trainedAction.substring(1, trainedAction.length - 1);

        console.log("Trained Action",trainedAction)

        var botReplyObject = JSON.parse(fs.readFileSync('reply.json', 'utf8'));
        botReplyObject.forEach((botData) => {
            console.log("reply Action",botData.action)
            if (trainedAction == botData.action) {
            	var response = {};
            	response.reply = botData.reply;
                res.send(response);
                return false;
            }
        });
    }, (err) => {
        res.send(err);
    });
});

app.listen(8080, () => {
    console.log("listening... 8080")
});