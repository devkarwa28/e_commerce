const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
    product:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Product",
        required: true,
    },
    pname:{
        type: String,
        required: true,
    },
    mainImage:{
        type: String,
    },
    weightLabel:{
        type: String,
        required: true,
    },
    price:{
        type: String,
        required: true,
    },
    quantity:{
        type: Number,
        required: true,
    },

},{_id: false});

const orderSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    items:[orderItemSchema],

    shippingAddress:{
        fullname:String,
        phone: String,
        address: String,
        city: String,
        state: String,
        pincode: String,
        country: String,
    },
    paymentMethod:{
        type: String,
        default: "COD",
    },
    paymentStatus:{
        type: String,
        enum: ["Pending","Paid","Failed"],
        default: "Pending",
    },
    orderStatus:{
        type: String,
        enum: ["Processing","Shipped","Delivered","Cancelled"],
        default: "Processing",
    },
    totalAmount:{
        type: Number,
        required: true,
    },
    isPaid:{
        type: Boolean,
        default: false,
    },
    paitAt:{
        type: Date,
        deliveredAt:Date,
    },
    couponCode:{
        type: String,
    },
    discountAmount:{
        type: Number,
        default: 0,
    },
    finalAmount:{
        type: Number,
        required: true,
    },

},{timestamps: true})

module.exports = mongoose.model("Order",orderSchema);