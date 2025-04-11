const mongoose = require('mongoose');

const UserOrderSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    shippingaddress: {
      type: String,
      required: true,
    },
    pincode: {
      type: Number,
      required: true,   
    },
    orderedProducts: [
      {
        productID: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        orderedAt: {
          type: Date,
          default: Date.now,
        }
      }
    ],
  },
  { timestamps: true }
);

const userorderModel = mongoose.model("userorder", UserOrderSchema);

module.exports = userorderModel;