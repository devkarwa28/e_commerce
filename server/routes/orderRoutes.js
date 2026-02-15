const express = require('express');
const { authMiddleware } = require('../middleware/authMiddleware');
const { placeOrder, getMyOrder } = require('../controller/orderController');

const orderRouter = express.Router();


orderRouter.post("/",authMiddleware, placeOrder);

orderRouter.get("/myorders",authMiddleware,getMyOrder);

module.exports = orderRouter;