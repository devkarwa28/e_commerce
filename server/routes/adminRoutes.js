const express = require('express');
const { authMiddleware, AdminOnly } = require('../middleware/authMiddleware');
const { getDashboardStats, getMonthlySales, getTopSellingProduct } = require('../controller/adminController');

const adminRouter = express.Router();


adminRouter.get("/dashboard",authMiddleware,AdminOnly,getDashboardStats)

adminRouter.get("/monthly-sales",authMiddleware,AdminOnly,getMonthlySales)

adminRouter.get("/top-products",authMiddleware,AdminOnly,getTopSellingProduct)

module.exports = adminRouter;
