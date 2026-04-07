const SibApiV3Sdk = require("sib-api-v3-sdk");

const client = SibApiV3Sdk.ApiClient.instance;

const apiKey = client.authentications['api-key'];

apiKey.apiKey = process.env.BREVO_API_KEY;

const emailApi = new SibApiV3Sdk.TransactionalEmailsApi();

const sendEmail = async ({to, subject, html}) =>{
    try{
        await emailApi.sendTransacEmail({
            sender:{
                email:"hardyadverts@gmail.com",
                name:"Dev Karwa"
            },
            to:[
                {email: to}
            ],
            subject: subject,
            htmlContent: html
        })
        console.log("Email sent successfully")
    }
    catch(err){
        console.log(err)
    }
}

module.exports = sendEmail
