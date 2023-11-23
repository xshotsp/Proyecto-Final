const server = require("./src/server");
const { conn } = require('./src/db.js');
const { apiLoaderProducts } = require("./src/apiLoaderProducts.js");
const cloudinary = require("cloudinary").v2;

const PORT = 3001;

          
cloudinary.config({ 
  cloud_name: 'dlhtl7wr4', 
  api_key: '639611433264547', 
  api_secret: 'EqvrtUWaUDEpg4aAChNztTm8SAU' 
});


conn.sync({ force: true }).then(() => {
server.listen(PORT, async() => {
  await apiLoaderProducts()
  console.log(`Server listening on port ${PORT}`);
})
}).catch(error => console.error(error))
