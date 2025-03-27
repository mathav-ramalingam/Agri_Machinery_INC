const express = require("express");
const {productList,upload,addProduct,} = require("../Controller/product.control.js");

const router = express.Router();


router.post("/add-product", upload, addProduct);
router.get("/products", productList);

module.exports = router;
