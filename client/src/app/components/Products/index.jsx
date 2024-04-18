"use client";

import React, { useContext, useState, useEffect } from "react";
import { CartContext } from "../Context/CartContext";
import axios from "axios";

const Products = () => {
  const { addItemToCart } = useContext(CartContext);

  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const getProductos = async () => {
      try {
        const response = await axios.get("http://localhost:3001/productos");
        response.data.sort((a, b) => a.id - b.id);
        setProductos(response.data);
      } catch (error) {
        console.error("Error al obtener los productos:", error);
      }
    };

    getProductos();
  },[]);

  return (
    <div className="grid grid-cols-3 gap-24 gap-y-16 h-2">
      {productos.map((producto) => (
        <div key={producto.id} className="flex flex-col items-center">
          <img className="w-80" src={producto.imagen} alt={producto.nombre} />
          <div className="">
            <p className="font-bold text-xl mx-auto mt-1">
              {producto.nombre} - ${producto.precio}
            </p>
            <div className="flex flex-col items-center">
              <p>
                Cantidad: <strong>{producto.amount}</strong>
              </p>
              {producto.amount == 0 ? (
                <p className="mt-7 mb-2 rounded-xl p-1 cursor-pointer bg-black text-white hover:bg-zinc-700">
                  Sin stock
                </p>
              ) : producto.amount == 1 ? (
                <p className="font-bold text-red-500">¡Ultimo producto!</p>
              ) : producto.amount < 3 ? (
                <p className="font-bold text-red-500">¡Pocas unidades!</p>
              ) : (
                <p className="text-white">.</p>
              )}
            </div>
          </div>
          {producto.amount != 0 ? (
            <button
              onClick={() => addItemToCart(producto)}
              className="mt-1 mb-2 rounded-xl p-1 cursor-pointer bg-black text-white hover:bg-zinc-700"
            >
              Agregar al carrito
            </button>
          ) : null}
        </div>
      ))}
    </div>
  );
};

export default Products;