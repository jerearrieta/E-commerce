const productosService = require("../services/productos");

const obtenerProducto = async (req, res) => {
  try {
    const productos = await productosService.getProducts();
    res.json(productos);
  } catch (error) {
    console.error("Error al obtener productos", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

const agregarProducto = async (req, res) => {
  try {
    const { nombre, amount, precio, imagen } = req.body;

    const nuevoProducto = await productosService.newProduct(
      nombre,
      amount,
      precio,
      imagen
    );

    res.json(nuevoProducto);
  } catch (error) {
    console.error("Error al obtener agregar producto", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

const actualizarProducto = async (req, res) => {
  try {
    const { id, nombre, amount, precio } = req.body;

    const result = await productosService.modifyProduct(id, nombre, amount, precio);

    res.json(result)
  } catch(error) {
    console.error('Error al actualizar el stock indicado', error)
    res.status(500).json({ error: 'Error interno del servidor'})
  }
}

const comprarProductos = async (req, res) => {
  try {
    const { productos } = req.body;

    const result = await productosService.buyProduct(productos);

    res.json(result)
  } catch (error) {
    console.error("Error al procesar la compra", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};


module.exports = {
  obtenerProducto,
  agregarProducto,
  actualizarProducto,
  comprarProductos,
};
