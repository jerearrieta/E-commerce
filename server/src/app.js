const express = require("express");
const cors = require("cors");
const app = express();
const port = 3001;
const productosRoutes = require("./routes/productos");

// Middleware para el manejo de solicitudes JSON
app.use(express.json());

app.use(cors());

// Rutas
app.use("/productos", productosRoutes);

// Inicia el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
