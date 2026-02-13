const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
        index: true,
    },
    product:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Prdoduct",
        required: true,
        index: true,
    },
    rating:{
        type: Number,
        required: true,
        min: 1,
        max: 5,
    },
    comment:{
        type: String,
        required: true,
    }
},{timestamps: true});

reviewSchema.index({user: 1, product: 1},{unique: true});

module.exports = mongoose.model("Review",reviewSchema);