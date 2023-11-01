const bonjour = require('bonjour')();


function discoverShelly(time) {
    return new Promise((resolve) => {
        let devicesList = [];
        console.log('Searching for Shelly devices...');
  
      // Start browsing for Shelly devices
      const browser = bonjour.find({ type: 'http' }, function (service) {
        //console.log('Service found:', service.name); // Log every service found

        // Check if the device is a Shelly device
        if (service.name.includes('shelly')) {
          const device = {
            deviceName: service.name,
            deviceAddress: service.addresses[0],  // Assuming IPv4 address is first, you might want to handle this differently
            deviceApp : service.txt.app
          };
          devicesList.push(device);
          console.log('Shelly Device Found:', devicesList);
        }
      });
  
      // Stop searching after 'time' seconds
      setTimeout(() => {
        browser.stop();
        bonjour.destroy();
        console.log('Search completed. Devices found:', devicesList.length);

        resolve(devicesList);  // Resolve the promise with the list of devices
      }, time * 1000);
    });
  }

  
discoverShelly(10)
module.exports = {discoverShelly};