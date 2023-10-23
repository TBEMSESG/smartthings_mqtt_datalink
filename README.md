# smartthings_mqtt_datalink

status:
needs Smartthings token to connect to the devices.

Important: 
smartthings token is stored in plain text to the db if you create a new service. This has to be changed in the future


## What does it do?
this tool (at the moment, Samsung Smartthings related) build a middleware between different IoT devices and Samsung DataLink or Samsung W-player.

The tool allows to get all the needed information from your Smartthings account, choose the IoT devices to integrate in DataLink or W-Player and add this device to a Database. These "services" are then provided as API to receive a clean XML or JSON feed, without having to worry about logins anymore.

The tool will be extended to be able to add many other devices, first of all, shelly will be added in the near future.