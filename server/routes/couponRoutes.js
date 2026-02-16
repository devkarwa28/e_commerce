const express = require('express');

const couponRouter = express.Router();

const {authMiddleware, AdminOnly} = require('../middleware/authMiddleware');
const { createCoupon, applyCoupon } = require('../controller/couponController');

couponRouter.post("/", authMiddleware, AdminOnly, createCoupon);

couponRouter.post("/apply",authMiddleware, applyCoupon);

module.exports = couponRouter;