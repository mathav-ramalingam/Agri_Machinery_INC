const { response } = require('express');
const productModel = require('../model/product.model.js')
const multer = require('multer');


// Configure Multer Storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');  // Save images in 'uploads' folder
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);  // Unique filename
    }
});

const upload = multer({ storage: storage });




const productFun = async (req, res) => {
    try 
    {
        const { Product_Name, Product_Sub_Name, Approx_price, Product_Details, Description } = req.body;
        // Get uploaded image file paths
        const Product_images = req.files.map(file => `/uploads/${file.filename}`);

        var product = new productModel({
            Product_images,
            Product_Name,
            Product_Sub_Name,
            Approx_price,
            Product_Details,
            Description,
        });

        await product.save();
        console.log(`${Product_Name} added successfully`);
        res.status(200).json({ message: `${Product_Name} added successfully`, product });

    } catch (error) {
        console.log(error);
        res.status(500).send("Error adding product");
    }
};


// Function to get all products
const productList = async (req, res) => {
    try {
        const products = await productModel.find();
        res.status(200).json(products);
    } catch (error) {
        console.log(error);
        res.status(500).send("Error fetching products");
    }
};





module.exports = { productFun, productList, upload };