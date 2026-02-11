let mongoose = require('mongoose')

let CategorySchema = new mongoose.Schema({
    cname:{
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    slug:{
        type: String,
        required: true,
        unique: true,
        index: true,
    },
    image:{
        type: String,
    },
    isActive: {
        type: Boolean,
        default: true,
    }
},{timestamps: true});

module.exports = mongoose.model("Category",CategorySchema);