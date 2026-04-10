const Banner = require('../models/bannerModel');
const redis = require('../config/upstashRedis');
const uploadToCloudinary = require('../utilites/cloudinaryUpload');

exports.createBanner = async (req, res) => {
    try {
        const { title, titleAccent, subtitle, badge, active } = req.body;

        let imageUrl = "";
        if (req.file) {
            const result = await uploadToCloudinary(req.file.buffer, "banners");
            imageUrl = result.secure_url;
        } else {
            return res.status(400).json({ message: "Banner image is required" });
        }

        const newBanner = new Banner({ title, titleAccent, subtitle, image: imageUrl, badge, active });
        await newBanner.save();
        res.status(201).json({ message: "Banner slide created successfully", banner: newBanner });
    } catch (error) {
        res.status(500).json({ error: "Failed to create banner slide", details: error.message });
    }
};

exports.getBanners = async (req, res) => {
    try {
        const filter = req.query.all ? {} : { active: true };

        const cacheKey = req.query.all ? "banners:all" : "banners:active";
        const cachedBanners = await redis.get(cacheKey);

        if(cachedBanners)
        {
            console.log("Cached Banner Hit");
            return res.status(200).json(cachedBanners);
        }

        const banners = await Banner.find(filter).sort({ createdAt: -1 });

        await redis.set(cacheKey,banners,{ex: 600});
        console.log("Banner Cached In Redis")
        res.status(200).json(banners);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch banner slides", details: error.message });
    }
};

exports.updateBanner = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = { ...req.body };

        if (req.file) {
            const result = await uploadToCloudinary(req.file.buffer, "banners");
            updateData.image = result.secure_url;
        }

        const updatedBanner = await Banner.findByIdAndUpdate(id, updateData, { new: true });
        if (!updatedBanner) return res.status(404).json({ message: "Banner not found" });

        res.status(200).json({ message: "Banner updated", banner: updatedBanner });
    } catch (error) {
        res.status(500).json({ error: "Failed to update banner", details: error.message });
    }
};

exports.deleteBanner = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedBanner = await Banner.findByIdAndDelete(id);
        if (!deletedBanner) return res.status(404).json({ message: "Banner not found" });
        res.status(200).json({ message: "Banner deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete banner", details: error.message });
    }
};
