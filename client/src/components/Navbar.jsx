import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-green-600 text-white flex justify-between items-center px-12 h-24 text-lg">
      {/* Left Side: Contact Info */}
      <div className="flex gap-10 text-2xl font-ledger ">
        <span>📞 Phone</span>
        <span>📧 Email</span>
      </div>

      {/* Right Side: Navigation Links */}
      <div className="flex gap-20 text-2xl font-ledger">
        <a href="#" className="hover:underline">Home</a>
        <a href="#" className="hover:underline">Our Products</a>
        <a href="#" className="hover:underline">Contact</a>
        <a href="#" className="hover:underline">About Us</a>
      </div>
    </nav>
  );
};

export default Navbar;
