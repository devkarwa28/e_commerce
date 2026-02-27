const Order = require('../models/orderModel');
const Product = require('../models/productModel');
const User = require('../models/UserModel');

exports.getDashboardStats = async (req,res) =>{
    try{
        const revenueData = await Order.aggregate([
            {$match: {paymentStatus: "Paid"}},
            {
                $group:{
                    _id: null,
                    totalRevenue: {$sum : "$totalAmount"}
                }
            }
        ])

        const totalRevenue = revenueData[0]?.totalRevenue || 0;

        const totalOrders = await Order.countDocuments();
        const totalUsers = await User.countDocuments();
        const totalProducts = await Product.countDocuments();

        res.json({totalRevenue,totalOrders,totalUsers,totalProducts});
    }
    catch(err){
        console.log(err)
        res.status(500).json({message: "Server Error"})
    }
}

exports.getMonthlySales = async (req,res) =>{
    try{
        const sales = await Order.aggregate([
            {$match : {paymentStatus: "Paid"}},
            {
                $group:{
                    _id:{$month: "$createdAt"},
                    total:{$sum: "$totalAmount"}
                }
            },
            {$sort : {"_id" : 1}}
        ])

        res.json(sales);
    }
    catch(err){
        console.log(err)
        res.status(500).json({message: "Server Error"})
    }
}

exports.getTopSellingProduct = async (req,res) =>{
    try{
        const topProducts = await Order.aggregate([
            {$unwind: "$items"},
            {$group:{_id:"$items.product",totalSold: {$sum: "$items.quantity"},pname: {$first: "$items.pname"}}
            },
            {$sort: {totalSold: -1}},{$limit: 5}
        ])
        res.json(topProducts)
    }
    catch(err){
        console.log(err)
        res.status(500).json({message: "Server Error"})
    }
}