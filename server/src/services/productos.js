const pool = require("../config/db");

const getProducts = async () => {
  try {
    const result = await pool.query("SELECT * FROM productos");
    return result.rows;
  } catch (error) {
    console.error("Error al obtener los productos", error);
    throw error;
  }
};

const newProduct = async (nombre, amount, precio, imagen) => {
  try {
    const result = await pool.query(
      "INSERT INTO productos (nombre, amount, precio, imagen) VALUES ($1, $2, $3, $4) RETURNING *",
      [nombre, amount, precio, imagen]
    );
    return result.rows[0];
  } catch (error) {
    console.error("Error al crear un producto", error);
    throw error;
  }
};

const modifyProduct = async (id, nombre, amount, precio) => {
  try {
    const result = await pool.query(
      "UPDATE productos SET nombre = $1, amount = $2, precio = $3 WHERE id = $4" ,
      [nombre, amount, precio, id]
    );

    if(result.rowCount === 1) {
      return { mensaje: 'Stock actualizado correctamente' };
    } else {
      throw new Error('No se pudo encontrar el producto con el ID proporcionado');
    }
  } catch (error) {
    console.log('Error al actualizar el stock', error);
    throw error;
  }
}

const buyProduct = async (products) => {
  try {
    for (const product of products) {
      const { id, amount } = product;
      await pool.query(
        'UPDATE productos SET amount = amount - $1 WHERE id = $2',
        [amount, id]
      );
    }
    console.log('Compra procesada con éxito. Stock actualizado.');
  } catch (error) {
    console.error('Error al procesar la compra:', error);
    throw error;
  }
};


module.exports = {
  getProducts,
  newProduct,
  modifyProduct,
  buyProduct,
};
