const { MongoClient } = require('mongodb');
const dbUrl = 'mongodb://admin:mdcpassword@db:27017';
const dbClient = new MongoClient(dbUrl);
const dbName = 'smartthings';
const Cryptr = require('cryptr');
const _mySecret = process.env.SECRET;
const cryptr = new Cryptr(_mySecret);



async function writeService(data) {
    //create random service name
    let serviceId = makeid();
    let encryptedToken = cryptr.encrypt(data.token);
    
    let newData = data
    newData.serviceId = serviceId;
    newData.token = encryptedToken;
    console.log(data.token , newData.token)
    // Use connect method to connect to the server
    await dbClient.connect();
    console.log('Connected successfully to server');
    
    const db = dbClient.db(dbName);
    const collection = db.collection('services');
  
    console.log(JSON.stringify(newData))
    
    const insertResult = await collection.insertOne(newData);
    console.log('Inserted documents =>', insertResult);

    return newData;
  }
  async function getServices() {
  
    // Use connect method to connect to the server
    await dbClient.connect();
    console.log('Connected successfully to server');
    
    const db = dbClient.db(dbName);
    const collection = db.collection('services');
  
    const findResult = await collection.find({}).toArray();
    console.log('Found documents =>', findResult);
  
    return findResult;
  }
  async function getServiceDetails(sId) {
  
    // Use connect method to connect to the server
    await dbClient.connect();
    
    const db = dbClient.db(dbName);
    const collection = db.collection('services');
  
    const findResult = await collection.find({serviceId:sId}).toArray();
    console.log('Encrypted =>', findResult[0].token);
    const token = cryptr.decrypt(findResult[0].token);
    findResult[0].token = token; 
    console.log('deCrypted =>', findResult[0].token);
  
    return findResult;
  }
  async function deleteServices(sId) {
  
    // Use connect method to connect to the server
    await dbClient.connect(sId);
    console.log('Connected successfully to server');
    
    const db = dbClient.db(dbName);
    const collection = db.collection('services');
  
    const deleteResult = await collection.deleteOne({ serviceId: sId });
  console.log('Deleted documents =>', deleteResult);
  
    return deleteResult;
  }
  async function updateServices(sid, data) {
  
    // Use connect method to connect to the server
    await dbClient.connect();
    console.log('Connected successfully to server');
    
    const db = dbClient.db(dbName);
    const collection = db.collection('services');
    if (data.token) {
    const encryptedToken = cryptr.encrypt(data.token);
    data.token = encryptedToken
    };
    const updateResult = await collection.updateOne({ serviceId: sid }, { $set: data});
  console.log('Updated documents =>', updateResult);
    return updateResult;
  }
  
  // create a random string as Service ID, to be used in Services
  function makeid() {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < 16) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
  }


  module.exports = {writeService, getServiceDetails, getServices, deleteServices, updateServices, deleteServices, dbClient}