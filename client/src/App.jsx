import React from "react";
import HomePage from "./HomePage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Product from "./components/Product";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import ProductDetail from "./components/ProductDetails";
import ContactUs from "./components/ContactUs";
import { ServiceBooking } from "./components/ServiceBooking";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<Product />} />
          <Route path="/productsdetails" element={<ProductDetail />} />
          <Route path="/servicebooking" element={<ServiceBooking />} />
          <Route path="/contact" element={<ContactUs />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
