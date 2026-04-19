const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
    },
    pname: {
        type: String,
        required: true,
    },
    mainImage: {
        type: String,
    },
    weightLabel: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
}, { _id: false });


const shippingAddressSchema = new mongoose.Schema({
    fullName: {          
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    street: {            
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    pincode: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        default: "India",
    },
    landmark: {          
        type: String,
    },
}, { _id: false });


const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    items: [orderItemSchema],

    shippingAddress: shippingAddressSchema,

    paymentMethod: {
        type: String,
        enum: ["COD", "Online"],   
        default: "COD",
    },
    paymentStatus: {
        type: String,
        enum: ["Pending", "Paid", "Failed"],
        default: "Pending",
    },
    paymentId: {                     
        type: String,
        default: null,
    },
    orderStatus: {
        type: String,
        enum: ["Pending","Processing", "Shipped", "Delivered", "Cancelled"],
        default: "Pending",          
    },
    totalAmount: {
        type: Number,
        required: true,
    },
    discountAmount: {
        type: Number,
        default: 0,
    },
    finalAmount: {
        type: Number,
        required: true,
    },
    couponCode: {
        type: String,
        default: null,
    },
    isPaid: {
        type: Boolean,
        default: false,
    },
    paidAt: {
        type: Date,
        default: null,
    },
    deliveredAt: {
        type: Date,
        default: null,
    },
}, { timestamps: true });


module.exports = mongoose.model("Order", orderSchema);