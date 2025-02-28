import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-green-600 text-white flex justify-between items-center px-10 py-4 text-lg ">
      {/* Left Side: Contact Info */}
      <div className="flex gap-10 text-2xl font-ledger ">
        <span>📞 Phone</span>
        <span>📧 Email</span>
      </div>

      {/* Right Side: Navigation Links */}
      <div className="flex gap-16 text-2xl font-ledger">
        <a href="#" className="hover:underline">Home</a>
        <a href="#" className="hover:underline">Products</a>
        <a href="#" className="hover:underline">Service Booking</a>
        <a href="#" className="hover:underline">Contact</a>
        <a href="#" className="hover:underline">About Us</a>
      </div>
    </nav>
  );
};

export default Navbar;
