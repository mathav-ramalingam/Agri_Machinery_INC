const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  Product_image: [
    {
      type: String,
    },
  ],

  Product_Name: {
    type: String,
  },

  Product_Sub_Name: {
    type: String,
  },
  Approx_price: {
    type: String,
  },

  Product_Details: [
    {
      Table_head: { type: String },
      Table_Data: { type: String },
    },
  ],

  Description: {
    type: String,
  },
});

const productModel = mongoose.model("Product", productSchema);

module.exports = productModel;
