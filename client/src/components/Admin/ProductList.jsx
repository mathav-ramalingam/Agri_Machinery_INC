import React, { useState, useEffect } from "react";
import axios from "axios";
import { FiSearch, FiEdit2, FiTrash2 } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import AdminNavbar from "../Admin/AdminNavar";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    axios
      .get("http://localhost:3000/agri/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err));
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      axios
        .delete(`http://localhost:3000/agri/delete/${id}`)
        .then(() => fetchProducts())
        .catch((err) => console.error(err));
    }
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const form = new FormData();

      form.append("Product_Number", formData.Product_Number);
      form.append("Product_Category", formData.Product_Category);
      form.append("Product_Description", formData.Product_Description);
      form.append("Brand_Name", formData.Brand_Name);
      form.append("Accessories", formData.Accessories.join(","));
      form.append(
        "Product_Specification",
        JSON.stringify(formData.Product_Specification)
      );

      await axios.put(
        `http://localhost:3000/agri/edit/${editingProduct._id}`,
        form,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      fetchProducts();
      setEditingProduct(null); // Close modal
    } catch (error) {
      console.error("Error updating product:", error);
      alert("Failed to update product.");
    }
  };

  const openEditModal = (product) => {
    setEditingProduct(product);
    setFormData({
      Product_Number: product.Product_Number || "",
      Product_Category: product.Product_Category || "",
      Product_Description: product.Product_Description || "",
      Brand_Name: product.Brand_Name || "",
      Product_Specification: product.Product_Specification || [],
      Accessories: product.Accessories || [],
    });
  };

  const filtered = products.filter((p) => {
    const matchCategory =
      !selectedCategory || p.Product_Category === selectedCategory;
    const matchBrand = !selectedBrand || p.Brand_Name === selectedBrand;
    const matchSearch =
      p.Product_Description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.Product_Category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchBrand && matchSearch;
  });

  const categories = [...new Set(products.map((p) => p.Product_Category))];
  const brands = [...new Set(products.map((p) => p.Brand_Name))];

  return (
    <>
      <AdminNavbar />
      <div className="p-4">
        <div className="flex flex-col md:flex-row justify-between mb-6 gap-4">
          <div className="flex gap-4">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="border rounded px-3 py-2"
            >
              <option value="">All Categories</option>
              {categories.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>

            <select
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
              className="border rounded px-3 py-2"
            >
              <option value="">All Brands</option>
              {brands.map((b) => (
                <option key={b}>{b}</option>
              ))}
            </select>
          </div>

          <div className="relative w-full md:w-1/3">
            <input
              type="text"
              placeholder="Search..."
              className="border rounded pl-10 pr-3 py-2 w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <FiSearch className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-500" />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((product) => (
            <div
              key={product._id}
              className="border shadow-md rounded-2xl bg-white overflow-hidden"
            >
              <img
                src={`http://localhost:3000/uploads/${product.Product_image[0]}`}
                alt={product.Product_Description}
                className="w-full px-36 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold">
                  {product.Product_Category}
                </h3>
                <p className="text-sm text-gray-600">
                  {product.Product_Description}
                </p>
                <div className="flex justify-between mt-4">
                  <button
                    onClick={() => openEditModal(product)}
                    className="flex items-center gap-1 bg-yellow-400 px-3 py-1 rounded hover:bg-yellow-500"
                  >
                    <FiEdit2 /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(product._id)}
                    className="flex items-center gap-1 bg-red-500 px-3 py-1 text-white rounded hover:bg-red-600"
                  >
                    <FiTrash2 /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {editingProduct && (
          <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-2xl w-full max-w-3xl relative shadow-xl overflow-y-auto max-h-[90vh] animate-fade-in">
              <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
                Edit Product
              </h2>
              <form onSubmit={handleUpdate} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Product Number
                    </label>
                    <input
                      name="Product_Number"
                      placeholder="Product Number"
                      className="border px-3 py-2 rounded w-full"
                      value={formData.Product_Number}
                      onChange={handleEditChange}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Product Category
                    </label>
                    <input
                      name="Product_Category"
                      placeholder="Category"
                      className="border px-3 py-2 rounded w-full"
                      value={formData.Product_Category}
                      onChange={handleEditChange}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Product Description
                    </label>
                    <input
                      name="Product_Description"
                      placeholder="Description"
                      className="border px-3 py-2 rounded w-full"
                      value={formData.Product_Description}
                      onChange={handleEditChange}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Brand Name
                    </label>
                    <input
                      name="Brand_Name"
                      placeholder="Brand Name"
                      className="border px-3 py-2 rounded w-full"
                      value={formData.Brand_Name}
                      onChange={handleEditChange}
                    />
                  </div>
                </div>
                <div>
                  <label className="font-semibold">
                    Accessories (comma-separated)
                  </label>
                  <input
                    name="Accessories"
                    placeholder="Accessory1, Accessory2"
                    className="w-full border px-3 py-2 rounded"
                    value={formData.Accessories?.join(", ") || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        Accessories: e.target.value
                          .split(",")
                          .map((a) => a.trim()),
                      })
                    }
                  />
                </div>

                <div>
                  <label className="font-semibold block mb-2">
                    Product Specifications
                  </label>
                  {formData.Product_Specification?.map((spec, index) => (
                    <div
                      key={index}
                      className="grid grid-cols-5 gap-2 mb-2 items-center"
                    >
                      <input
                        placeholder="Table Head"
                        className="border px-2 py-1 rounded col-span-2"
                        value={spec.Table_head}
                        onChange={(e) => {
                          const updated = [...formData.Product_Specification];
                          updated[index].Table_head = e.target.value;
                          setFormData({
                            ...formData,
                            Product_Specification: updated,
                          });
                        }}
                      />
                      <input
                        placeholder="Table Data"
                        className="border px-2 py-1 rounded col-span-2"
                        value={spec.Table_Data}
                        onChange={(e) => {
                          const updated = [...formData.Product_Specification];
                          updated[index].Table_Data = e.target.value;
                          setFormData({
                            ...formData,
                            Product_Specification: updated,
                          });
                        }}
                      />
                      <button
                        type="button"
                        className="text-red-500 hover:text-red-700 text-sm"
                        onClick={() => {
                          const updated = [...formData.Product_Specification];
                          updated.splice(index, 1);
                          setFormData({
                            ...formData,
                            Product_Specification: updated,
                          });
                        }}
                      >
                        🗑️
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    className="text-blue-600 text-sm underline mt-2"
                    onClick={() =>
                      setFormData({
                        ...formData,
                        Product_Specification: [
                          ...formData.Product_Specification,
                          { Table_head: "", Table_Data: "" },
                        ],
                      })
                    }
                  >
                    + Add Specification
                  </button>
                </div>

                <div className="text-sm text-gray-500">
                  <p>
                    <strong>Image:</strong> {editingProduct.Product_image?.[0]}
                  </p>
                  <p>
                    <strong>Brochure:</strong>{" "}
                    {editingProduct.Product_Broucher?.[0]}
                  </p>
                  <p className="text-xs italic text-gray-400 mt-1">
                    (Image/Brochure editing via file upload can be added later)
                  </p>
                </div>

                <div className="flex justify-end gap-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setEditingProduct(null)}
                    className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ProductList;
