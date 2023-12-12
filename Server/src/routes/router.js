// router.js
const express = require('express');
const router = express.Router();
const {getAllProductsHandler, getIdHandler, getProductsByName, getProductFilterHandler, createProductsHandler,
  deleteProductsHandler,updateProductsHandler, restoreProductHandler} = require("../handlers/productHandler")
const { getBrandHandler } = require("../handlers/brandHandler")
const {getUserHandler, putUserHandler, createUserHandler, getAllUsersHandler} = require("../handlers/userHandler");
const { createOrder, successfulPurchase  } = require('../mercadoPago/mercadoPagoPurchase');
const {login} = require('../handlers/userHandler');
const { createRelationHandler, updateRelationHandler, deleteRelationHandler, getAllProductsUserHandler } = require('../handlers/productUserHandler');
const {createPurchaseHandler, purchaseByUserHandler} = require('../handlers/purchaseHandler')
// Ruta de ejemplo
router.get('/', (req, res) => {
  res.send('¡Hola, desde el enrutador!');
});

// Otras rutas pueden agregarse aquí
// Rutas para la tabla product *****************************/
router.get("/product/all-products", getAllProductsHandler);
router.get("/product/:id", getIdHandler);
router.get("/product/name/:name",getProductsByName);
router.get("/product/", getProductFilterHandler )
router.post("/product/",createProductsHandler);
router.put('/product/restore/:id', restoreProductHandler); // esto es para el borrado logico
router.put("/product/delete/:id", deleteProductsHandler);
router.put("/product/put/:id", updateProductsHandler);
router.get("/brands", getBrandHandler)
router.get("/user/login", login)
router.get("/user/all",getAllUsersHandler)
router.get("/user/:email", getUserHandler)
router.put("/user/:email", putUserHandler)
router.post("/user", createUserHandler)
router.get("/success", successfulPurchase)
router.post("/purchase", createOrder)
router.post("/cart" ,createRelationHandler)
router.get("/cart/:email",getAllProductsUserHandler) 
router.put("/cart",updateRelationHandler) 
router.delete("/cart/:email",deleteRelationHandler)
router.post("/history", createPurchaseHandler)
router.get("/purchase/:email", purchaseByUserHandler)


module.exports = router;

// no deja subir
