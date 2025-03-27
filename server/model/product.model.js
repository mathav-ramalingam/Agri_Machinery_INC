const mongoose = require("mongoose");

// Product Number
// Product category
// Product name
// Brand name
// Images (array)
// Broucher
// Poduct specifictaion (array(dict))
// Accessories(array)

const productSchema = new mongoose.Schema({
  Product_Number: {
    type: String,
    require: true,
  },

  Product_Category: {
    type: String,
    require: true,
  },

  Product_Description: {
    type: String,
    require: true,
  },

  Brand_Name: {
    type: String,
    require: true,
  },

  Product_image: [
    {
      type: String,
      require: true,
    },
  ],

  Product_Broucher: [
    {
      type: String,
      require: true,
    },
  ],

  Product_Specification: [
    {
      Table_head: { type: String },
      Table_Data: { type: String },
    },
  ],

  Accessories: [
    {
      type: String,
    },
  ],

  // Approx_price: {
  //   type: String,
  // },
});

const productModel = mongoose.model("Product", productSchema);

module.exports = productModel;
