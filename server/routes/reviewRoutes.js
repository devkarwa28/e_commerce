const express = require('express');
const { authMiddleware } = require('../middleware/authMiddleware');
const { addReview, getReviewsByProduct } = require('../controller/reviewController');

const reviewRouter = express.Router();


reviewRouter.post("/:productId", authMiddleware, addReview);

reviewRouter.get("/:productId",getReviewsByProduct);


module.exports = reviewRouter;