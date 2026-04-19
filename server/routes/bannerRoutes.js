const express = require('express');
const { createBanner, getBanners, updateBanner, deleteBanner } = require('../controller/bannerController');
const upload = require('../middleware/uploadMiddleware');
const { authMiddleware, AdminOnly } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/',authMiddleware,AdminOnly,upload.single('image'), createBanner);
router.get('/',getBanners);
router.put('/:id',authMiddleware,AdminOnly,upload.single('image'), updateBanner);
router.delete('/:id',authMiddleware,AdminOnly,deleteBanner);

module.exports = router;
