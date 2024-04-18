import React from "react";
import Products from "../Products";
import Cart from "../Cart";
import Add from "../Add";
import Stock from "../Stock";

const Home = () => {
  return (
    <div className="max-h-screen flex items-center flex-col">
      <Stock />
      <Add />
      <Cart />
      <Products />
    </div>
  );
};

export default Home;
