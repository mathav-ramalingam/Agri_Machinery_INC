import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import axios from "axios"; // If using Axios for API calls

const Product = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [target, settarget] = useState([]);

  const dataelement = { name: "chopper", year: 2025 };

  useEffect(() => {
    // Fetch products from backend (replace with actual API endpoint)
    axios
      .get("http://localhost:3000/agri/products")
      .then((response) => {
        setProducts(response.data); // Assuming response.data is an array of products
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  const detailsfun = async (pid) => {
    console.log(pid);
    try {
      navigate("/productsdetails", { state: pid });
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {products.map((product) => (
        <div
          key={product._id}
          className="bg-white rounded-lg shadow-lg overflow-hidden"
        >
          <img
            src={`http://localhost:3000/uploads/${product.Product_image[0]}`}
            alt={product.Product_Name}
            className="w-full h-64 object-cover"
          />
          <div className="p-4">
            <h2 className="text-xl font-semibold mb-2">
              {product.Product_Category}
            </h2>
            <p className="text-gray-600 mb-4">{product.Product_Description}</p>
            <button
              onClick={() => detailsfun(product)}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg inline-block hover:bg-blue-600"
            >
              View More
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Product;
