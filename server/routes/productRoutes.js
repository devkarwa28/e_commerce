const express = require('express');
const { authMiddleware, AdminOnly } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');
const { createProduct, getProducts } = require('../controller/productController');

const productRouter = express.Router();


productRouter.post('/',authMiddleware,AdminOnly,upload.fields([
    {name : "mainImage",maxCount: 1},
    {name: "images",maxCount: 5}
]),createProduct);
productRouter.get("/",getProducts);
module.exports = productRouter;