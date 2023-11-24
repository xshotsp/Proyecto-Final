const { Product } = require("../db");
const cloudinary = require('cloudinary').v2;

//*********************************************************** */
// trae todos los productos de la base de datos
const getAllProducts = async () => {
  
  const productsDB = await Product.findAll();
  return productsDB;
};
//*********************************************************** */


// trae el procucto del id correspondiente...se usa para el detalle
const getProductsById = async (id) => {
  const productDB = await Product.findByPk(id);
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
  console.log (productData)
  try {
    let {
      name,
      image,
      price,
      colour,
      additionalImage,
    } = productData;

    const productCreated = await Product.findOne ({where: {name:name, price: price, colour:colour}})
    if(productCreated) {
      throw new Error ('Un producto ya existe con esas caracteristicas')
    }
    
     // CLOUDINARY
    console.log (image)
    const cloudinaryUpload = await cloudinary.uploader.upload(`${image}`);
    image = cloudinaryUpload.secure_url;
      
    console.log ('controller')
    const newProduct = await Product.create({
        name,
        image,
        price,
        colour,
        additionalImage,
    });
    
    return newProduct;
  } catch (error) {
    console.log(error)
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
    const {
        name,
        image,
        price,
        colour,
        additionalImage,
    } = newData;
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
      additionalImage,
    });

    return productToUpdate;
  } catch (error) {
    throw error;
  }
};
/*************************************************************************************** */
module.exports = {
  getAllProducts,
  getProductsById,
  getProductByName,
  createProducts,
  deleteProductById,
  updateProductById,
  restoreProductById
};