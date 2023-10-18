const express = require('express');
const smartthings = require ('../smartthings/smartthings.js');

const router = express.Router();


router.post('/devices', function (req, res) {
 
    smartthings.getDevices(req.body.token)
        .then((result) => {
        res.status(200).send(result.items); 
        })
        .catch((error) => {
            console.error(error);
            res.status(500).send('Internal Server Error');
        });
});

router.post('/services', function (req, res) {
 
    smartthings.writeService(req.body)
        .then((result) => {
            console.log('result from DB:', result)
        res.status(200).send(JSON.stringify(result)); 
        })
        .catch((error) => {
            console.error(error);
            res.status(500).send('Internal Server Error');
        })
        .finally(() => smartthings.dbClient.close());
});

router.get('/services', function (req, res) {
 
    smartthings.getServices()
        .then((result) => {
        
        res.status(200).send(result); 
        })
        .catch((error) => {
            console.error(error);
            res.status(500).send('Internal Server Error');
        })
        .finally(() => smartthings.dbClient.close());
});

router.get('/services/:id', async function (req, res) {
    try {
        const serviceDetails = await smartthings.getServiceDetails(req.params.id);
        console.log('res= ', serviceDetails)
        console.log('Token from response', serviceDetails[0].token);
        
        const deviceStatus = await smartthings.getDeviceFullStatus(serviceDetails[0].token, serviceDetails[0].deviceId);
        
        res.status(200).send(deviceStatus); 

    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});


router.post('/devices/:id', function (req, res) {
    smartthings.getDeviceFullStatus(req.body.token, req.params.id)
        .then((result) => {
        res.status(200).send(result); 
        })
        .catch((error) => {
            console.error(error);
            res.status(500).send('Internal Server Error');
        });
});


module.exports = router
