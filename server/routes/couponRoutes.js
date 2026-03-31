const express = require('express');

const couponRouter = express.Router();

const {authMiddleware, AdminOnly} = require('../middleware/authMiddleware');
const { createCoupon, applyCoupon, getAllCoupons, updateCouponStatus, deleteCoupon } = require('../controller/couponController');

couponRouter.post("/", authMiddleware, AdminOnly, createCoupon);
couponRouter.get("/admin", authMiddleware, AdminOnly, getAllCoupons);
couponRouter.put("/admin/:id", authMiddleware, AdminOnly, updateCouponStatus);
couponRouter.delete("/admin/:id", authMiddleware, AdminOnly, deleteCoupon);

couponRouter.post("/apply",authMiddleware, applyCoupon);

module.exports = couponRouter;