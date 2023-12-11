const { Product, Brand } = require("../db")

const getBrandsDb = async () => {
  const brandsDb = await Brand.findAll({
    include: {
      model: Product,
      through: { attributes: [] },
    },
  });
  return brandsDb;
}

module.exports = {
    getBrandsDb
}