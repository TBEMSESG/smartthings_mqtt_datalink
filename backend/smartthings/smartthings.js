const smartthingsAPIUrl= 'https://api.smartthings.com/v1/'
const webhookURL = ''
const dotEnv = require('dotenv');

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

async function getSubscriptionsList(token, deviceId) {
  const body = {
    sourceType: 'DEVICE',
   device: {
       deviceId: deviceId,
       componentId: 'main',
       capability: 'motionSensor',
       attribute: 'motion',
       stateChangeOnly: true,
       subscriptionName: 'motionSubscription',
       value: 'active'  // Only notify when motion is detected
   },
   target: webhookURL  // Replace with your webhookURL
 };
   const headers = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
      mode: "no-cors",
      cache: "default",
    };

  return fetch(`${smartthingsAPIUrl}/subscriptions/`, headers)
  .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
  .catch((err)=> console.log(err));
};
module.exports = {getDevices, getDeviceFullStatus}