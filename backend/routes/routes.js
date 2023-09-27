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
