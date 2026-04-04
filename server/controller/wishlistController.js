const Wishlist = require("../models/wishlistModel");

exports.getWishlist = async (req,res) =>{
    try {
        const wishlist = await Wishlist.findOne({user: req.user._id}).populate("products");
        if(!wishlist){
            return res.status(404).json({message: "Wishlist Not Found"});
        }
        res.json(wishlist);
    } catch (error) {
        res.status(500).json({message: "Server Error"});
    }
}

exports.toggleWishlist = async (req,res) =>{
    try{
        const {productId} = req.body;
        let wishlist = await Wishlist.findOne({user: req.user._id});
        if(!wishlist){
            wishlist = await Wishlist.create({user: req.user._id, products: [productId]});
            return res.status(201).json({message: "Product Added to Wishlist"});
        }
        
        const productIndex = wishlist.products.findIndex(p => p.toString() === productId);
        
        if(productIndex !== -1){
            wishlist.products.splice(productIndex, 1);
            await wishlist.save();
            return res.status(200).json({message: "Product Removed from Wishlist"});
        }
        else{
            wishlist.products.push(productId);
            await wishlist.save();
            return res.status(200).json({message: "Product Added to Wishlist"});
        }
    }
    catch(err){
        res.status(500).json({message: "Server Error"});
    }
}