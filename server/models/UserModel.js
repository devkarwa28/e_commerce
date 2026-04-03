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
        lowercase: true,
        index: true,
    },
    password: {
        type: String,
        required: function () {
            return !this.googleId; // Password is required only if not using Google OAuth
        },
        minlength: 6,
        select: false,
    },
    googleId: {
        type: String,
        unique: true,
        sparse: true,
    },
    avatar: {
        type: String,
    },
    provider: {
        type: String,
        enum: ["local", "google"],
        default: "local",
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user",
    },
    isBlocked: {
        type: Boolean,
        default: false,
    }

}, { timestamps: true })

module.exports = mongoose.model("User",userSchema);