import React, { useState, useEffect } from "react";
import { commerce } from "./lib/commerce";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Products, Navbar, Cart, Checkout, Loader } from "./components";

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});
  const [order, setOrder] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(async () => {
    await fetchProducts();
    await fetchCart();

    setIsLoading(false);
  }, []);

  async function fetchProducts() {
    const { data } = await commerce.products.list();

    setProducts(data);
  }

  async function fetchCart() {
    setCart(await commerce.cart.retrieve());
  }

  async function handleAddToCart(productId, quantity) {
    setIsLoading(true);

    const item = await commerce.cart.add(productId, quantity);

    setCart(item.cart);
    setIsLoading(false);
  }

  async function handleUpdateCartQty(productId, quantity) {
    setIsLoading(true);

    const item = await commerce.cart.update(productId, { quantity });

    setCart(item.cart);
    setIsLoading(false);
  }

  async function handleRemoveFromCart(productId) {
    setIsLoading(true);

    const item = await commerce.cart.remove(productId);

    setCart(item.cart);
    setIsLoading(false);
  }

  async function handleEmptyCart() {
    setIsLoading(true);

    const item = await commerce.cart.empty();

    setCart(item.cart);
    setIsLoading(false);
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
        <Loader isLoading={isLoading} />
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
                activateLoading={() => setIsLoading(true)}
                disableLoading={() => setIsLoading(false)}
              />
            }
          ></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
