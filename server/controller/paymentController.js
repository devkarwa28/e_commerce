const razorpay = require("../config/razorpay");
const crypto = require("crypto");

exports.createOrder = async (req,res) =>{
    try{
        const {amount} = req.body;
        const order = await razorpay.orders.create({
            amount: amount * 100,
            currency: "INR",
            receipt: "order_" + Date.now()
        })
        res.json(order);
    }
    catch(err){
        console.log(err);
        res.status(500).json({message:"Internal Server Error"});
    }
}

exports.verifyPayment = async (req,res) =>{
    const {razorpay_order_id, razorpay_payment_id, razorpay_signature} = req.body;
    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expected = crypto.createHmac("sha256",process.env.RAZORPAY_KEY_SECRET).update(body).digest("hex");

    if(expected === razorpay_signature)
    {
        res.json({message:"Payment Verified"});
    }
    else{
        res.status(400).json({message:"Payment Verification Failed"});
    }
    
}