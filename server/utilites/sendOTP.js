const axios = require("axios");

exports.sendOTP = async (req, res) => {
  try {
    const { phone } = req.body;
    if (!phone) {
      return res.status(404).json({ message: "Phone Number Not Found" });
    }
    const response = await axios.get(
      `https://api.msg91.com/api/v5/otp?authkey=${process.env.MSG91_AUTH_KEY}&mobile=91${phone}`
    );
    res.json({message: "OTP Sent Successfully"})
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.verifyOTP = async (req,res) =>{
    
}