import React, { useEffect, useState } from 'react';
import AdminNavbar from "../Admin/AdminNavar";
import axios from 'axios';
import { motion } from 'framer-motion';

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.5,
      type: 'spring',
    },
  }),
};

export const ViewOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/agri/orders")
      .then((res) => {
        setOrders(res.data);
      })
      .catch((err) => {
        console.error("Error fetching orders", err);
      });
  }, []);

  return (
    <>
      <AdminNavbar />
      <div className="p-6 bg-gray-100 min-h-screen">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">All Orders</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {orders.map((order, i) => (
            <motion.div
              key={order._id}
              custom={i}
              initial="hidden"
              animate="visible"
              variants={cardVariants}
              className="bg-white shadow-xl rounded-2xl p-5"
            >
              <h2 className="text-xl font-semibold mb-2 text-indigo-700">Customer: {order.name}</h2>
              <p><span className="font-medium">Email:</span> {order.email}</p>
              <p><span className="font-medium">Phone:</span> {order.phone}</p>
              <p><span className="font-medium">Address:</span> {order.shippingaddress}, {order.pincode}</p>

              <div className="mt-4">
                <h3 className="font-bold text-gray-700 mb-2">Ordered Products:</h3>
                {order.orderedProducts.map((item, idx) => (
                  <div key={idx} className="p-3 mb-2 rounded bg-indigo-50">
                    <p><span className="font-medium">Product No:</span> {item.productID?.Product_Number || "N/A"}</p>
                    <p><span className="font-medium">Brand:</span> {item.productID?.Brand_Name || "N/A"}</p>
                    <p><span className="font-medium">Category:</span> {item.productID?.Product_Category || "N/A"}</p>
                    <p><span className="font-medium">Description:</span> {item.productID?.Product_Description || "N/A"}</p>
                    <p><span className="font-medium">Ordered At:</span> {new Date(item.orderedAt).toLocaleString()}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
};
