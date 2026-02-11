let mongoose = require('mongoose');

let userSchema = new mongoose.Schema({
    uname:{
        type: String,
        required: true,
        trim: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
        lowecase: true,
        index: true,
    },
    password:{
        type: String,
        required: true,
        minlength: 6,
        select: false,
    },
    role:{
        type: String,
        enum: ["user","admin"],
        default: "user",
    }

})