import React from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import HomePage from "./HomePage";
import Product from "./components/Product";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import ProductDetail from "./components/ProductDetails";
import ContactUs from "./components/ContactUs";
import Footer from "./components/Footer";
import { ServiceBooking } from "./components/ServiceBooking";
import Login from "./components/Admin/Login";
import AdminDashboard from "./components/Admin/AdminDashboard";
import ProtectedRoute from './components/ProtectedRoute';
import ProductList from "./components/Admin/ProductList";
import AddProduct from "./components/Admin/AddProduct";
import { ViewOrders } from "./components/Admin/ViewOrders";
import { ViewRequests } from "./components/Admin/ViewRequests"
import { AboutUs } from "./components/AboutUs";

function Layout() {
  const location = useLocation();

  // Hide header/navbar/footer on these paths
  const hideLayout = location.pathname === '/login' || location.pathname === '/admin' || location.pathname === '/admin/products/add' || location.pathname === '/admin/products' || location.pathname === '/admin/orders' || location.pathname === '/admin/requests';

  return (
    <>
      {!hideLayout && <Header />}
      {!hideLayout && <Navbar />}
      
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<Product />} />
        <Route path="/productsdetails" element={<ProductDetail />} />
        <Route path="/servicebooking" element={<ServiceBooking />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/aboutus" element={<AboutUs />} />

        
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
        <Route path="/admin/products/add" element={<ProtectedRoute><AddProduct /></ProtectedRoute>} />
        <Route path="/admin/products" element={<ProtectedRoute><ProductList /></ProtectedRoute>} />
        <Route path="/admin/orders" element={<ProtectedRoute><ViewOrders /></ProtectedRoute>} />
        <Route path="/admin/requests" element={<ProtectedRoute><ViewRequests /></ProtectedRoute>} />
      </Routes>

      {!hideLayout && <Footer />}
    </>
  ); 
}

function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}

export default App;
