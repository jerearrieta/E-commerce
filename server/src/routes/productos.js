const express = require("express");
const router = express.Router();
const productosController = require("../controllers/productos");

// Ruta para obtener productos
router.get("/", productosController.obtenerProducto);

// Ruta para agregar productos
router.post("/", productosController.agregarProducto);

// Ruta para modificar productos
router.put("/", productosController.actualizarProducto);

// Ruta para modificar productos por ID
router.put("/:id", productosController.actualizarProducto);

// Ruta para comprar productos
router.post('/comprar', productosController.comprarProductos)


module.exports = router;
