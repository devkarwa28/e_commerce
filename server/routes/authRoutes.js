const express = require('express');
const { registerUser, loginUser, userLogout, getCurrentUser, getAllUsers } = require('../controller/authController');
const { authMiddleware, AdminOnly } = require('../middleware/authMiddleware');

const authRouter = express.Router();

authRouter.post("/register",registerUser);
authRouter.post("/login",loginUser);
authRouter.post("/logout",userLogout);
authRouter.get("/me",authMiddleware, getCurrentUser);
authRouter.get("/all",authMiddleware,AdminOnly,getAllUsers);

module.exports = authRouter;
