const express = require('express');
const { createBanner, getBanners, updateBanner, deleteBanner } = require('../controller/bannerController');
const upload = require('../middleware/uploadMiddleware');
const router = express.Router();

router.post('/', upload.single('image'), createBanner);
router.get('/', getBanners);
router.put('/:id', upload.single('image'), updateBanner);
router.delete('/:id', deleteBanner);

module.exports = router;
