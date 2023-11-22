// router.js
const express = require('express');
const router = express.Router();
const {getAllProductsHandler, getIdHandler, getProductsByName,createProductsHandler,
  deleteProductsHandler,updateProductsHandler, restoreProductHandler} = require("../handlers/productHandler")

// Ruta de ejemplo
router.get('/', (req, res) => {
  res.send('¡Hola, desde el enrutador!');
});

// Otras rutas pueden agregarse aquí
// Rutas para la tabla product *****************************/
router.get("product/", getAllProductsHandler);
router.get("product/:id", getIdHandler);
router.get("product/name/:name",getProductsByName);
router.post("product/",createProductsHandler);
router.post('/product/restore/:id', restoreProductHandler); // esto es para el borrado logico
router.delete("product/delete/:id", deleteProductsHandler);
router.put("product/put/:id", updateProductsHandler);

module.exports = router;
