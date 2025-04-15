const express = require("express");
const userorderModel = require("../model/userorder.model.js");

// Create a new order (user + product details)
const userOrder = async (req, res) => {
  try {
    const { name, email, shippingaddress, phone, pincode, orderedProducts, razorpay_payment_id } =
      req.body;

    if (
      !name ||
      !email ||
      !shippingaddress ||
      !phone ||
      !pincode ||
      !orderedProducts?.length
    ) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newUserOrder = new userorderModel({
      name,
      email,
      shippingaddress,
      phone,
      pincode,
      orderedProducts,
      razorpay_payment_id,
    });

    const saved = await newUserOrder.save();
    res.status(201).json(saved);
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const getOrders =  async (req, res) => {
  try {
    const userProd = await userorderModel.find().populate(
      "orderedProducts.productID"
    );
    res.json(userProd);
  } catch (err) {
    console.error("Error fetching products:", err);
    res.status(500).json(productResponse.unexpectedError);
  }
};

module.exports = { userOrder, getOrders };
