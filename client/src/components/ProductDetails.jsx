"use client"

import { useState } from "react"
import { useLocation } from "react-router-dom"
import { MdDownload, MdClose } from "react-icons/md"
import axios from "axios"
import { motion, AnimatePresence } from "framer-motion"
// Fix jsPDF imports
import jsPDF from "jspdf"
import autoTable from "jspdf-autotable"
import { BASE_URL } from "./api/config.js";

const ProductDetail = () => {
  const location = useLocation()
  const [imageIndex, setImageIndex] = useState(0)
  const [showModal, setShowModal] = useState(false)
  const [showInvoiceModal, setShowInvoiceModal] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState("PAY_NOW")
  const [orderDetails, setOrderDetails] = useState(null)
  const [paymentId, setPaymentId] = useState("")

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    shippingaddress: "",
    phone: "",
    pincode: "",
  })

  const data = location.state || "loading...."
  if (!data || data === "loading....") return <p>Loading...</p>

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const generateInvoice = () => {
    try {
      // Create a new PDF document
      const doc = new jsPDF()

      // Add company logo/header
      doc.setFontSize(20)
      doc.setTextColor(39, 174, 96) // Green color
      doc.text("Agri Machinery Mart", 105, 20, { align: "center" })

      doc.setFontSize(12)
      doc.setTextColor(0, 0, 0)
      doc.text("Invoice", 105, 30, { align: "center" })

      // Add invoice details
      doc.setFontSize(10)
      doc.text(`Invoice Date: ${new Date().toLocaleDateString()}`, 15, 40)
      doc.text(`Invoice #: INV-${paymentId ? paymentId.slice(-6) : "000000"}`, 15, 45)
      doc.text(`Payment ID: ${paymentId || "N/A"}`, 15, 50)

      // Add customer details
      doc.setFontSize(12)
      doc.text("Customer Details:", 15, 60)
      doc.setFontSize(10)
      doc.text(`Name: ${formData.name}`, 15, 65)
      doc.text(`Email: ${formData.email}`, 15, 70)
      doc.text(`Phone: ${formData.phone}`, 15, 75)
      doc.text(`Address: ${formData.shippingaddress}`, 15, 80)
      doc.text(`Pincode: ${formData.pincode}`, 15, 85)

      // Add product details
      doc.setFontSize(12)
      doc.text("Product Details:", 15, 95)

      // Create product table
      const tableColumn = ["Product", "Category", "Price", "Quantity", "Total"]
      const tableRows = [
        [data.Product_Category || "Product Name", data.Product_Category || "Category", "₹10000", "1", "₹10000"],
      ]

      // Use autoTable plugin
      autoTable(doc, {
        startY: 100,
        head: [tableColumn],
        body: tableRows,
        theme: "grid",
        headStyles: { fillColor: [39, 174, 96] },
      })

      // Add total
      const finalY = doc.lastAutoTable.finalY || 130
      doc.text(
        `Payment Method: ${paymentMethod === "PAY_NOW" ? "Online Payment" : "Cash on Delivery"}`,
        130,
        finalY + 10,
      )
      doc.text(`Total Amount: ₹10000`, 130, finalY + 15)

      // Add footer
      doc.setFontSize(8)
      doc.text(
        "Thank you for your purchase! For any queries, please contact us at support@agrimachinerymart.com",
        105,
        280,
        { align: "center" },
      )

      return doc
    } catch (error) {
      console.error("Error generating invoice:", error)
      alert("Failed to generate invoice. Please try again.")
      return null
    }
  }

  const handleDownloadInvoice = () => {
    try {
      const doc = generateInvoice()
      if (doc) {
        // Generate a safe filename
        const safePaymentId = paymentId ? paymentId.replace(/[^a-zA-Z0-9]/g, "") : "invoice"
        const filename = `Invoice-${safePaymentId.slice(-6)}.pdf`

        // Save the PDF
        doc.save(filename)
      }
    } catch (error) {
      console.error("Error downloading invoice:", error)
      alert("Failed to download invoice. Please try again.")
    }
  }

  const handleOrderSubmit = async (e) => {
    e.preventDefault()

    const payload = {
      ...formData,
      orderedProducts: [{ productID: data._id }],
    }

    if (paymentMethod === "PAY_NOW") {
      const totalAmount = 10000 // e.g. ₹100 * 100 (paise)

      const options = {
        key: "rzp_test_4rdgre6savrrmw", // Replace with your Razorpay Key
        amount: totalAmount,
        currency: "INR",
        name: "Agri Machinery Mart",
        description: "Order Payment",
        handler: async (response) => {
          try {
            const finalPayload = {
              ...payload,
              razorpay_payment_id: response.razorpay_payment_id,
            }

            const orderRes = await axios.post(`${BASE_URL}/agri/userorder`, finalPayload)

            if (orderRes.status === 201) {
              await axios.post(`${BASE_URL}/agri/send-sms`, {
                name: formData.name,
                phone: formData.phone,
                message: `Payment successful! Order confirmed. Payment ID: ${response.razorpay_payment_id}`,
                payment_id: response.razorpay_payment_id,
              })

              // Close the payment modal
              setShowModal(false)

              // Set payment ID for invoice
              setPaymentId(response.razorpay_payment_id)

              // Store order details for invoice
              setOrderDetails({
                ...orderRes.data,
                paymentId: response.razorpay_payment_id,
              })

              // Show invoice modal
              setShowInvoiceModal(true)
            } else {
              alert("Payment succeeded, but order saving failed.")
            }
          } catch (error) {
            console.error("Error saving order after payment:", error)
            alert("Payment succeeded, but order saving failed. Please contact support.")
          }
        },
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.phone,
        },
        theme: { color: "#f37254" },
      }

      const rzp = new window.Razorpay(options)
      rzp.open()
    } else {
      try {
        const orderRes = await axios.post(`${BASE_URL}/agri/userorder`, payload)
        if (orderRes.status === 201) {
          await axios.post(`${BASE_URL}/agri/send-sms`, {
            name: formData.name,
            phone: formData.phone,
            message: `Order placed successfully! Your items will be delivered soon.`,
            payment_id: 0,
          })

          // Close the payment modal
          setShowModal(false)

          // Set a dummy payment ID for COD
          setPaymentId(`COD-${Date.now().toString().slice(-6)}`)

          // Store order details for invoice
          setOrderDetails({
            ...orderRes.data,
            paymentId: `COD-${Date.now().toString().slice(-6)}`,
          })

          // Show invoice modal
          setShowInvoiceModal(true)
        } else {
          alert("Order saving failed. Please try again.")
        }
      } catch (error) {
        console.error("Error placing COD order:", error)
        alert("Order placement failed. Please contact support.")
      }
    }
  }

  return (
    <>
      <div
        className={`max-w-6xl mx-auto p-6 ${showModal || showInvoiceModal ? "blur-sm pointer-events-none select-none" : ""}`}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <img
              src={`${BASE_URL}/uploads/${data.Product_image[imageIndex]}`}
              alt="Product"
              className="w-full h-96 object-cover rounded-lg shadow-md"
            />
            <div className="flex space-x-2 mt-4 overflow-x-auto">
              {data.Product_image.map((img, index) => (
                <img
                  key={index}
                  src={`${BASE_URL}/uploads/${img}`}
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

            {data.Product_Broucher && data.Product_Broucher.length > 0 && (
              <div className="mt-4">
                <a
                  href={`${BASE_URL}/${data.Product_Broucher[0]}`}
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
                  {data.Product_Specification &&
                    data.Product_Specification.map((spec, index) => (
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

      {/* Order Modal */}
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

      {/* Invoice Modal */}
      <AnimatePresence>
        {showInvoiceModal && (
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
                onClick={() => setShowInvoiceModal(false)}
                className="absolute top-2 right-4 text-xl font-bold text-gray-600 hover:text-red-500 transition"
              >
                ✕
              </button>
              <h2 className="text-2xl font-bold mb-4 text-green-700 text-center">🧾 Order Confirmation</h2>

              <div className="bg-green-50 p-4 rounded-lg mb-4">
                <p className="text-green-800 font-medium">Your order has been placed successfully!</p>
                <p className="text-sm text-green-700 mt-1">
                  {paymentMethod === "PAY_NOW"
                    ? `Payment ID: ${paymentId}`
                    : "Your order will be delivered soon. Payment will be collected upon delivery."}
                </p>
              </div>

              <div className="mb-4">
                <h3 className="font-semibold text-lg mb-2">Order Summary</h3>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p>
                    <span className="font-medium">Product:</span> {data.Product_Category}
                  </p>
                  <p>
                    <span className="font-medium">Amount:</span> ₹10000
                  </p>
                  <p>
                    <span className="font-medium">Shipping Address:</span> {formData.shippingaddress},{" "}
                    {formData.pincode}
                  </p>
                </div>
              </div>

              <p className="text-sm text-gray-600 mb-4">
                You can download your invoice for your records. The invoice contains all the details of your purchase.
              </p>

              <div className="flex space-x-3">
                <button
                  onClick={handleDownloadInvoice}
                  className="flex-1 bg-green-600 text-white px-4 py-3 rounded-lg hover:bg-green-700 font-semibold transition flex items-center justify-center"
                >
                  <MdDownload className="mr-2" /> Download Invoice
                </button>
                <button
                  onClick={() => setShowInvoiceModal(false)}
                  className="flex-1 bg-gray-200 text-gray-800 px-4 py-3 rounded-lg hover:bg-gray-300 font-semibold transition flex items-center justify-center"
                >
                  <MdClose className="mr-2" /> Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default ProductDetail
