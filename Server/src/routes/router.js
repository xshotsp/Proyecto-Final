// router.js
const express = require('express');
const router = express.Router();
const {getAllProductsHandler, getIdHandler, getProductsByName,createProductsHandler,
  deleteProductsHandler,updateProductsHandler, restoreProductHandler} = require("../handlers/productHandler")
const { getBrandHandler } = require("../handlers/brandHandler")
const {getUserHandler, putUserHandler, createUserHandler} = require("../handlers/userHandler")

// Ruta de ejemplo
router.get('/', (req, res) => {
  res.send('¡Hola, desde el enrutador!');
});

// Otras rutas pueden agregarse aquí
// Rutas para la tabla product *****************************/
router.get("/product/", getAllProductsHandler);
router.get("/product/:id", getIdHandler);
router.get("/product/name/:name",getProductsByName);
router.post("/product/",createProductsHandler);
router.post('/product/restore/:id', restoreProductHandler); // esto es para el borrado logico
router.delete("/product/delete/:id", deleteProductsHandler);
router.put("/product/put/:id", updateProductsHandler);
router.get("/brands", getBrandHandler)
router.get("/user", getUserHandler)
router.put("/user/:id", putUserHandler)
router.post("/user", createUserHandler)

module.exports = router;
