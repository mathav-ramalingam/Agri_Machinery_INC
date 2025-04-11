import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { IoMdLogOut } from 'react-icons/io';
import { FiMenu, FiX } from 'react-icons/fi';

export default function AdminNavbar() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const logout = async () => {
    try {
      await axios.post('http://localhost:5000/agri/logout');
      toast.success("Logged out successfully ✌️");
      navigate('/');
    } catch (err) {
      toast.error("Logout failed 💔");
    }
  };

  const navLinks = [
    { name: "Products", path: "/admin/products" },
    { name: "Orders", path: "/admin/orders" },
    { name: "Requests", path: "/admin/requests" },
  ];

  return (
    <>
      <ToastContainer position="top-right" autoClose={2000} />
      <nav className="bg-gradient-to-r from-gray-900 to-gray-700 text-white shadow-md px-6 py-4 flex items-center justify-between relative">
        <div className="text-2xl font-bold tracking-wide cursor-pointer" onClick={() => navigate("/admin")}>
          🌾 Admin Panel
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => navigate(link.path)}
              className="hover:text-yellow-300 transition"
            >
              {link.name}
            </button>
          ))}
          <button
            onClick={logout}
            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-xl transition duration-200 shadow"
          >
            <IoMdLogOut className="w-5 h-5" />
            <span className="font-medium">Logout</span>
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)} className="focus:outline-none">
            {menuOpen ? <FiX size={26} /> : <FiMenu size={26} />}
          </button>
        </div>

        {/* Mobile Dropdown */}
        {menuOpen && (
          <div className="absolute top-16 left-0 w-full bg-gray-800 flex flex-col items-start p-4 gap-3 z-50 md:hidden">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => {
                  navigate(link.path);
                  setMenuOpen(false);
                }}
                className="text-white hover:text-yellow-300 text-left w-full"
              >
                {link.name}
              </button>
            ))}
            <button
              onClick={logout}
              className="flex items-center gap-2 text-red-400 hover:text-red-500"
            >
              <IoMdLogOut className="w-5 h-5" />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        )}
      </nav>
    </>
  );
}
