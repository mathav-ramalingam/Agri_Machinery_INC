const { response } = require("express");
const productModel = require("../model/product.model.js");
const multer = require("multer");

// Configure Multer Storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Save images in 'uploads' folder
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname); // Unique filename
  },
});

const upload = multer({ storage: storage }).any();

const addProduct = async (req, res) => {
  console.log("✅ Product received");
  try {
    const {
      Product_Number,
      Product_Category,
      Product_Description,
      Brand_Name,
      Product_Specification,
      Accessories,
    } = req.body;


    // Parse Product_Specification if it's a string
    let parsedSpecifications = [];
    if (typeof Product_Specification === "string") {
      try {
        parsedSpecifications = JSON.parse(Product_Specification);
      } catch (err) {
        return res
          .status(400)
          .json({ message: "Invalid JSON in Product_Specification" });
      }
    } else {
      parsedSpecifications = Product_Specification; // If it's already an object/array
    }

    // Extract product images
    const productImages = req.files
      .filter((file) => file.fieldname === "Product_image")
      .map((file) => file.filename);

    // Extract product brochures
    const productBrochures = req.files
      .filter((file) => file.fieldname === "Product_Broucher")
      .map((file) => file.path);

    if (!productImages.length) {
      return res.status(400).json({ message: "No images uploaded" });
    }

    const product = new productModel({
      Product_Number,
      Product_Category,
      Product_Description,
      Brand_Name,
      Product_image: productImages,
      Product_Broucher: productBrochures,
      Product_Specification: parsedSpecifications,
      Accessories: Accessories ? Accessories.split(",") : [],
    });

    await product.save();
    console.log(`${Product_Category} added successfully`);
    res.status(200).json({
      message: `${Product_Category} added successfully`,
      product,
    });
  } catch (error) {
    console.error("Error adding product:", error);
    res
      .status(500)
      .json({ message: "Error adding product", error: error.message });
  }
};



const editProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    const {
      Product_Number,
      Product_Category,
      Product_Description,
      Brand_Name,
      Product_Specification,
      Accessories,
    } = req.body;

    let parsedSpecifications = [];
    if (typeof Product_Specification === "string") {
      try {
        parsedSpecifications = JSON.parse(Product_Specification);
      } catch (err) {
        return res
          .status(400)
          .json({ message: "Invalid JSON in Product_Specification" });
      }
    } else {
      parsedSpecifications = Product_Specification;
    }

    // Optional: update images/brochures if sent
    let productImages = [];
    let productBrochures = [];

    if (req.files && req.files.length > 0) {
      productImages = req.files
        .filter((file) => file.fieldname === "Product_image")
        .map((file) => file.filename);

      productBrochures = req.files
        .filter((file) => file.fieldname === "Product_Broucher")
        .map((file) => file.path);
    }

    const updatedProduct = await productModel.findByIdAndUpdate(
      productId,
      {
        Product_Number,
        Product_Category,
        Product_Description,
        Brand_Name,
        ...(productImages.length > 0 && { Product_image: productImages }),
        ...(productBrochures.length > 0 && { Product_Broucher: productBrochures }),
        Product_Specification: parsedSpecifications,
        Accessories: Accessories ? Accessories.split(",") : [],
      },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({
      message: `${Product_Category} updated successfully`,
      product: updatedProduct,
    });
  } catch (error) {
    console.error("Error editing product:", error);
    res
      .status(500)
      .json({ message: "Error editing product", error: error.message });
  }
};



const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    const deletedProduct = await productModel.findByIdAndDelete(productId);

    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({
      message: `${deletedProduct.Product_Category} deleted successfully`,
    });
  } catch (error) {
    console.error("Error deleting product:", error);
    res
      .status(500)
      .json({ message: "Error deleting product", error: error.message });
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

module.exports = { addProduct, editProduct, deleteProduct, productList, upload };
