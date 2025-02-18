const twilio = require("twilio");

const logger = require("./logger");
const client = twilio(ACcountSid, authToken);

async function sendWhatsAppMsg(to, body) {
  // try {
  //   const message = await client.messages.create({
  //     body,
  //     from: "whatsapp:+14155238886",
  //     to: `whatsapp:+919897241649`,
  //   });
  //   return message.sid;
  // } catch (error) {
  //   logger.error("Error sending SMS:", error.message);
  //   throw error;
  // }
}

module.exports = { sendWhatsAppMsg };
