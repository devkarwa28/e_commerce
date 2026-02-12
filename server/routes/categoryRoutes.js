const express = require('express');
const { getAllCategory, getOneCategory, createCategory, updateCategory, deleteCategory } = require('../controller/categoryController');
const { authMiddleware, AdminOnly } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');
const categoryRouter = express.Router();

//user
categoryRouter.get("/",getAllCategory);
categoryRouter.get("/:id",getOneCategory);

//admin
categoryRouter.post("/", authMiddleware, AdminOnly,upload.single("image"),createCategory);

categoryRouter.put("/:id",authMiddleware,AdminOnly,upload.single("image"),updateCategory);

categoryRouter.delete("/:id",authMiddleware,AdminOnly,deleteCategory);

module.exports = categoryRouter;