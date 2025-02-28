const express = require('express');
const { productFun, productList, upload } = require('../Controller/product.control.js')


const router = express.Router()


router.post('/add-product', upload.array('Product_images', 5), productFun);  // Accepts up to 5 image
router.get('/products', productList);


module.exports = router;