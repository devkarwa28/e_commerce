const express = require("express");
const { authMiddleware } = require("../middleware/authMiddleware");
const { toggleWishlist, getWishlist } = require("../controller/wishlistController");

const wishRouter = express.Router();

wishRouter.get("/",authMiddleware,getWishlist);
wishRouter.post("/toggle",authMiddleware,toggleWishlist);

module.exports = wishRouter;
