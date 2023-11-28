const { Sequelize } = require("sequelize");
const { Product, Brand } = require("../db");
const cloudinary = require("cloudinary").v2;
const { Op } = require("sequelize");

//*********************************************************** */
// trae todos los productos de la base de datos
const getAllProducts = async () => {
  const productsDB = await Product.findAll({
    include: {
      model: Brand,
      through: { attributes: [] },
    },
  });

  return productsDB;
};
//*********************************************************** */

// trae el procucto del id correspondiente...se usa para el detalle
const getProductsById = async (id) => {
  const productDB = await Product.findByPk(id, {
    include: {
      model: Brand,
      through: { attributes: [] },
    },
  });
  return productDB;
};
/**************************************************************** */
// se usa para busqueda por nombre
const getProductByName = async (name) => {
  const productDB = await Product.findAll({
    where: {
      name: {
        [Op.iLike]: `%${name}%`,
      },
    },
    include: {
      model: Brand,
      through: { attributes: [] },
    },
  });
  if (productDB.length === 0) {
    return [
      { message: "No se encontraron productos que coincidan con la búsqueda." },
    ];
  }

  return productDB;
};

/************************************************************************* */
// se usa para crear el producto
const createProducts = async (productData) => {
  console.log(productData);
  try {
    let { name, image, price, colour } = productData;
    // let { name, image, price, colour, additionalImage } = productData;

    const productCreated = await Product.findOne({
      where: { name: name, price: price, colour: colour },
    });
    if (productCreated) {
      throw new Error("Un producto ya existe con esas caracteristicas");
    }

    // CLOUDINARY
    if (image){
      const cloudinaryUpload = await cloudinary.uploader.upload(`${image}`);
      image = cloudinaryUpload.secure_url;
    }
   

    console.log("controller");
    const newProduct = await Product.create({
      name,
      image,
      price,
      colour,
      //additionalImage,
    });

    return newProduct;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

/**************************************************************************** */

// para borrar un producto con un id especifico
const deleteProductById = async (id) => {
  try {
    const productToDelete = await Product.findByPk(id);

    if (!productToDelete) {
      throw new Error(`Producto con ID ${id} no encontrado.`);
    }

    await productToDelete.destroy();

    return `Producto con ID ${id} eliminado exitosamente.`;
  } catch (error) {
    throw error;
  }
};

/**************************************************************************** */
// restaurar del borrado lógico
const restoreProductById = async (id) => {
  try {
    const restoredProduct = await Product.restore({ where: { id } });
    return restoredProduct;
  } catch (error) {
    throw error;
  }
};

/******************************************************************************* */
// Para editar o actualizar un producto con un id especifico
const updateProductById = async (id, newData) => {
  try {
    const { name, image, price, colour } = newData;
    // const { name, image, price, colour, additionalImage } = newData;
    const productToUpdate = await Product.findByPk(id);

    if (!productToUpdate) {
      throw new Error(`Producto con ID ${id} no encontrado.`);
    }

    // CLOUDINARY
    // const cloudinaryUpload = await cloudinary.uploader.upload(`${image}`);
    // const img = cloudinaryUpload.secure_url;

    // Actualiza los campos del producto con los nuevos datos

    await productToUpdate.update({
      id,
      name,
      image,
      price,
      colour,
      //additionalImage,
    });

    return productToUpdate;
  } catch (error) {
    throw error;
  }
};
/*************************************************************************************** */

const getProductswithFilter = async (req, res, next) => {
  
  // Obtén los parámetros de consulta de la URL
  const { name, brand, colour, price } = req.query;

  console.log(req.query);
  // Crea un objeto de condiciones vacío
  const whereConditions = {};

  // Agrega condiciones al objeto según los parámetros de consulta
  if (name) {
    whereConditions.name = {
      [Op.iLike]: `%${name}%`,
    };
  }


  if (colour) {
    whereConditions.colour = {
      [Op.iLike]: `%${colour}%`,
    };
  }

  try {
    const order = [];
    if (price === "highest") {
      order.push(["price", "DESC"]);
    } else if (price === "lowest") {
      order.push(["price", "ASC"]);
    }
    
    let products = await Product.findAll({
      where: whereConditions, // Aplica las condiciones de filtro
      order: order, // Aplica el ordenamiento por precio
      include: {
        model: Brand,
        through: { attributes: [] },
        }
    });

    
    if (brand) {
        products = products.filter((prod) => prod.brands[0].name === brand );
    }


    if (products.length === 0) products = [{message: "No se encontraron productos que coincidan con la búsqueda."}]

    
    res.paginatedResults = products;
    next();

  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};


module.exports = {
  getProductswithFilter,
  getAllProducts,
  getProductsById,
  getProductByName,
  getProductswithFilter,
  createProducts,
  deleteProductById,
  updateProductById,
  restoreProductById,
};
