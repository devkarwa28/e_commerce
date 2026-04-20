const express = require('express');
const { registerUser, loginUser, userLogout, getCurrentUser, getAllUsers } = require('../controller/authController');
const { authMiddleware, AdminOnly } = require('../middleware/authMiddleware');
const { sendOTP, verifyOTP } = require('../utilites/sendOTP');

const authRouter = express.Router();

authRouter.post("/register",registerUser);
authRouter.post("/login",loginUser);
authRouter.post("/logout",userLogout);
authRouter.get("/me",authMiddleware, getCurrentUser);
authRouter.get("/all",authMiddleware,AdminOnly,getAllUsers);
authRouter.post("/send-otp",sendOTP);
authRouter.post("/verify-otp",verifyOTP);

module.exports = authRouter;
