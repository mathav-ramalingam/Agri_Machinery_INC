const express = require('express');
const router = express.Router()
const productFun = require('../Controller/product.control.js')

router.post('/prod',productFun)


module.exports = router;