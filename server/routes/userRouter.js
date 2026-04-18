const express = require("express");
const { authMiddleware } = require("../middleware/authMiddleware");
const {
  updateProfile,
  addAddress,
  getAddresses,
  updateAddress,
  deleteAddress,
  updateAvatar,
} = require("../controller/userController");
const upload = require("../middleware/uploadMiddleware");

const userRouter = express.Router();
userRouter.get("/get-addresses", authMiddleware, getAddresses);
userRouter.put("/update-profile", authMiddleware, updateProfile);
userRouter.put(
  "/update-avatar",
  authMiddleware,
  upload.single("avatar"),
  updateAvatar,
);
userRouter.post("/add-address", authMiddleware, addAddress);

userRouter.put("/update-address/:id", authMiddleware, updateAddress);
userRouter.delete("/delete-address/:id", authMiddleware, deleteAddress);

module.exports = userRouter;
