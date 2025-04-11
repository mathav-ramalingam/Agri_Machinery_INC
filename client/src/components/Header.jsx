import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-white border-b p-3 md:p-4 flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4">
      {/* Logo with Link */}
      <div className="flex items-center">
        <Link to="/login">
          <img src="/images/logo.png" alt="Logo" className="h-8 md:h-10 lg:h-12 cursor-pointer" />
        </Link>
      </div>

      {/* Title */}
      <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-green-700 text-center md:text-left">
        AGRI Machinery Mart
      </h1>
    </header>
  );
};

export default Header;
