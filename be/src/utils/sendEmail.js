const logger = require("./logger");
const nodemailer = require("nodemailer");

const sendEmail = async (message) => {
  logger.info("sendEmail");
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        account: "amarbansan28@gmail.com",
        pass: "kbul curg xsls waqs",
      },
    });
    const mailOptions = {
      to: "amarbansan28@gmail.com",
      from: "amarbansan28@gmail.com",
      subject: "New Transaction",
      text: message,
    };
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: ", info.messageId);
    return info;
  } catch (error) {
    console.error("Error sending email: ", error);
    throw error;
  }
};

module.exports = { sendEmail };
