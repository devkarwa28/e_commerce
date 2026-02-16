const mongoose = require('mongoose');

const couponSchema = new mongoose.Schema({
    code:{
        type: String,
        required: true,
        unique: true,
        trim: true,
        uppercase: true,
    },
    discountType:{
        type: String,
        enum: ["percentage","fixed"],
        required: true,
    },
    discountValue:{
        type: Number,
        required: true
    },
    minOrderAmount:{
        type: Number,
        default: 0,
    },
    maxDiscount:{
        type: Number,
    },
    usageLimit:{
        type: Number,
        default: 0,
    },
    usedCount:{
        type: Number,
        default: 0,
    },
    expiresAt:{
        type: Date
    },
    isActive:{
        type: Boolean,
        default: true,
    },
    usedBy : [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user"
        }
    ]
},{timestamps: true})

module.exports = mongoose.model("Coupon",couponSchema);