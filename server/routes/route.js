const express = require("express");
const {productList,upload,addProduct,editProduct, deleteProduct} = require("../Controller/product.control.js");
const {adminlogin,logout,authcheck} = require("../Controller/auth.control.js");
const { userOrder, getOrders } = require("../Controller/userorder.control.js");

const router = express.Router();


router.post("/add-product", upload, addProduct);
router.put('/edit/:id', upload, editProduct);
router.delete('/delete/:id', deleteProduct);
router.get("/products", productList);

router.post("/login",adminlogin);
router.post("/logout",logout);
router.get("/me",authcheck);


router.post("/userorder",userOrder);
router.get("/orders",getOrders);


module.exports = router;
