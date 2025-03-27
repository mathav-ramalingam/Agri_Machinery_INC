import React, { useState } from "react";
import { useLocation } from "react-router-dom";

const ProductDetail = () => {
  const location = useLocation();
  const [imageIndex, setImageIndex] = useState(0);

  const data = location.state || "loading....";
  if (!data || data === "loading....") return <p>Loading...</p>;

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-100">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Section - Image and Thumbnails */}
        <div className="md:col-span-1">
          <img
            src={`http://localhost:3000/uploads/${data.Product_image[imageIndex]}`}
            alt="Product"
            className="w-full h-96 object-cover rounded-lg shadow-md"
          />

          {/* Thumbnail images */}
          <div className="flex space-x-2 mt-4 overflow-x-auto">
            {data.Product_image.map((img, index) => (
              <img
                key={index}
                src={`http://localhost:3000/uploads/${img}`}
                alt="Thumbnail"
                className={`w-16 h-16 object-cover rounded-md cursor-pointer border-2 ${
                  index === imageIndex ? "border-green-600" : "border-gray-300"
                }`}
                onClick={() => setImageIndex(index)}
              />
            ))}
          </div>
        </div>

        {/* Right Section - Product Details */}
        <div className="md:col-span-2 bg-white p-6 rounded-lg shadow-lg">
          <h1 className="text-2xl font-semibold text-green-700">
            {data.Product_Category}
          </h1>
          <p className="text-gray-600 mt-2">{data.Product_Description}</p>

          {/* Product Price */}
          <div className="mt-4 text-lg font-semibold text-gray-800">
            Approx. Price: <span className="text-green-600">-----</span> / Piece
          </div>

          {/* Brochure Download */}
          {data.Product_Broucher.length > 0 && (
            <div className="mt-4">
              <a
                href={`http://localhost:3000/${data.Product_Broucher[0]}`}
                download
                className="flex items-center text-red-500 hover:underline"
              >
                📄 Product Brochure
              </a>
            </div>
          )}

          {/* Product Specification Table */}
          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-2">Product Details:</h2>
            <table className="w-full border-collapse border border-gray-300">
              <tbody>
                {data.Product_Specification.map((spec, index) => (
                  <tr key={index} className="border-b">
                    <td className="p-2 font-semibold bg-gray-100">{spec.Table_head}</td>
                    <td className="p-2">{spec.Table_Data}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* CTA Buttons */}
          <div className="mt-6 flex space-x-4">
            <button className="bg-green-500 text-white px-6 py-2 rounded-lg shadow-md">
              Get Best Quote
            </button>
            <button className="bg-green-700 text-white px-6 py-2 rounded-lg shadow-md">
              Yes! I am Interested
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
