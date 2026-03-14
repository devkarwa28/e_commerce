const express = require('express');
const { authMiddleware, AdminOnly } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');
const { createProduct, getProducts, getProductBySlug, updateProduct, disableProduct, toggleProductStatus, getProductById } = require('../controller/productController');

const productRouter = express.Router();

// Create A New Product
productRouter.post('/',authMiddleware,AdminOnly,upload.fields([
    {name : "mainImage",maxCount: 1},
    {name: "images",maxCount: 10}
]),createProduct);

//Get All Products
productRouter.get("/",getProducts);

//Update Product
productRouter.put("/:id",authMiddleware,AdminOnly,upload.fields([
    {name: "mainImage", maxCount: 1},
    {name: "images",maxCount: 10}
]),updateProduct);

productRouter.get("admin/:id",authMiddleware,AdminOnly,getProductById);

//Disable Product
productRouter.patch("/:id",authMiddleware,AdminOnly,toggleProductStatus);


// One Product
productRouter.get("/:slug",getProductBySlug);




module.exports = productRouter;

