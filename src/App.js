import React, { useState, useEffect } from "react";
import { commerce } from "./lib/commerce";

import { Products, Navbar, Cart } from "./components";

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});

  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);

  async function fetchProducts() {
    const { data } = await commerce.products.list();

    setProducts(data);
  }

  async function fetchCart() {
    setCart(await commerce.cart.retrieve());
  }

  async function handleAddToCart(productId, quantity) {
    const item = await commerce.cart.add(productId, quantity);

    setCart(item.cart);
  }

  console.log(cart);

  return (
    <div>
      <Navbar totalItems={cart.total_items} />
      {/* <Products products={products} handleAddToCart={handleAddToCart} /> */}
      <Cart cart={cart} />
    </div>
  );
}

export default App;
