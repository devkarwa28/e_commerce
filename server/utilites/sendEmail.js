const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
    host:"smtp-pulse.com",
    port:2525,
    secure:false,
    auth:{
        user:process.env.EMAIL_USER,
        pass:process.env.EMAIL_PASS
    }
});

const sendEmail = async ({to, subject, html}) =>{
     try{
        const info = await transporter.sendMail({
            from: `"Nutrivia" <${process.env.EMAIL_USER}>`,
            to,
            subject,
            html,
        })
        console.log("Email sent:", info.messageId);
     }
     catch(err){
        console.error("Email Error",err)
     }
}

module.exports = sendEmail
