const {
    getProductsById,
    getProductByName,
    getAllProducts,
    createProducts,
    deleteProductById,
    restoreProductById,
    updateProductById
  } = require("../controllers/productController");
  
  
  /**************************************************** */
  const getProductsByName = async (req, res) => {
    const name = req.params.name;
    try {
      const response = await getProductByName(name);
      res.status(200).send(response);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

/********************************************************** */

  const getAllProductsHandler = async (req, res) => {
    try {
    
      const results = await getAllProducts(req, res);
      res.status(200).json(results);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  
   
  /********************************************************** */
  const getIdHandler = async (req, res) => {
    const id = req.params.id;
    try {
      const response = await getProductsById(id);
      res.status(200).send(response);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  /************************************************************* */
  const createProductsHandler = async (req, res) => {
    try {
      const product = await createProducts(req.body);
      res.status(201).json(product);
    } catch (error) {
      res.status(400).json(error.message);
    }
  };

  /************************************************************+ */
  const restoreProductHandler = async (req, res) => {
    const id = req.params.id;
    try {
      const product = await restoreProductById(id);
      if (product) {
        res.status(200).json(product);
      } else {
        res.status(404).json({ error: 'El producto no se encontró' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  /****************************************************************** */
  const deleteProductsHandler = async (req, res) => {
   const id = req.params.id;
    try {
      const product = await deleteProductById(id);
      res.status(201).json(product);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  /************************************************************* */
  const updateProductsHandler = async (req, res) => {
    const id = req.params.id;
    try {
      const product = await updateProductById(id, req.body);
      res.status(201).json(product);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  

  module.exports = {
    getAllProductsHandler: getAllProductsHandler,
    getIdHandler: getIdHandler,
    getProductsByName: getProductsByName,
    createProductsHandler: createProductsHandler,
    deleteProductsHandler: deleteProductsHandler,
    updateProductsHandler: updateProductsHandler,
    restoreProductHandler : restoreProductHandler
  };