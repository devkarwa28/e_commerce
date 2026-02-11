const jwt =  require('jsonwebtoken')
const User = require("../models/UserModel")

exports.authMiddleware = async (req,res,next) =>{
    try{
        const token = req.cookies.token;

        if(!token)
        {
            return res.status(401).json({message: "Not Authorized"})
        }
        const decoded = jwt.verify(token,"devkarwa@2004");

        req.user= await User.findById(decoded.id).select("-password");

        next();
    }
    catch(err){
        res.status(401).json({message: "Not Authorized"})
    }
}

exports.AdminOnly = (req,res,next) => {
    if(req.user && req.user.role === "admin")
    {
        next()
    }
    else{
        res.status(403).json({message: "Admin Access Only"});
    }
}