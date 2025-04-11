import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { MdProductionQuantityLimits } from "react-icons/md";
import { MdOutlineQuestionMark } from "react-icons/md";


const ProductDetail = () => {
  const location = useLocation();
  const [imageIndex, setImageIndex] = useState(0);

  const data = location.state || "loading....";
  if (!data || data === "loading....") return <p>Loading...</p>;

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-100 relative">
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
                    <td className="p-2 font-semibold bg-gray-100">
                      {spec.Table_head}
                    </td>
                    <td className="p-2">{spec.Table_Data}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Accessories Section */}
          {data.Accessories && data.Accessories.length > 0 && (
            <div className="mt-6">
              <h2 className="text-xl font-semibold mb-2">Accessories:</h2>
              <div className="flex flex-wrap gap-3">
                {data.Accessories.map((item, index) => (
                  <div
                    key={index}
                    className="bg-green-100 text-green-800 px-4 py-2 rounded-xl shadow-sm"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CTA Buttons */}
          <div className="mt-6 flex space-x-4">
            <button className="bg-green-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-green-600 transition">
              Get Best Quote
            </button>
            <button className="bg-green-700 text-white px-6 py-2 rounded-lg shadow-md hover:bg-green-800 transition">
              Yes! I am Interested
            </button>
          </div>
        </div>
      </div>

      {/* Floating Buttons */}
      {/* Floating Buttons - Glammed Up Babe Style */}
      <div className="fixed bottom-6 left-6 z-50">
        <button
          onClick={() => window.history.back()}
          className="bg-gradient-to-r from-green-400 to-green-700 hover:from-green-700 hover:to-green-700 text-white px-5 py-3 rounded-full shadow-xl font-semibold tracking-wide transition-all duration-300 hover:scale-105 animate-pulse"
          title="Back to Products"
        >
          <MdProductionQuantityLimits />
        </button>
      </div>

      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => (window.location.href = "/about")}
          className="bg-gradient-to-r from-gray-700 to-blue-600 hover:from-blue-500 hover:to-black text-white px-5 py-3 rounded-full  shadow-xl font-semibold tracking-wide transition-all duration-300 hover:scale-105 animate-pulse"
          title="About This Product"
        >
          <MdOutlineQuestionMark />
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;
