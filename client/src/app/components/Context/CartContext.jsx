'use client'

import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import Swal from 'sweetalert2'

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const productosEnLocalStorage = localStorage.getItem("cartProducts");
      return productosEnLocalStorage ? JSON.parse(productosEnLocalStorage) : [];
    } catch (error) {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("cartProducts", JSON.stringify(cartItems));
    console.log(cartItems);
  }, [cartItems]);

  const addItemToCart = async (product) => {
    const inCart = cartItems.find(
      (productInCart) => productInCart.id === product.id
    );

    if (inCart && inCart.amount < product.amount) {
      setCartItems(
        cartItems.map((productInCart) =>
          productInCart.id === product.id
            ? { ...inCart, amount: inCart.amount + 1 }
            : productInCart
        )
      );
    } else if (!inCart && product.amount > 0) {
      setCartItems([...cartItems, { ...product, amount: 1 }]);
    }
  };
  

  const deleteItemToCart = (product) => {
    const inCart = cartItems.find(
      (productInCart) => productInCart.id === product.id
    );

    if (inCart.amount === 1) {
      setCartItems(
        cartItems.filter((productInCart) => productInCart.id !== product.id)
      );
    } else {
      setCartItems(
        cartItems.map((productInCart) =>
          productInCart.id === product.id
            ? { ...inCart, amount: inCart.amount - 1 }
            : productInCart
        )
      );
    }
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const buyCart = async () => {
    // Verificar si hay productos en el carrito
    if (cartItems.length > 0) {
      Swal.fire({
        title: "Deseas confirmar la compra?",
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: "Confirmar",
        denyButtonText: `Cancelar`
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            const response = await axios.post('http://localhost:3001/productos/comprar', { productos: cartItems });
      
            console.log(response.data);
      
            const total = cartItems.reduce(
              (previus, current) => previus + current.amount * current.precio,
              0
            );
      
            Swal.fire(`El total de la compra fue de $${total}!`, "", "success");
      
            clearCart();
          } catch (error) {
            console.error('Error al procesar la compra:', error);
            Swal.fire("Error", "Hubo un problema al procesar la compra", "error");
          }
        } else if (result.isDenied) {
          Swal.fire("Compra cancelada", "", "info");
        }
      });
    } else {
      Swal.fire("Carrito vacío", "Agrega productos al carrito antes de confirmar la compra", "warning");
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartItems: cartItems,
        addItemToCart,
        deleteItemToCart,
        clearCart,
        buyCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
