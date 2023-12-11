require("dotenv").config();
const { Sequelize } = require("sequelize");

const fs = require("fs");
const path = require("path");
// const { DATABASE_URL } = process.env;
//const { DATABASE_URL } = process.env;

//if (!DATABASE_URL) {
//throw new Error("DATABASE_URL not defined");
//}
// if (!DATABASE_URL) {
//   throw new Error("DATABASE_URL not defined");
// }

const sequelize = new Sequelize('postgres://postgres:luisma1973@localhost:5432/products', {
  logging: false,
  native: false,
});
sequelize
  .authenticate()
  .then(() => {
    console.log('Conexión exitosa');
  })
  .catch((err) => {
    console.error('Error al conectar:', err);
  });

// Opcional: Manejo de eventos para errores durante la sincronización de modelos
// sequelize
//   .sync({ force: false }) // Set force to true to drop and re-create tables on every app start
//   .then(() => {
//     console.log('Tablas sincronizadas');
//   })
//   .catch((err) => {
//     console.error('Error al sincronizar tablas:', err);
//   });

const basename = path.basename(__filename);

const modelDefiners = [];

fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

modelDefiners.forEach((model) => model(sequelize));

let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

const { Product, Brand, Rewiew, User, Favorite, UserProduct } = sequelize.models;

Product.belongsToMany(Brand, { through: "Product_Brand", timestamps: false });
Brand.belongsToMany(Product, { through: "Product_Brand", timestamps: false });

Product.belongsToMany(Rewiew, { through: "Product_Rewiew" });
Rewiew.belongsToMany(Product, { through: "Product_Rewiew" });

User.belongsToMany(Product, {
  through: { model: UserProduct, unique: false },
  as: "products",
});
Product.belongsToMany(User, {
  through: { model: UserProduct, unique: false },
  as: "users",
});

Product.belongsToMany(Favorite, {
  through: "Product_Favorite",
  timestamps: false,
});
Favorite.belongsToMany(Product, {
  through: "Product_Favorite",
  timestamps: false,
});

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize, // para importar la conexión { conn } = require('./db.js');
};
