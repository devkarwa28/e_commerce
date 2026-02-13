const express = require('express');
const { authMiddleware, AdminOnly } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');
const { createProduct, getProducts, getProductBySlug, updateProduct, disableProduct } = require('../controller/productController');

const productRouter = express.Router();

// Create A New Product
productRouter.post('/',authMiddleware,AdminOnly,upload.fields([
    {name : "mainImage",maxCount: 1},
    {name: "images",maxCount: 5}
]),createProduct);

//Get All Products
productRouter.get("/",getProducts);

//Update Product
productRouter.put("/:id",authMiddleware,AdminOnly,upload.fields([
    {name: "mainImage", maxCount: 1},
    {name: "iamges",maxCount: 5}
]),updateProduct);

//Disable Product
productRouter.delete("/:id",authMiddleware,AdminOnly,disableProduct);

// One Product
productRouter.get("/:slug",getProductBySlug);
module.exports = productRouter;

