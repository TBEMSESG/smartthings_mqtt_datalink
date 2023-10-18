const { MongoClient } = require('mongodb');

const smartthingsAPIUrl= 'https://api.smartthings.com/v1/'


async function getLocations(token) {
    const headers = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        mode: "no-cors",
        cache: "default",
      };;

    fetch(`${smartthingsAPIUrl}/locations`, headers)
    .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
    
        return response.json();
      })
      .then((response) => {
        console.log(response);
      });
}
async function getLocationDetails(token, locationId) {
    const headers = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        mode: "no-cors",
        cache: "default",
      };;

    fetch(`${smartthingsAPIUrl}/locations/${locationId}`, headers)
    .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
    
        return response.json();
      })
      .then((response) => {
        console.log(response);
      });
}
async function getLocationModes(token, locationId) {
    const headers = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        mode: "no-cors",
        cache: "default",
      };;

    fetch(`${smartthingsAPIUrl}/locations/${locationId}/modes`, headers)
    .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
    
        return response.json();
      })
      .then((response) => {
        console.log(response);
      });
}
async function getRooms(token, locationId) {
    const headers = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        mode: "no-cors",
        cache: "default",
      };;

    fetch(`${smartthingsAPIUrl}/locations/${locationId}/rooms`, headers)
    .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
    
        return response.json();
      })
      .then((response) => {
        console.log(response);
      });
}
async function getDevices(token) {
    const headers = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        mode: "no-cors",
        cache: "default",
      };

    return fetch(`${smartthingsAPIUrl}/devices`, headers)
    .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
    .catch((err)=> console.log(err));
};
async function getDeviceFullStatus(token, deviceId) {
    const headers = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        mode: "no-cors",
        cache: "default",
      };;

    return fetch(`${smartthingsAPIUrl}/devices/${deviceId}/status`, headers)
    .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .catch((err)=> console.log(err));
}
async function getRoomDetails(token, locationId, roomId) {
    const headers = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        mode: "no-cors",
        cache: "default",
      };;

    return fetch(`${smartthingsAPIUrl}/locations/${locationId}/rooms/${roomId}`, headers)
    .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
    
        return response.json();
      })
      
}


const dbUrl = 'mongodb://admin:mdcpassword@db:27017';
const dbClient = new MongoClient(dbUrl);
const dbName = 'smartthings';

async function writeService(data) {
  //create random service name

  // Use connect method to connect to the server
  await dbClient.connect();
  console.log('Connected successfully to server');
  const db = dbClient.db(dbName);
  const collection = db.collection('services');

  console.log(JSON.stringify(data))
  
  const insertResult = await collection.insertOne(data);
  console.log('Inserted documents =>', insertResult);
  
  // the following code examples can be pasted here...

  return insertResult;
}






module.exports = {getDevices, getDeviceFullStatus, writeService, dbClient}