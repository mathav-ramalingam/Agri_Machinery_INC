import React from "react";
import { useNavigate } from "react-router-dom";
import AdminNavbar from "./AdminNavar"; 
import Card from "../ui/Card";
import { Boxes, ShoppingCart, Wrench, PlusCircle } from "lucide-react";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const dashboardItems = [
    {
      title: "Add Product",
      icon: <PlusCircle className="h-8 w-8 text-green-600" />,
      action: () => navigate("/admin/products/add"),
      color: "bg-green-100",
    },
    {
      title: "Manage Products",
      icon: <Boxes className="h-8 w-8 text-blue-600" />,
      action: () => navigate("/admin/products"),
      color: "bg-blue-100",
    },
    {
      title: "User Orders",
      icon: <ShoppingCart className="h-8 w-8 text-yellow-600" />,
      action: () => navigate("/admin/orders"),
      color: "bg-yellow-100",
    },
    {
      title: "Service Requests",
      icon: <Wrench className="h-8 w-8 text-red-600" />,
      action: () => navigate("/admin/requests"),
      color: "bg-red-100",
    },
  ];

  return (
    <>
      <AdminNavbar />

      <div className="p-6 bg-gray-50 min-h-screen">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Admin Dashboard</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {dashboardItems.map((item, idx) => (
            <Card
              key={idx}
              className={`p-6 rounded-2xl shadow-md cursor-pointer hover:scale-[1.02] transition ${item.color}`}
              onClick={item.action}
            >
              <div className="flex items-center gap-4">
                {item.icon}
                <h2 className="text-lg font-semibold">{item.title}</h2>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
