import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa"; // Icons for hamburger menu

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false); // State to toggle mobile menu

  return (
    <nav className="bg-green-600 text-white px-6 md:px-10 py-4">
      <div className="flex justify-between items-center">
        {/* Left Side: Contact Info (Always Visible) */}
        <div className="flex gap-4 md:gap-8 text-lg lg:text-2xl font-ledger">
          <a href="tel:+7871937373" className="text-white">📞</a>
          <a href="mailto:mathavra.22cse@kongu.edu" className="text-white">📧</a>
        </div>

        {/* Right Side: Hamburger Menu (Mobile) */}
        <div className="md:hidden">
          <button className="text-2xl" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Right Side: Navigation Links (Desktop) */}
        <div className="hidden md:flex gap-10 text-lg lg:text-2xl font-ledger">
          <a href="/" className="hover:underline">Home</a>
          <a href="/product" className="hover:underline">Products</a>
          <a href="#" className="hover:underline">Service Booking</a>
          <a href="#" className="hover:underline">Contact</a>
          <a href="#" className="hover:underline">About Us</a>
        </div>
      </div>

      {/* Mobile Navigation Dropdown (Without Phone & Email) */}
      {isOpen && (
        <div className="md:hidden mt-4 flex flex-col gap-4 text-center text-lg">
          <a href="/" className="hover:underline">Home</a>
          <a href="/product" className="hover:underline">Products</a>
          <a href="#" className="hover:underline">Service Booking</a>
          <a href="#" className="hover:underline">Contact</a>
          <a href="#" className="hover:underline">About Us</a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
