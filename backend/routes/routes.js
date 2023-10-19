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

router.get('/services/:id/:type', async function (req, res) {
    try {
        const serviceDetails = await smartthings.getServiceDetails(req.params.id);
                
        const deviceStatus = await smartthings.getDeviceFullStatus(serviceDetails[0].token, serviceDetails[0].deviceId);
        console.log('Response as XML =>> ',OBJtoXML(deviceStatus))
        
        if (req.params.type == 'json') res.status(200).send(deviceStatus);
        if (req.params.type == 'xml') res.status(200).send(OBJtoXML(deviceStatus)); 
        if (req.params.type != 'json' && req.params.type != 'xml')res.status(403).send("Select XML or JSON")

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

function OBJtoXML(obj) {
    var xml = '';
    for (var prop in obj) {
      xml += obj[prop] instanceof Array ? '' : "<" + prop + ">";
      if (obj[prop] instanceof Array) {
        for (var array in obj[prop]) {
          xml += "<" + prop + ">";
          xml += OBJtoXML(new Object(obj[prop][array]));
          xml += "</" + prop + ">";
        }
      } else if (typeof obj[prop] == "object") {
        xml += OBJtoXML(new Object(obj[prop]));
      } else {
        xml += obj[prop];
      }
      xml += obj[prop] instanceof Array ? '' : "</" + prop + ">";
    }
    var xml = xml.replace(/<\/?[0-9]{1,}>/g, '');
    return xml
  }


module.exports = router
