const express = require('express');
const { authMiddleware, AdminOnly } = require('../middleware/authMiddleware');
const { getDashboardStats, getMonthlySales, getTopSellingProduct, getRecentOrders, getDailySales, getOrderStatusStats } = require('../controller/adminController');

const adminRouter = express.Router();


adminRouter.get("/dashboard",authMiddleware,AdminOnly,getDashboardStats)

adminRouter.get("/monthly-sales",authMiddleware,AdminOnly,getMonthlySales)

adminRouter.get("/top-products",authMiddleware,AdminOnly,getTopSellingProduct)

adminRouter.get("/recent-orders",authMiddleware,AdminOnly,getRecentOrders)

adminRouter.get("/get-daily-sales",authMiddleware,AdminOnly,getDailySales)

adminRouter.get("/order-status",authMiddleware,AdminOnly,getOrderStatusStats);


module.exports = adminRouter;
