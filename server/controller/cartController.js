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

exports.updateCartItem = async (req,res) =>{
    try{
        const {productId,weightLabel,quantity} = req.body;

        if(!productId || !weightLabel || quantity == null)
        {
            return res.status(400).json({message: "Product,weight &  quantity required"})
        }

        if(quantity < 1)
        {
            return res.status(400).json({message: "quantity must me minimum 1"})
        }

        const cart = await Cart.findOne({user: req.user._id});

        if(!cart)
        {
            return res.status(404).json({message: "Cart Not Found"});
        }

        const item = cart.items.find(item => item.product.toString() === productId && item.weightLabel === weightLabel);

        if(!item)
        {
            return res.status(404).json({message: "Item not found in cart"})
        }

        const product = await Product.findById(productId);

        const selectedOption = product.weightOptions.find(opt => opt.label === weightLabel);

        if(!selectedOption)
        {
            return res.status(400).json({message: "invalid Weight option"})
        }

        if(selectedOption.stock < quantity)
        {
            return res.status(400).json({message: "Not in enough Stock"})
        }

        item.quantity = Number(quantity);

        cart.totalAmount = cart.items.reduce((acc,item)=> acc + item.price * item.quantity,0);

        await cart.save();

        res.json({
            sucess: true,
            message: "Cart Updated Successfully",
            cart
        });
    }
    catch(err){
        console.log(err)
        res.status(500).json({message: "Server Error"})
    }
}

exports.removeCartItem = async (req,res) =>{
    try{
        const {productId,weightLabel} = req.body;

        const cart = await Cart.findOne({user: req.user._id});

        if(!cart)
        {
            return res.status(404).json({message: "cart Not found"})
        }
        cart.items = cart.items.filter(
            item => !(item.product.toString() === productId && item.weightLabel === weightLabel)
        );

        cart.totalAmount = cart.items.reduce((acc,item)=> acc + item.price * item.quantity,0);

        await cart.save();
        res.json({
            success: true,
            message: "item removed from cart",
            cart
        });
    }
    catch(err){
        res.status(500).json({message: "Server Error"})
    }
}

exports.clearCart = async (req,res) =>{
    try{
        const cart = await Cart.findOne({user: req.user._id});

        if(!cart)
        {
            return res.json({message: "Cart Is Empty"})
        }
        cart.items = [];
        cart.totalAmount = 0;

        await cart.save();

        res.json({sucess: true,message: "Cart Cleared"});
    }
    catch(err){
        res.status(500).json({message: "Server Error"});
    }
}