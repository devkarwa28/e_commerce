const mongoose = require('mongoose');
const Order = require('../models/orderModel');
const Product = require('../models/productModel');
const Cart = require('../models/cartModel');
const Coupon = require('../models/couponModel');
const User = require('../models/UserModel');
const sendEmail = require('../utilites/sendEmail');


exports.placeOrder = async (req, res) => {
    try {
        const { shippingAddress, paymentMethod, couponCode, paymentStatus, paymentId } = req.body;

        if (!shippingAddress) {
            return res.status(400).json({ message: "Shipping address required" });
        }

        const cart = await Cart.findOne({ user: req.user._id }).populate("items.product");

        if (!cart || cart.items.length === 0) {
            return res.status(400).json({ message: "No Items in Cart" });
        }

        for (const item of cart.items) {
            const product = await Product.findById(item.product._id);

            const selectedOption = product.weightOptions.find(opt => opt.label === item.weightLabel);

            if (!selectedOption || selectedOption.stock < item.quantity) {
                return res.status(400).json({ message: "Stock is not available" })
            }
        }

        const orderItems = cart.items.map(item => ({
            product: item.product._id,
            pname: item.product.pname,
            mainImage: item.product.mainImage,
            weightLabel: item.weightLabel,
            price: item.price,
            quantity: item.quantity,

        }))
        let discount = 0;
        let finalAmount = cart.totalAmount;

        if (couponCode) {
            const coupon = await Coupon.findOne({ code: couponCode.toUpperCase() });

            if (!coupon || !coupon.isActive) {
                return res.status(400).json({ message: "Invalid Coupon" })
            }
            if (coupon.expiresAt && coupon.expiresAt < new Date()) {
                return res.status(400).json({ message: "Coupon Expired" })
            }
            if (coupon.usageLimit > 0 && coupon.usedCount >= coupon.usageLimit) {
                return res.status(400).json({ message: "Coupon usage limit used" })
            }
            if (coupon.usedBy.includes(req.user._id)) {
                return res.status(400).json({ message: "coupon in use" })
            }
            if (cart.totalAmount < coupon.minOrderAmount) {
                return res.status(400).json({ message: "minimum order amout required" })
            }
            if (coupon.discountType === "percentage") {
                discount = (cart.totalAmount * coupon.discountValue) / 100;
                if (coupon.maxDiscount) {
                    discount = Math.min(discount, coupon.maxDiscount);
                }
            }
            else {
                discount = coupon.discountValue;
            }
            finalAmount = cart.totalAmount - discount;
            coupon.usedCount += 1;
            coupon.usedBy.push(req.user._id);
            await coupon.save();
        }
        const order = await Order.create({
            user: req.user._id,
            items: orderItems,
            shippingAddress,
            paymentMethod,
            totalAmount: cart.totalAmount,
            discountAmount: discount,
            finalAmount,
            couponCode: couponCode || null,
            paymentStatus: paymentStatus || "Pending",
            isPaid: paymentStatus === "Paid",
            paitAt: paymentStatus === "Paid" ? new Date() : null,
        });
        if (paymentStatus === "Paid" || paymentMethod === "COD") {
            sendEmail({
                to: req.user.email,
                subject: "Order Confirmed 🎉",
                html: `
        <div style="font-family: Arial;">
            <h2 style="color:#5c4033;">Nutrivia Order Confirmation</h2>
            <p>Hello ${req.user.name},</p>

            <p>Your order has been placed successfully 🎉</p>

            <h3>Order Details:</h3>
            <p><strong>Order ID:</strong> ${order._id}</p>
            <p><strong>Total:</strong> ₹${order.finalAmount}</p>

            <p>We’ll deliver your order soon 🚚</p>

            <hr/>
            <p>Thank you for shopping with us ❤️</p>
        </div>
    `,
            });
        }
        for (const item of cart.items) {
            const product = await Product.findById(item.product._id)

            const option = product.weightOptions.find(opt => opt.label === item.weightLabel);

            option.stock -= item.quantity;

            await product.save();
        }

        cart.items = [];
        cart.totalAmount = 0;
        await cart.save();

        res.status(201).json({ success: true, message: "Order placed Successfully", order });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server Error" });
    }
}

exports.getMyOrder = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
        res.json({ orders });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server Error" })
    }
}
exports.getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) {
            return res.status(404).json({ message: "Order Not Found" })
        }
        if (order.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "Not Authorized" });
        }
        res.json({ order });
    }
    catch (err) {
        console.error("Error in getOrderById:", err);
        res.status(500).json({ message: "Server Error" })
    }
}
exports.getAllOrders = async (req, res) => {
    try {
        let { page = 1, limit = 10, search = "", status = "", paymentStatus = "" } = req.query;
        page = isNaN(Number(page)) ? 1 : Number(page);
        limit = isNaN(Number(limit)) ? 10 : Number(limit);
        const skip = (page - 1) * limit;

        let query = {};


        if (status) {
            query.orderStatus = status;
        }
        if (paymentStatus) {
            query.paymentStatus = paymentStatus;
        }


        if (search && search.trim() !== "") {
            const querySearch = search.trim();
            const isObjectId = mongoose.Types.ObjectId.isValid(querySearch);

            if (isObjectId) {
                query._id = querySearch;
            } else {

                const users = await User.find({
                    $or: [
                        { uname: { $regex: querySearch, $options: 'i' } },
                        { email: { $regex: querySearch, $options: 'i' } }
                    ]
                }).select('_id');

                const userIds = users.map(u => u._id);

                if (userIds.length === 0) {
                    return res.json({
                        orders: [],
                        page: Number(page),
                        totalPages: 0,
                        totalOrders: 0
                    });
                }
                query.user = { $in: userIds };
            }
        }
        const totalOrders = await Order.countDocuments(query);

        const orders = await Order.find(query)
            .populate("user", "uname email")
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(Number(limit));

        res.json({
            orders,
            page: Number(page),
            totalPages: Math.ceil(totalOrders / Number(limit)),
            totalOrders
        });
    }
    catch (err) {
        console.error("Error in getAllOrders:", err);
        res.status(500).json({ message: "Server Error", error: err.message })
    }
}

exports.updateOrderStatus = async (req, res) => {
    try {
        const { orderStatus, paymentStatus } = req.body;

        const order = await Order.findById(req.params.id)

        if (!order) {
            return res.status(400).json({ message: "no order finded" })
        }

        if (orderStatus) {
            order.orderStatus = orderStatus;
            if (orderStatus === "Delivered") {
                order.deliveredAt = new Date();
            }
        }

        if (paymentStatus) {
            order.paymentStatus = paymentStatus

            if (paymentStatus === "Paid") {
                order.isPaid = true;
                order.paitAt = new Date();
            }
        }

        await order.save();

        res.json({
            success: true,
            message: "Order Updated Successfully",
            order
        })

    }
    catch (err) {
        console.log(err)
        res.status(500).json({ message: "Server Error" })
    }
}