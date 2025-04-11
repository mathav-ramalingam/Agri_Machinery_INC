import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    Product_Number: "",
    Product_Category: "",
    Product_Description: "",
    Brand_Name: "",
    Accessories: "",
  });

  const [Product_image, setProductImage] = useState([]);
  const [ImagePreviews, setImagePreviews] = useState([]);
  const [Product_Broucher, setProductBroucher] = useState(null);
  const [Product_Specification, setProductSpecification] = useState([
    { Table_head: "", Table_Data: "" },
  ]);

  const handleInput = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (files) => {
    const selected = Array.from(files);

    setProductImage((prev) => [...prev, ...selected]);

    // Preview thumbnails
    const previews = selected.map((file) => URL.createObjectURL(file));
    setImagePreviews((prev) => [...prev, ...previews]);
  };

  const handleImageDrop = (e) => {
    e.preventDefault();
    handleImageChange(e.dataTransfer.files);
  };

  const handleBrochureChange = (e) => {
    setProductBroucher(e.target.files[0]);
  };

  const handleSpecChange = (index, field, value) => {
    const updated = [...Product_Specification];
    updated[index][field] = value;
    setProductSpecification(updated);
  };

  const addSpecField = () => {
    setProductSpecification([
      ...Product_Specification,
      { Table_head: "", Table_Data: "" },
    ]);
  };

  const removeSpecField = (index) => {
    const updated = Product_Specification.filter((_, i) => i !== index);
    setProductSpecification(updated);
  };

  const removeImage = (index) => {
    const updatedImages = [...Product_image];
    const updatedPreviews = [...ImagePreviews];
    updatedImages.splice(index, 1);
    updatedPreviews.splice(index, 1);
    setProductImage(updatedImages);
    setImagePreviews(updatedPreviews);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("handleSubmit triggered");

    try {
      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) =>
        formData.append(key, value)
      );
      Product_image.forEach((img) => formData.append("Product_image", img));
      if (Product_Broucher)
        formData.append("Product_Broucher", Product_Broucher);
      formData.append(
        "Product_Specification",
        JSON.stringify(Product_Specification)
      );

      for (let [key, val] of formData.entries()) {
        console.log(key, val);
      }

      const res = await axios.post(
        "http://localhost:5000/agri/add-product",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success("Product added successfully!");
      navigate("/admin");
    } catch (err) {
      console.error("Error submitting:", err);
      toast.error("Failed to add product");
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-8 bg-white shadow-lg rounded-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Add New Product</h2>
        <button
          onClick={() => navigate("/admin")}
          className="text-red-600 font-medium hover:underline"
        >
          ⬅ Back to Dashboard
        </button>
      </div>

      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        className="space-y-4"
      >
        {/* Inputs */}
        {[
          "Product_Number",
          "Product_Category",
          "Product_Description",
          "Brand_Name",
          "Accessories",
        ].map((field) => (
          <input
            key={field}
            type="text"
            name={field}
            placeholder={field.replaceAll("_", " ")}
            className="input"
            onChange={handleInput}
            required
          />
        ))}

        {/* Image Upload with Drag & Drop */}
        <div
          onDrop={handleImageDrop}
          onDragOver={(e) => e.preventDefault()}
          className="border-2 border-dashed p-4 rounded-md text-center cursor-pointer"
        >
          <label className="block font-medium mb-2">
            Product Images (Drag & Drop or Click):
          </label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => handleImageChange(e.target.files)}
            className="hidden"
            id="upload-images"
          />
          <label
            htmlFor="upload-images"
            className="text-blue-500 hover:underline cursor-pointer"
          >
            Click to select images
          </label>
        </div>

        {/* Preview Images */}
        {ImagePreviews.length > 0 && (
          <div className="grid grid-cols-4 gap-4 mt-4">
            {ImagePreviews.map((preview, index) => (
              <div key={index} className="relative group">
                <img
                  src={preview}
                  alt="preview"
                  className="h-full w-full aspect-square p-4  object-cover rounded-md "
                />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 text-xs opacity-80 hover:opacity-100"
                >
                  ✖
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Brochure Upload */}
        <div>
          <label className="block font-medium">Product Brochure (PDF):</label>
          <input
            type="file"
            accept="application/pdf"
            onChange={handleBrochureChange}
            className="input"
          />
        </div>

        {/* Product Specifications */}
        <div>
          <label className="block font-medium mb-2">
            Product Specifications:
          </label>
          {Product_Specification.map((spec, index) => (
            <div
              key={index}
              className="grid grid-cols-12 gap-2 items-center mb-2"
            >
              <input
                type="text"
                placeholder="Table Header"
                value={spec.Table_head}
                onChange={(e) =>
                  handleSpecChange(index, "Table_head", e.target.value)
                }
                className="input col-span-5"
              />
              <input
                type="text"
                placeholder="Table Data"
                value={spec.Table_Data}
                onChange={(e) =>
                  handleSpecChange(index, "Table_Data", e.target.value)
                }
                className="input col-span-5"
              />
              <button
                type="button"
                onClick={() => removeSpecField(index)}
                className="text-red-500 hover:text-red-700 col-span-2"
              >
                ✖ Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addSpecField}
            className="text-green-600 hover:underline text-sm"
          >
            + Add More
          </button>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition duration-300"
        >
          Submit Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
