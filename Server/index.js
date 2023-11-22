const server = require("./src/server");
const { conn } = require('./src/db.js');
const { apiLoaderProducts } = require("./src/apiLoaderProducts.js");
const PORT = 3001;

conn.sync({ force: false }).then(() => {
server.listen(PORT, async() => {
  await apiLoaderProducts()
  console.log(`Server listening on port ${PORT}`);
})
}).catch(error => console.error(error))
