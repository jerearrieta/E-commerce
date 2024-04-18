'use client'

import React, { useState } from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import axios from 'axios';

const Add = () => {
  const [addOpen, setAddOpen] = useState(false);
  const [productData, setProductData] = useState({
    nombre: "",
    precio: "",
    amount: "",
    imagen: "",
  });

  // Manejar cambios en los campos del producto
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData({
      ...productData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Datos del producto:", productData);

    try {
      const response = await axios.post('http://localhost:3001/productos', productData)
      console.log("Respuesta del servidor:", response.data);

      setProductData({
        nombre: "",
        precio: "",
        amount: "",
        imagen: "",
      });

      setAddOpen(false)

    } catch (error) {
      console.error('Error al enviar la solicitud', error)
    }
  };

  return (
    <div>
      <div
        onClick={() => {
          setAddOpen(!addOpen);
        }}
        className="cursor-pointer"
        style={{ position: "absolute", top: "2%", left: "5%" }}
      >
        <div className="fixed">
          {!addOpen ? (
            <AddCircleIcon sx={{ fontSize: 60 }} />
          ) : (
            <CancelIcon sx={{ fontSize: 60 }} />
          )}
        </div>
      </div>

      {addOpen && (
        <div
          className="rounded-3xl w-96 bg-black text-white fixed"
          style={{ position: "fixed", top: "8%", left: "5%" }}
        >
          <h2 className="mx-2 font-bold mt-5 mb-3">Agregar un producto</h2>
          <div className="ml-2 mb-5">
            <form onSubmit={handleSubmit}>
              <div className="flex justify-between">
                <label htmlFor="nombre">Nombre:</label>{" "}
                <input
                  className="text-black rounded mb-2 mr-28"
                  type="text"
                  name="nombre"
                  value={productData.nombre}
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex justify-between">
                <label htmlFor="precio">Precio:</label>{" "}
                <input
                  className="text-black rounded mb-2 mr-28"
                  type="number"
                  name="precio"
                  value={productData.precio}
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex justify-between">
                <label htmlFor="amount">Cantidad:</label>{" "}
                <input
                  className="text-black rounded mb-2 mr-28"
                  type="number"
                  name="amount"
                  value={productData.amount}
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex justify-between">
                <label htmlFor="imagen">Imagen:</label>{" "}
                <input
                  className="text-black rounded mr-28"
                  placeholder="Ingrese URL"
                  type="url"
                  accept="url"
                  name="imagen"
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex justify-end mr-2">
                <button 
                  className="bg-white rounded text-black font-bold p-1"
                  type="submit"
                >
                  Agregar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Add;