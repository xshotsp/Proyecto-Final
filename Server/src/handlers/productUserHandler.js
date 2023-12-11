const {
  createRelation,
  updateRelation,
  deleteRelation,
  getAllProductsUser,
} = require("../controllers/productUserController");

const createRelationHandler = async (req, res) => {
  try {
    const response = await createRelation(req.body);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


const cleanResponse = (user) => {
  const cleanedProducts = user.products.map((product) => {
    return {
      id: product.id,
      name: product.name,
      image: product.image,
      colour: product.colour,
      quantity: product.userProduct.quantity,
      price: product.price,
      relationId: product.userProduct.id
    };
  });

  // Ordenar por relationId de menor a mayor
  cleanedProducts.sort((a, b) => a.relationId - b.relationId);

  return cleanedProducts;
};


const getAllProductsUserHandler = async (req, res) => {
  try {
    const response = await getAllProductsUser(req.params);
    const cleanedProducts = cleanResponse(response)
    return res.status(200).json(cleanedProducts);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateRelationHandler = async (req, res) => {
  try {
    const response = await updateRelation(req.body);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};



const deleteRelationHandler = async (req, res) => {
  try {
    const response = await deleteRelation(req.params);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createRelationHandler,
  getAllProductsUserHandler,
  updateRelationHandler,
  deleteRelationHandler,
};
