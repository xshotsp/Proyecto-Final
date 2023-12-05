require("dotenv").config();
const server = require("./src/server");
const express = require("express");
const { conn } = require('./src/db.js');
const { apiLoaderProducts } = require("./src/apiLoaderProducts.js");
const cloudinary = require("cloudinary").v2;

const{PORT_SERVER,CLOUD_NAME,API_CLOUD_KEY,API_SECRET}= process.env

const PORT = PORT_SERVER;

          
cloudinary.config({ 
  cloud_name:CLOUD_NAME, 
  api_key:API_CLOUD_KEY, 
  api_secret: API_SECRET
});

server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});



conn.sync({ force: true }).then(() => {
server.listen(PORT, async() => {
  
  await apiLoaderProducts()
  console.log(`Server listening on port ${PORT}`);
})
}).catch(error => console.error(error))
