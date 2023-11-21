// router.js
const express = require('express');
const router = express.Router();

// Ruta de ejemplo
router.get('/', (req, res) => {
  res.send('¡Hola, desde el enrutador!');
});

// Otras rutas pueden agregarse aquí

module.exports = router;
