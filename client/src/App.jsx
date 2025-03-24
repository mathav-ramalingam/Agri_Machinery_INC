import React from "react";
import HomePage from "./HomePage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Product from "./components/Product";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import ProductDetail from "./components/ProductDetails";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/product" element={<Product />} />
          <Route path="/productsdetails" element={<ProductDetail />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
