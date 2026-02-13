const Cart = require('../models/cartModel');
const Product = require('../models/productModel');

exports.addToCart = async (req,res) =>{
    try{
        const {productId, weightLabel, quantity} = req.body;

        if(!productId || !weightLabel || !quantity)
        {
            return res.status(400).json({message: "Product, weigtht and quantity required"})
        }
        const product = await Product.findById(productId);

        if(!product || !product.isActive)
        {
            return res.status(404).json({message: "product not found"})
        }

        const selectedOption = product.weightOptions.find(opt => opt.label === weightLabel);

        if(!selectedOption)
        {
            return res.status(400).json({message: "Invalid Weight Option"})
        }

        if(selectedOption.stock < quantity)
        {
            return res.status(400).json({message: "Stock Not Available"})
        }
        let cart = await Cart.findOne({user: req.user._id});

        if(!cart)
        {
            cart = await Cart.create({user: req.user._id,items:[]})
        }

        const exisitingItem = cart.items.find(item => item.product.toString() === productId && item.weightLabel === weightLabel);

        if(exisitingItem){
            exisitingItem.quantity += Number(quantity);
        }
        else
        {
            cart.items.push({
                product: productId,
                weightLabel,
                price: selectedOption.price,
                quantity
            })
        }

        cart.totalAmount = cart.items.reduce((acc,item) => acc + item.price * item.quantity,0);

        await cart.save();

        res.json({
            success: true,
            message: "item added to cart",
            cart
        });
    }
    catch(err){
        console.log(err);
        res.status(500).json({message: "Server Error"})
    }
}

exports.getMyCart = async (req,res) =>{
    try{
        const cart = await Cart.findOne({user: req.user._id}).populate("items.product","pname mainImage")

        if(!cart)
        {
            return res.json({
                items: [],
                totalAmount: 0,
            })
        }
        res.json(cart);
    }
    catch(err){
        console.log(err);
        res.status(500).json({message: "Server Error"})
    }
}