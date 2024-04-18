"use client";

import React, { useContext, useState, useEffect } from "react";
import { CartContext } from "../Context/CartContext";
import { ItemCart } from "../ItemCart";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CancelIcon from "@mui/icons-material/Cancel";
import styles from "./cart.module.css";

const Cart = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const [productsLength, setProductsLength] = useState(0);

  const { cartItems, clearCart, buyCart } = useContext(CartContext);

  useEffect(() => {
    setProductsLength(
      cartItems.reduce((previus, current) => previus + current.amount, 0)
    );
  }, [cartItems]);

  const total = cartItems.reduce(
    (previus, current) => previus + current.amount * current.precio,
    0
  );

  return (
    <div>
      <div
        onClick={() => {
          setCartOpen(!cartOpen);
        }}
        className="cursor-pointer fixed"
        style={{ position: "fixed", top: "2%", right: "5%" }}
      >
        <div className="">
          {!cartOpen ? (
            <ShoppingCartIcon sx={{ fontSize: 60 }} />
          ) : (
            <CancelIcon sx={{ fontSize: 60 }} />
          )}
        </div>
        {!cartOpen && (
          <div className="h-5 w-5 rounded-full top-0 right-0 bg-red-500 text-xs font-bold text-white flex items-center justify-center">
            {productsLength}
          </div>
        )}
      </div>

      {cartItems && cartOpen && (
        <div
          className={styles.cart}
          style={{
            position: "fixed",
            top: "8%",
            right: "5%",
            maxHeight: "60vh",
            overflowY: "auto",
          }}
        >
          <div className="flex justify-between">
            <h2 className="mx-2 font-bold mt-5">Tu carrito</h2>
            <p
              onClick={clearCart}
              className="mx-2 font-bold mt-5 cursor-pointer"
            >
              Limpiar
            </p>
          </div>

          {cartItems.length === 0 ? (
            <p className="text-center mt-1 text-xs">Tu carrito esta vacio</p>
          ) : (
            <div>
              {cartItems.map((item, i) => (
                <ItemCart key={i} item={item} />
              ))}
            </div>
          )}

          <div className="flex justify-between">
            <h2 className="text-center font-bold mt-4 pb-9 pl-2">Total: ${total}</h2>
            <p onClick={buyCart} className="text-center font-bold mt-4 pb-9 pr-2 cursor-pointer">Comprar</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
