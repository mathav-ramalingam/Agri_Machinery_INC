import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { MdProductionQuantityLimits, MdOutlineQuestionMark } from "react-icons/md";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

const ProductDetail = () => {
  const location = useLocation();
  const [imageIndex, setImageIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("PAY_NOW");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    shippingaddress: "",
    phone: "",
    pincode: "",
  });

  const data = location.state || "loading....";
  if (!data || data === "loading....") return <p>Loading...</p>;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleOrderSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      orderedProducts: [{ productID: data._id }],
    };

    if (paymentMethod === "PAY_NOW") {
      const totalAmount = 10000; // e.g. ₹100 * 100 (paise)

      const options = {
        key: "rzp_test_4rdgre6savrrmw", // Replace with your Razorpay Key
        amount: totalAmount,
        currency: "INR",
        name: "Agri Machinery Mart",
        description: "Order Payment",
        handler: async function (response) {
          try {
            const finalPayload = {
              ...payload,
              razorpay_payment_id: response.razorpay_payment_id,
            };

            const orderRes = await axios.post("http://localhost:5000/agri/userorder", finalPayload);

            if (orderRes.status === 201) {
              await axios.post("http://localhost:5000/agri/send-sms", {
                name: formData.name,
                phone: formData.phone,
                message: `Payment successful! Order confirmed. Payment ID: ${response.razorpay_payment_id}`,
                payment_id: response.razorpay_payment_id,
              });
              alert("Order placed successfully & SMS sent!");
            } else {
              alert("Payment succeeded, but order saving failed.");
            }
          } catch (error) {
            console.error("Error saving order after payment:", error);
            alert("Payment succeeded, but order saving failed. Please contact support.");
          }
        },
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.phone,
        },
        theme: { color: "#f37254" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } else {
      try {
        const orderRes = await axios.post("http://localhost:5000/agri/userorder", payload);
        if (orderRes.status === 201) {
          await axios.post("http://localhost:5000/agri/send-sms", {
            name: formData.name,
            phone: formData.phone,
            message: `Order placed successfully! Your items will be delivered soon.`,
            payment_id: 0,
          });
          alert("Order placed successfully with Cash on Delivery & SMS sent!");
          setShowModal(false);
        } else {
          alert("Order saving failed. Please try again.");
        }
      } catch (error) {
        console.error("Error placing COD order:", error);
        alert("Order placement failed. Please contact support.");
      }
    }
  };

  return (
    <>
      <div className={`max-w-6xl mx-auto p-6 ${showModal ? "blur-sm pointer-events-none select-none" : ""}`}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <img
              src={`http://localhost:5000/uploads/${data.Product_image[imageIndex]}`}
              alt="Product"
              className="w-full h-96 object-cover rounded-lg shadow-md"
            />
            <div className="flex space-x-2 mt-4 overflow-x-auto">
              {data.Product_image.map((img, index) => (
                <img
                  key={index}
                  src={`http://localhost:5000/uploads/${img}`}
                  alt="Thumbnail"
                  className={`w-16 h-16 object-cover rounded-md cursor-pointer border-2 ${
                    index === imageIndex ? "border-green-600" : "border-gray-300"
                  }`}
                  onClick={() => setImageIndex(index)}
                />
              ))}
            </div>
          </div>

          <div className="md:col-span-2 bg-white p-6 rounded-lg shadow-lg">
            <h1 className="text-2xl font-semibold text-green-700">{data.Product_Category}</h1>
            <p className="text-gray-600 mt-2">{data.Product_Description}</p>
            <div className="mt-4 text-lg font-semibold text-gray-800">
              Approx. Price: <span className="text-green-600">-----</span> / Piece
            </div>

            {data.Product_Broucher.length > 0 && (
              <div className="mt-4">
                <a
                  href={`http://localhost:5000/${data.Product_Broucher[0]}`}
                  download
                  className="flex items-center text-red-500 hover:underline"
                >
                  📄 Product Brochure
                </a>
              </div>
            )}

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

            {data.Accessories && data.Accessories.length > 0 && (
              <div className="mt-6">
                <h2 className="text-xl font-semibold mb-2">Accessories:</h2>
                <div className="flex flex-wrap gap-3">
                  {data.Accessories.map((item, index) => (
                    <div key={index} className="bg-green-100 text-green-800 px-4 py-2 rounded-xl shadow-sm">
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-6 flex space-x-4">
              <button
                onClick={() => setShowModal(true)}
                className="bg-green-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-green-600 transition"
              >
                Get Best Quote
              </button>
              <button
                onClick={() => setShowModal(true)}
                className="bg-green-700 text-white px-6 py-2 rounded-lg shadow-md hover:bg-green-800 transition"
              >
                Yes! I am Interested
              </button>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white p-6 rounded-3xl shadow-2xl w-full max-w-md relative"
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.7, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-2 right-4 text-xl font-bold text-gray-600 hover:text-red-500 transition"
              >
                ✕
              </button>
              <h2 className="text-2xl font-bold mb-4 text-green-700 text-center">📦 Place Your Order</h2>

              <div className="grid gap-4">
                {["name", "email", "shippingaddress", "phone", "pincode"].map((field) => (
                  <input
                    key={field}
                    type={field === "email" ? "email" : "text"}
                    name={field}
                    placeholder={field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, " $1")}
                    value={formData[field]}
                    onChange={handleChange}
                    className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                  />
                ))}

                <div className="flex items-center justify-between">
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="PAY_NOW"
                      checked={paymentMethod === "PAY_NOW"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    <span>Pay Now</span>
                  </label>

                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="COD"
                      checked={paymentMethod === "COD"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    <span>Cash on Delivery</span>
                  </label>
                </div>

                <button
                  onClick={handleOrderSubmit}
                  className="bg-green-600 text-white px-4 py-3 rounded-lg hover:bg-green-700 font-semibold text-lg transition"
                >
                  ✅ Submit Order
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ProductDetail;
