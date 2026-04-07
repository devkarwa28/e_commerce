const nodemailer = require("nodemailer");
const trasnporter = nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:process.env.EMAIL_USER,
        pass:process.env.EMAIL_PASS
    }
});

const sendEmail = async ({to, subject, html}) =>{
     try{
        const info = await trasnporter.sendMail({
            from: `"Nutrivia" <${process.env.EMAIL_USER}>`,
            to,
            subject,
            html,
        })
        console.log("Email sent:", info.messageId);
     }
     catch(err){
        console.error("Email Error")
     }
}

module.exports = sendEmail
