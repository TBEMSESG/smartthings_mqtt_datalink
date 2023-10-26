# smartthings_mqtt_datalink

## What does it do?
The tool provides the status of IoT devices as clean XML or JSON that can be used by Samsung Smart Signage displays, either directly as W-Player content that consumes JSON data, or by using DataLink Server with S-Player.

The tool allows you to get all the information you need from your Smartthings account, select the IoT devices you want to integrate with DataLink or W-Player, and add those devices to a database. These "services" are then exposed as an API to get a clean XML or JSON feed without having to worry about logins.

The tool will be extended to be able to add many other devices, especially Shelly will be added in the near future.

![diagram](/images/smartthing_mqtt_datalink.drawio.png)

##Smartthings

>To use the Smartthings API, a personal token is needed. 
[Find the needed information here](https://developer.smartthings.com/docs/advanced/authorization-and-permissions) 


Important: 
Your smartthings token is stored into the db at the moment you create a new Service. 
The token is encrypted before writing to the DB and decrypted during use.  

It's important that you change the 
```    
environment:
    SECRET: 'mydemosecret'
```
mydemosecret value in `docker-compose.yml` to a random string. This string is used for the encryption and should be uniqe and random. 

The tool (at the moment, Samsung Smartthings related) build a middleware between different IoT devices and Samsung DataLink or Samsung W-player.

