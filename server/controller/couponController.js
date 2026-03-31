const Coupon = require('../models/couponModel');
const Cart = require('../models/cartModel');


exports.createCoupon = async (req,res) =>{
    try{
        const {code,discountType,discountValue,minOrderAmount,maxDiscount,usageLimit,expiresAt} = req.body;

        const coupon = await Coupon.create({code,discountType,discountValue,minOrderAmount,maxDiscount,usageLimit,expiresAt});

        res.status(201).json({success: true, coupon})
    }
    catch(err){
        console.log(err);
        res.status(500).json({message: "Server Error"});
    }
}

exports.applyCoupon = async (req,res) =>{
    try{
        const {code} = req.body;

        const cart = await Cart.findOne({user: req.user._id});

        if(!cart || cart.items.length === 0)
        {
            return res.status(400).json({message: "Cart Empty"});
        }

        const coupon = await Coupon.findOne({code: code.toUpperCase()});

        if(!coupon || !coupon.isActive)
        {
            return res.status(400).json({message: "invalid coupon"});
        }

        if(coupon.expiresAt && coupon.expiresAt < new Date())
        {
            return res.status(400).json({message: "coupon expires"})
        }

        if(coupon.usageLimit > 0 && coupon.usedCount >= coupon.usageLimit)
        {
            return res.status(400).json({message: "coupon usage limit over"})
        }

        if(coupon.usedBy.includes(req.user._id))
        {
            return res.status(400).json({message: "coupon is used alredy"})
        }

        if(cart.totalAmount < coupon.minOrderAmount)
        {
            return res.status(400).json({message: "minimum order value not met"})
        }

        let discount = 0;

        if(coupon.discountType === "percentage")
        {
            discount = (cart.totalAmount * coupon.discountValue) / 100;
            if(coupon.maxDiscount)
            {
                discount = Math.min(discount, coupon.maxDiscount);
            }
        }
        else{
            discount = coupon.discountValue;
        }

        const finalAmount = cart.totalAmount - discount;

        res.json({success: true,discount,finalAmount})

    }
    catch(err){
        console.log(err);
        res.status(500).json({message: "Server Error"});
    }
}

exports.getAllCoupons = async (req,res) =>{
    try{
        const coupons = await Coupon.find().sort({createdAt: -1});
        res.json({success: true, coupons});
    }
    catch(err){
        console.log(err);
        res.status(500).json({message: "Server Error"});
    }
}

exports.updateCouponStatus = async (req,res) =>{
    try{
        const coupon = await Coupon.findById(req.params.id);
        if(!coupon) return res.status(404).json({message: "Coupon Not Found"});
        
        coupon.isActive = !coupon.isActive;
        await coupon.save();
        
        res.json({success: true, message: "Status Updated", coupon});
    }
    catch(err){
        console.log(err);
        res.status(500).json({message: "Server Error"});
    }
}

exports.deleteCoupon = async (req,res) =>{
    try{
        await Coupon.findByIdAndDelete(req.params.id);
        res.json({success: true, message: "Coupon Deleted"});
    }
    catch(err){
        console.log(err);
        res.status(500).json({message: "Server Error"});
    }
}