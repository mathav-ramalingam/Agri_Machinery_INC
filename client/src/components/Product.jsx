import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FiSearch } from "react-icons/fi";

const Product = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch product data
  useEffect(() => {
    axios
      .get("http://localhost:5000/agri/products")
      .then((response) => {
        setProducts(response.data);
        setFilteredProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  // Filter logic
  useEffect(() => {
    const filtered = products.filter((product) => {
      const matchesCategory =
        selectedCategory === "" ||
        product.Product_Category === selectedCategory;

      const matchesBrand =
        selectedBrand === "" || product.Brand_Name === selectedBrand;

      const matchesSearch =
        product.Product_Description.toLowerCase().includes(
          searchQuery.toLowerCase()
        ) ||
        product.Product_Category.toLowerCase().includes(
          searchQuery.toLowerCase()
        );

      return matchesCategory && matchesBrand && matchesSearch;
    });

    setFilteredProducts(filtered);
  }, [products, selectedCategory, selectedBrand, searchQuery]);

  // Get unique categories and brands
  const categories = [...new Set(products.map((p) => p.Product_Category))];
  const brands = [...new Set(products.map((p) => p.Brand_Name))];

  const detailsfun = (product) => {
    navigate("/productsdetails", { state: product });
  };

  return (
    <div className="p-4">
      {/* Filters and Search Bar */}
      <div className="flex flex-col md:flex-row justify-between mb-6 gap-4">
        {/* Left Filters */}
        <div className="flex gap-4">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2"
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>

          <select
            value={selectedBrand}
            onChange={(e) => setSelectedBrand(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2"
          >
            <option value="">All Brands</option>
            {brands.map((brand) => (
              <option key={brand} value={brand}>
                {brand}
              </option>
            ))}
          </select>
        </div>

        {/* Right Search */}
        <div className="relative w-full md:w-1/3">
          <input
            type="text"
            placeholder="Search by Description or Category..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border border-gray-300 rounded-lg pl-10 pr-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <FiSearch className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-500 text-lg" />
        </div>
      </div>

      {/* Product Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-14">
        {filteredProducts.map((product) => (
          <div
            key={product._id}
            className="rounded-2xl border border-transparent shadow-lg hover:border-green-400 hover:border-3 hover:shadow-2xl hover:scale-[1.03] transition-all duration-300 ease-in-out bg-white overflow-hidden"
          >
            <img
              src={`http://localhost:5000/uploads/${product.Product_image[0]}`}
              alt={product.Product_Name}
              className="w-full aspect-square p-4 object-cover"
            />
            <div className="p-4 ">
              <h2 className="text-xl font-semibold mb-2">
                {product.Product_Category}
              </h2>
              <p className="text-gray-600 mb-4">
                {product.Product_Description}
              </p>
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
    </div>
  );
};

export default Product;
