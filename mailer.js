const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  secure: false,

  auth: {
    user: process.env.BREVO_SMTP_LOGIN,
    pass: process.env.BREVO_SMTP_KEY
  },

  // 🔥 RENDER FREE TIER SAFE CONFIG
  pool: true,
  maxConnections: 1,
  maxMessages: 5,
  connectionTimeout: 120000, // 2 min
  greetingTimeout: 60000,
  socketTimeout: 120000
});

module.exports = transporter;
