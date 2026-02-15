const Order = require('../models/orderModel');
const Product = require('../models/productModel');
const Cart = require('../models/cartModel');

exports.placeOrder = async (req,res) =>{
    try{
        const {shippingAddress,paymentMethod} = req.body;

        if(!shippingAddress)
        {
            return res.status(400).json({message: "Shipping address required"});
        }

        const cart = await Cart.findOne({user: req.user._id}).populate("items.product");

        if(!cart || cart.items.length === 0)
        {
            return res.status(400).json({message: "No Items in Cart"});
        }

        for(const item of cart.items)
        {
            const product = await Product.findById(item.product._id);

            const selectedOption = product.weightOptions.find(opt => opt.label === item.weightLabel);

            if(!selectedOption || selectedOption.stock < item.quantity)
            {
                return res.status(400).json({message: "Stock is not available"})
            }
        }

        const  orderItems = cart.items.map(item => ({
            product: item.product._id,
            pname: item.product.pname,
            mainImage: item.product.mainImage,
            weightLabel: item.weightLabel,
            price: item.price,
            quantity: item.quantity,

        }))

        const order = await Order.create({
            user: req.user._id,
            items: orderItems,
            shippingAddress,
            paymentMethod,
            totalAmount: cart.totalAmount,
        });

        for(const item of cart.items)
        {
            const product = await Product.findById(item.product._id)

            const option = product.weightOptions.find(opt => opt.label === item.weightLabel);

            option.stock -= item.quantity;

            await product.save();
        }

        cart.items = [];
        cart.totalAmount = 0;
        await cart.save();

        res.status(201).json({success: true, message: "Order placed Successfully", order});
    }
    catch(err){
        console.log(err);
        res.status(500).json({message: "Server Error"});
    }
}

exports.getMyOrder = async (req,res) =>{
    try{
        const orders = await Order.find({user: req.user._id}).sort({createdAt: -1});
        res.json(orders);
    }
    catch(err){
        console.log(err);
        res.status(500).json({message: "Server Error"})
    }
}