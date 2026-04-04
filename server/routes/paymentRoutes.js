const express = require('express');
const { authMiddleware } = require('../middleware/authMiddleware');
const { createOrder, verifyPayment } = require('../controller/paymentController');

const paymentRouter = express.Router();

paymentRouter.post("/create-order",authMiddleware,createOrder);
paymentRouter.post("/verify-payment",authMiddleware,verifyPayment);

module.exports = paymentRouter;