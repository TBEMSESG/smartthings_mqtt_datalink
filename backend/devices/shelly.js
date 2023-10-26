const { CoIoTServer, CoIoTClient } = require('coiot-coap');

// Listen to ALL messages in your network
const server = new CoIoTServer();

server.on('status', (status) => console.log(status));
server.listen();

// Query devices directly
const client = new CoIoTClient({ host: '192.168.10.75' });
//const status = client.getStatus().then((s) => console.log(s));

try{


const description = client.getDescription();
console.log(description)
}
catch {console.log('error')}

// // or ...
// const client = new CoIoTClient();
// const status = await client.getStatus({ host: '192.168.1.102' });
// const description = await client.getDescription({ host: '192.168.1.102' });