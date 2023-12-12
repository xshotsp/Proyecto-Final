require("dotenv").config();
const { Sequelize } = require("sequelize");

const fs = require("fs");
const path = require("path");

const { DATABASE_URL, DB_USER, DB_PASSWORD, DB_HOST } = process.env;

if (!DATABASE_URL) {
  throw new Error("DATABASE_URL not defined");
}

  // const sequelize = new Sequelize(DATABASE_URL, {
  //   logging: false,
  //   native: false,
  // });
  const sequelize = new Sequelize(
    `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/products`,
    { logging: false }
 );


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
  conn: sequelize, // para importart la conexión { conn } = require('./db.js');
};
