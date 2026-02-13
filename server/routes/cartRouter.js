const express = require('express');
const { authMiddleware } = require('../middleware/authMiddleware');
const { addToCart, getMyCart } = require('../controller/cartController');

const cartRouter = express.Router();


cartRouter.post("/",authMiddleware,addToCart);
cartRouter.get("/",authMiddleware,getMyCart);

module.exports = cartRouter;