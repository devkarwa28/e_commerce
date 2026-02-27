const User = require('../models/UserModel');
const bcrypt = require('bcryptjs');
const tokenGenarator = require('../utilites/tokenGenarator');

exports.registerUser = async (req,res) =>{
    try{
        const {uname,email,password} = req.body;
        const userExist = await User.findOne({email});

        if(userExist)
        {
            return res.status(400).json({message: "User Is already exist"});
        }
        const salt = await bcrypt.genSalt(10);
        const passwordHased = await bcrypt.hash(password, salt);

        const user = await User.create({uname,email,password: passwordHased,});
        tokenGenarator(res, user._id);
        res.status(200).json({_id: user._id,
            uname: user.uname,
            email: user.email,
            role: user.role,
        });
    }
    catch(err){
        res.status(500).json({message: "Cannot register user"})
    }
};

exports.loginUser = async (req,res) =>{
    try{

        const{email,password} = req.body;
        const user = await User.findOne({email}).select("+password");

        if(!user)
        {
            return res.status(400).json({message: "Invalid User"})
        }
        if(user.isBlocked)
        {
            return res.status(403).json({message: "User Account is Blocked"})
        }
        const userMatch = await bcrypt.compare(password,user.password);
        if(!userMatch){
            return res.status(400).json({message: "Password is Not Valid"})
        }
        tokenGenarator(res, user._id);

        res.json({
            _id: user._id,
            uname: user.uname,
            email: user.email,
            role: user.role,
        });
    }
    catch(err){
        res.status(500).json({message: "Cant Login USER"})
    }
};

exports.userLogout = async (res,req) =>{
    res.cookie("token","",{httpOnly : true,expires: new Date(0)});
    
    res.status(200).json({message: "User Logout Successfully"});
};

exports.getCurrentUser = async (req,res) =>{
    const user = await User.findById(req.user._id);
    res.json(user);
};
