const express = require('express');
const { authMiddleware } = require('../middleware/authMiddleware');
const { addToCart, getMyCart, updateCartItem, removeCartItem, clearCart } = require('../controller/cartController');

const cartRouter = express.Router();


cartRouter.post("/",authMiddleware,addToCart);
cartRouter.get("/",authMiddleware,getMyCart);

cartRouter.put("/",authMiddleware,updateCartItem);
cartRouter.delete("/",authMiddleware,removeCartItem);
cartRouter.delete("/clear",authMiddleware,clearCart);   

module.exports = cartRouter;