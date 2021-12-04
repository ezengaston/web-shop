import React, { useState, useEffect } from "react";
import { commerce } from "./lib/commerce";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Products, Navbar, Cart, Checkout } from "./components";

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});
  const [order, setOrder] = useState({});
  const [errorMessage, setErrorMessage] = useState("");

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

  async function handleUpdateCartQty(productId, quantity) {
    const item = await commerce.cart.update(productId, { quantity });

    setCart(item.cart);
  }

  async function handleRemoveFromCart(productId) {
    const item = await commerce.cart.remove(productId);

    setCart(item.cart);
  }

  async function handleEmptyCart() {
    const item = await commerce.cart.empty();

    setCart(item.cart);
  }

  async function handleCaptureCheckout(checkoutTokenId, newOrder) {
    try {
      const incomingOrder = await commerce.checkout.capture(
        checkoutTokenId,
        newOrder
      );

      setOrder(incomingOrder);
      refreshCart();
    } catch (error) {
      setErrorMessage(error.data.error.message);
    }
  }

  async function refreshCart() {
    const newCart = await commerce.cart.refresh();

    setCart(newCart);
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
          <Route
            path="/cart"
            exact
            element={
              <Cart
                cart={cart}
                handleUpdateCartQty={handleUpdateCartQty}
                handleRemoveFromCart={handleRemoveFromCart}
                handleEmptyCart={handleEmptyCart}
              />
            }
          ></Route>
          <Route
            path="/checkout"
            exact
            element={
              <Checkout
                cart={cart}
                order={order}
                handleCaptureCheckout={handleCaptureCheckout}
                errorMessage={errorMessage}
              />
            }
          ></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
