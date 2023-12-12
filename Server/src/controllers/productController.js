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
      { message: "No products found matching your search." },
    ];
  }

  return productDB;
};

/************************************************************************* */
// se usa para crear el producto
const createProducts = async (productData) => {
  
  try {
    let { name, image, price, colour, additionalImage, brands } = productData;
    //let { name, image, price, colour } = productData;

    const productCreated = await Product.findOne({
      where: { name: name },
    });
    if (productCreated) {
      throw new Error("A product already exists with that name");
    }

    // CLOUDINARY
    if (image){
      const cloudinaryUpload = await cloudinary.uploader.upload(`${image}`);
      image = cloudinaryUpload.secure_url;
    }

    if (additionalImage.length !==0){
      for (let i=0; i<additionalImage.length; i++) {
        const cloudinaryUpload = await cloudinary.uploader.upload(`${additionalImage[i]}`);
        additionalImage[i] = cloudinaryUpload.secure_url;
      }
    }
   
    console.log(additionalImage);
    console.log("controller");
    const newProduct = await Product.create({
      name,
      image,
      price,
      colour,
      additionalImage,
    });

    //crea la asociacion entre producto y marca
    await newProduct.setBrands(brands);

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
      throw new Error(`Product with ID ${id} not found.`);
    }

    await productToDelete.destroy();

    return `Product with ID ${id} successfully removed.`;
  } catch (error) {
    throw error;
  }
};

/**************************************************************************** */
// restaurar del borrado lógico
const restoreProductById = async (id, newData ) => {
  try {
    const restoredProduct = await Product.findByPk(id);

    await restoredProduct.update(newData);
    
    return restoredProduct;
  } catch (error) {
    throw error;
  }
};

/******************************************************************************* */
// Para editar o actualizar un producto con un id especifico
const updateProductById = async (id, newData) => {
  try {
    // const { name, image, price, colour, additionalImage } = newData;
    const { name, image, price, colour } = newData;
    const productToUpdate = await Product.findByPk(id);

    if (!productToUpdate) {
      throw new Error(`Product with ID ${id} not found.`);
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

  //Selecciona aquellos activos

  // whereConditions.active = true;
  
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
    if (price === "Highest") {
      order.push(["price", "DESC"]);
    } else if (price === "Lowest") {
      order.push(["price", "ASC"]);
    }
    
    console.log(whereConditions)
    let products = await Product.findAll({
      where: whereConditions, // Aplica las condiciones de filtro
      order: order, // Aplica el ordenamiento por precio
      include: {
        model: Brand,
        through: { attributes: [] },
        }
    });

    //console.log (products)
    
    if (brand) {
        products = products?.filter((prod) => prod.brands[0].name === brand );
    }


    if (products.length === 0) products = [{message: "No products found matching your search."}]

    
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