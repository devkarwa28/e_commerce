const express = require('express');
const { authMiddleware, AdminOnly } = require('../middleware/authMiddleware');
const { placeOrder, getMyOrder, getAllOrders, updateOrderStatus } = require('../controller/orderController');

const orderRouter = express.Router();


orderRouter.post("/",authMiddleware, placeOrder);

orderRouter.get("/myorders",authMiddleware,getMyOrder);

orderRouter.get("/admin",authMiddleware,AdminOnly, getAllOrders);
orderRouter.put("/admin/:id",authMiddleware,AdminOnly, updateOrderStatus)

module.exports = orderRouter;