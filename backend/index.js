const express = require ('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

const {MongoClient , ObjectId } = require('mongodb');
const smartthings = require ('./smartthings/smartthings.js');

app.use(cors());
app.use(bodyParser.json());


//routes
app.post('/devices', function (req, res) {
    console.log('new Call to /devices API ->')
    console.log('received body :', req.body)
    console.log('received token :', req.body.token)
    smartthings.getDevices(req.body.token)
        .then((result) => {
        res.status(200).send(result.items); 
        })
        .catch((error) => {
            console.error(error);
            res.status(500).send('Internal Server Error');
        });
});
app.post('/devices/:id', function (req, res) {
    smartthings.getDeviceFullStatus(req.body.token, req.params.id)
        .then((result) => {
        res.status(200).send(result); 
        })
        .catch((error) => {
            console.error(error);
            res.status(500).send('Internal Server Error');
        });
});

app.listen(3000)
console.log("listening on port 3000")