const express = require('express');
const { registerUser, loginUser, userLogout, getCurrentUser } = require('../controller/authController');
const { authMiddleware } = require('../middleware/authMiddleware');

const authRouter = express.Router();

authRouter.post("/register",registerUser);
authRouter.post("/login",loginUser);
authRouter.post("/logout",userLogout);
authRouter.get("/me",authMiddleware, getCurrentUser);

module.exports = authRouter;
