const config = require('./config')
const nodemailer = require("nodemailer");

const transport = nodemailer.createTransport({
  host: config.HOST,
  service: config.SERVICE,
  auth: {
    user: config.USER,
    pass: config.PASS
  }
});

const sendEmail = async (email, subject, body) => {
  console.log("user", config.USER, config.HOST)
  try {
    const info = await transport.sendMail({
      from: config.USER,
      to: email,
      subject: subject,
      html: body,
    });
    
    console.log("success!", info.messageId);
  } catch (error) {
    console.log("email not sent!");
    console.log(error);
    return error;
  }
};

module.exports = sendEmail;
