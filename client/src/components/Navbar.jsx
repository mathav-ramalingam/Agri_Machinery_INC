// import React, { useState } from "react";
// import { FaBars, FaTimes } from "react-icons/fa"; // Icons for hamburger menu

// const Navbar = () => {
//   const [isOpen, setIsOpen] = useState(false); // State to toggle mobile menu

//   return (
//     <nav className="bg-green-600 text-white px-6 md:px-10 py-4">
//       <div className="flex justify-between items-center">
//         {/* Left Side: Contact Info (Always Visible) */}
//         <div className="flex gap-4 md:gap-8 text-lg lg:text-2xl font-ledger">
//           <a href="tel:+7871937373" className="text-white">📞</a>
//           <a href="mailto:mathavra.22cse@kongu.edu" className="text-white">📧</a>
//         </div>

//         {/* Right Side: Hamburger Menu (Mobile) */}
//         <div className="md:hidden">
//           <button className="text-2xl" onClick={() => setIsOpen(!isOpen)}>
//             {isOpen ? <FaTimes /> : <FaBars />}
//           </button>
//         </div>

//         {/* Right Side: Navigation Links (Desktop) */}
//         <div className="hidden md:flex gap-10 text-lg lg:text-2xl font-ledger">
//           <a href="/" className="hover:underline">Home</a>
//           <a href="/product" className="hover:underline">Products</a>
//           <a href="/servicebooking" className="hover:underline">Service Booking</a>
//           <a href="#" className="hover:underline">Contact</a>
//           <a href="#" className="hover:underline">About Us</a>
//         </div>
//       </div>

//       {/* Mobile Navigation Dropdown (Without Phone & Email) */}
//       {isOpen && (
//         <div className="md:hidden mt-4 flex flex-col gap-4 text-center text-lg">
//           <a href="/" className="hover:underline">Home</a>
//           <a href="/product" className="hover:underline">Products</a>
//           <a href="/servicebooking" className="hover:underline">Service Booking</a>
//           <a href="#" className="hover:underline">Contact</a>
//           <a href="#" className="hover:underline">About Us</a>
//         </div>
//       )}
//     </nav>
//   );
// };

// export default Navbar;



import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-green-600 to-green-800 text-white px-6 md:px-10 py-4 shadow-xl sticky top-0 z-50 transition-all duration-300">
      <div className="flex justify-between items-center">
        {/* Contact Icons Left */}
        <div className="flex gap-4 md:gap-8 text-xl font-semibold animate-pulse">
          <a
            href="tel:+7871937373"
            className="hover:scale-110 transition-transform duration-200"
            title="Call Us"
          >
            📞
          </a>
          <a
            href="mailto:mathavra.22cse@kongu.edu"
            className="hover:scale-110 transition-transform duration-200"
            title="Email Us"
          >
            📧
          </a>
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden">
          <button
            className="text-3xl hover:scale-110 transition-transform duration-200"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-10 text-lg font-medium tracking-wide">
          {["Home", "Products", "Service Booking", "Contact", "About Us"].map(
            (item, index) => (
              <a
                key={index}
                href={
                  item === "Home"
                    ? "/"
                    : "/" + item.toLowerCase().replace(/\s+/g, "")
                }
                className="relative group"
              >
                <span className="text-white group-hover:text-green-300 transition duration-300">
                  {item}
                </span>
                <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-green-300 group-hover:w-full transition-all duration-300"></span>
              </a>
            )
          )}
        </div>
      </div>

      {/* Mobile Nav Menu */}
      {isOpen && (
        <div className="md:hidden mt-4 flex flex-col gap-4 text-center text-lg animate-fade-in-down">
          {["Home", "Products", "Service Booking", "Contact", "About Us"].map(
            (item, index) => (
              <a
                key={index}
                href={
                  item === "Home"
                    ? "/"
                    : "/" + item.toLowerCase().replace(/\s+/g, "")
                }
                className="hover:text-green-300 transition-colors duration-300"
              >
                {item}
              </a>
            )
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
