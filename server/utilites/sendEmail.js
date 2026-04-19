const SibApiV3Sdk = require("sib-api-v3-sdk");

const client = SibApiV3Sdk.ApiClient.instance;
const apiKey = client.authentications["api-key"];
apiKey.apiKey = process.env.BREVO_API_KEY;

const tranEmailApi = new SibApiV3Sdk.TransactionalEmailsApi();

const sendEmail = async ({ to, subject, html }) => {
  try {
    const response = await tranEmailApi.sendTransacEmail({
      sender: {
        name: "Nutrivia",
        email: "hardyadverts@gmail.com", // temporary OK
      },
      to: [
        {
          email: to,
          name: "User",
        },
      ],
      subject: subject,
      htmlContent: html,
    });

    console.log("✅ Email sent:", response);
    return response;

  } catch (error) {
    console.error("❌ Email failed:", error.response?.body || error);
    throw error;
  }
};

module.exports = sendEmail;