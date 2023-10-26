const express = require('express');
const smartthings = require ('../devices/smartthings.js');
const connector = require ('../dbconnector/dbconnector.js');

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
 
    connector.writeService(req.body)
        .then((result) => {
            console.log('result from DB:', result)
        res.status(200).send(JSON.stringify(result)); 
        })
        .catch((error) => {
            console.error(error);
            res.status(500).send('Internal Server Error');
        });
});
router.get('/services', function (req, res) {
 
    connector.getServices()
        .then((result) => {
        
        res.status(200).send(result); 
        })
        .catch((error) => {
            console.error(error);
            res.status(500).send('Internal Server Error');
        });
});
router.get('/services/:id/:type', async function (req, res) {
    try {
        const serviceDetails = await connector.getServiceDetails(req.params.id);
                
        const deviceStatus = await smartthings.getDeviceFullStatus(serviceDetails[0].token, serviceDetails[0].deviceId);
        //console.log('Response as XML =>> ',OBJtoXML(deviceStatus))
        
        if (req.params.type == 'json') res.status(200).send(deviceStatus);
        if (req.params.type == 'xml') res.status(200).send(OBJtoXML(deviceStatus)); 
        if (req.params.type != 'json' && req.params.type != 'xml')res.status(403).send("Select XML or JSON")

    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});
router.get('/details/:id', async function (req, res) {
    try {
        const serviceDetails = await connector.getServiceDetails(req.params.id);
        serviceDetails[0].token = "";
        res.status(200).send(serviceDetails);
        
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});
router.put('/details/:id', async function (req, res) {
    try {
        // add check for correct body payload
        
        // call update function
        const updateService = await connector.updateServices(req.params.id,req.body);
        res.status(200).send(updateService);
        
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});
router.delete('/details/:id', async function (req, res) {
    try {
        // add check for correct body payload
        
        // call update function
        const delService = await connector.deleteServices(req.params.id);
        res.status(200).send(delService);
        
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

// function to convert Object to XML (for DataLink)
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
