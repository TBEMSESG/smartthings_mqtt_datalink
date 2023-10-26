const smartthingsAPIUrl= 'https://api.smartthings.com/v1/'


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
  console.log(`Received full status request for ${deviceId}`)

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


module.exports = {getDevices, getDeviceFullStatus}