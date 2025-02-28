import React from "react";

const Header = () => {
  return (
    <header className="bg-white border-b p-4 flex items-center justify-center">
      <h1 className="font-bold flex items-center gap-2">
        <img src="/logo.png" alt="Logo" className="h-8" />
      </h1>
      <h1 className="text-5xl font-bold text-green-700 font-agri">
  AGRI Machinery INC
</h1>

    </header>
  );
};

export default Header;