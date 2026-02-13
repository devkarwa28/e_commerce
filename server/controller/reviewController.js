const Review = require('../models/reviewModel')
const Product = require('../models/productModel')

exports.addReview = async (req,res) =>{
    try{
        const {productId} = req.params;
        const {rating,comment} = req.body;

        if(!rating || !comment)
        {
            return res.status(400).json({message: "Rating & comment are required"})
        }
        const product = await Product.findById(productId)

        if(!product || !product.isActive)
        {
            return res.status(404).json({message: "No Product finded"})
        }

        const review = await Review.create({
            user: req.user._id,
            product: productId,
            rating,
            comment,
        });
        const reviews = await Review.find({product: productId});
        product.numReviews = reviews.length;
        product.ratings = reviews.reduce((acc,item)=> acc + item.rating,0)/ reviews.length;

        await product.save();

        res.status(201).json({success: true,message: "Review added Successfully",review});

    }
    catch(err){
         if (err.code === 11000) 
        {
           return res.status(400).json({message: "You already reviewed this product"});
        }
        res.status(500).json({message: "Server Error"})
    }
}

exports.getReviewsByProduct =  async (req,res) =>{
    try{
        const {productId} = req.params;

        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 5;
        const skip = (page-1)*limit;

        const totalReviews = await Review.countDocuments({product: productId});

        const reviews = await Review.find({product: productId}).populate("user","uname").sort({createdAt: -1}).skip(skip).limit(limit);

        res.json({reviews,page,totalPages: Math.ceil(totalReviews/limit),totalReviews});

    }
    catch(err){
        console.log(err);
        res.status(500).json({message: "Server Error"});
    }
}