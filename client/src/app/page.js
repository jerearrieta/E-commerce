import Image from "next/image";
import Home from "./components/Home";
import { CartProvider } from "./components/Context/CartContext";

export default function App() {
  return (
    <CartProvider>
      <Home />
    </CartProvider>
  );
}
