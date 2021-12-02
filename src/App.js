import React, { useState, useEffect } from "react";
import { commerce } from "./lib/commerce";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

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

  return (
    <Router>
      <div>
        <Navbar totalItems={cart.total_items} />
        <Routes>
          <Route
            path="/"
            exact
            element={
              <Products products={products} handleAddToCart={handleAddToCart} />
            }
          ></Route>
          <Route path="/cart" exact element={<Cart cart={cart} />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
