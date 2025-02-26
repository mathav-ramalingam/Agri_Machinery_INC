const { response } = require('express');
const productModel = require('../model/product.model.js')


const productFun = async(req,res) =>
{
    const {Product_image , Product_Name,Product_Sub_Name,Approx_price,Product_Details,Description} = req.body

    try {

        var product = new productModel({
            Product_image : Product_image,
            Product_Name : Product_Name,
            Product_Sub_Name :Product_Sub_Name,
            Approx_price : Approx_price,
            Product_Details :Product_Details,
            Description : Description,
        })
        product.save();
        console.log(`${Product_Name} added Succesfully`)
        res.status(200).send(`${Product_Name} added successfully`);

    } catch (error) {
        console.log(err);
    }
}


module.exports = productFun;