const axios = require("axios");
const User = require("../models/UserModel");
const tokenGen = require("./tokenGen");

exports.sendOTP = async (req, res) => {
  try {
    const { phone } = req.body;
    if (!phone) {
      return res.status(400).json({ message: "Phone Number Not Found" });
    }
    const response = await axios.get(
      `https://api.msg91.com/api/v5/otp?authkey=${process.env.MSG91_AUTH_KEY}&mobile=91${phone}&otp_length=6`
    );
    console.log("MSG91 RESPONSE:", response.data); 
    res.json({message: "OTP Sent Successfully"})
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.verifyOTP = async (req,res) =>{
    try{
        const {phone,otp} = req.body;
        if(!phone || !otp)
        {
            return res.status(400).json({message:"Phone Number & OTP Required"})
        }
        const response = await axios.get(`https://api.msg91.com/api/v5/otp/verify?authkey=${process.env.MSG91_AUTH_KEY}&mobile=91${phone}&otp=${otp}`);
        if(response.data.type === "success")
        {
            let user = await User.findOne({phone});
            if(!user)
            {
                user = await User.create({phone});
            }
            tokenGen(res,user._id);
            res.json({message: "Login Success"});
        }
        else{
            return res.status(400).json({message: "Invalid OTP"});
        }
    }
    catch(err){
        console.log(err);
        res.status(500).json({message: "Server Error"});
    }
}