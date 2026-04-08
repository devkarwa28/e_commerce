const sendpulse = require("sendpulse-api");

const API_USER_ID = process.env.PULSE_CLIENT_ID;
const API_SECRET = process.env.PULSE_KEY;

const TOKEN_STORAGE = "/tmp/";

const sendEmail = ({ to, subject, html }) => {
  return new Promise((resolve, reject) => {
    sendpulse.init(API_USER_ID, API_SECRET, TOKEN_STORAGE, () => {

      const email = {
        html: html,
        text: "Order confirmation",
        subject: subject,
        from: {
          name: "Nutrivia",
          email: "hardyadverts@gmail.com",
        },
        to: [
          {
            name: "User",
            email: to,
          },
        ],
      };

      sendpulse.smtpSendMail((data) => {
        console.log("✅ Email sent:", data);
        resolve(data);
      }, email);

    });
  });
};

module.exports = sendEmail;