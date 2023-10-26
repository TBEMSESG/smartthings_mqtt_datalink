# smartthings_mqtt_datalink

## What does it do?
The tool provides the status of IoT devices as clean XML or JSON that can be used by Samsung Smart Signage displays, either directly as W-Player content that consumes JSON data, or by using DataLink Server with S-Player.

The tool allows you to get all the information you need from your Smartthings account, select the IoT devices you want to integrate with DataLink or W-Player, and add those devices to a database. These "services" are then exposed as an API to get a clean XML or JSON feed without having to worry about logins.

The tool will be extended to be able to add many other devices, especially Shelly will be added in the near future.

![diagram](/images/smartthing_mqtt_datalink.drawio.png)

## How to start (docker-compose)

!!!DANGER This app is provided as-is. Please audit the code and be aware that we cannot provide any support nor warranty.

As the tool runs locally, you need a host machine with already installed docker and docker compose. [Link to Docker](https://www.docker.com)

You can clone the complete repository to your local host with
```bash
git clone https://github.com/TBEMSESG/smartthings_mqtt_datalink.git
```
you have to update some parts in `docker-compose.yml`:
```bash
cd smartthings_mqtt_datalink
nano docker-compose.yml
```

It's important that you change the `mydemosecret` string to some random caracters and numbers and save the file again:
```    
environment:
    SECRET: 'mydemosecret'
```
!!!INFO This string is used for the encryption and should be uniqe and random. 

Then run docker compose 
```bash
docker compose up -d
```

please check that all needed containers are started by running
```bash
docker ps
```
You should see 4 running containers.

Connect to the web management page on `http://yourIP:8888` (dev: port to be changed in future when traefik proxy is added to the stack)

## How to use
On the web management page you see the currently available services, you can add new ones or modify / delete available ones.

### Available services
![Alt text](/images/availableServices.png)
Data Structure:
Name of the service (initially the device name) | URL for DataLink | Edit | Delete

The URL for DataLink can be copied and entered directly into DataLink as a new Web Service
![DataLink Setup](/images/DataLinksetup.png)

Datalink works best with XML data. If you need JSON, just modify the URL and replace `xml` by `json`. In this example the new URL would look like `http://localhost:3000/services/J2iBRde3WjC49lAI/json`

**Edit or Delete** 
Every service in the list, can be edited or deleted.

!!!WARNING There is no protection. Use carefully as this cannot be undone.
![Alt text](/images/editService.png)
Feel free to change the device name to whatever best describes your device. 
If your personal token has change, you can update it here.
there is no type of protection: entering a wrong token or changing the deviceId could corrupt your service.

##Smartthings

!!!INFO To use the Smartthings API, a personal token is needed. [Find the needed information here](https://developer.smartthings.com/docs/advanced/authorization-and-permissions)

Important: 
Your smartthings token is stored into the db at the moment you create a new Service. 
The token is encrypted before writing to the DB and decrypted during use.  

### Add new device as a service
click on `smartthings` under **Create new Services** 
Enter your smartthing personal token and click `Get Devices`
As you see the list of devices associated with your personal token, you can click on the name of one of the device, to see the current status of the device
![Alt text](/images/deviceList.png)
If you wish to add the device to the tool, that it can be used for DataLink or W-Player, just click on `create`.
The device is the added as a service and immediately available to be used.
