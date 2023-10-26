const bonjour = require('bonjour')();



function discoverShelly(time) {
    console.log('Searching for Shelly devices...');
    let devicesList = [];

    // Start browsing for Shelly devices
    const browser = bonjour.find({ type: 'http' }, function (service) {
    // Check if the device is a Shelly device
    if (service.name.includes('shelly')) {
        const device = {
            deviceName: service.name,
            deviceAddress: service.addresses[0]  // Assuming IPv4 address is first, you might want to handle this differently
        };
        devicesList.push(device);
        console.log('Shelly Device Found:', device);
    }
    });

    // Stop searching after 10 seconds
    setTimeout(() => {
    browser.stop();
    bonjour.destroy();
    console.log('Search completed.');
    return devicesList
    }, time*1000);
}

discoverShelly(30)
module.exports = {discoverShelly};