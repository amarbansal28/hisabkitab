const twilio = require("twilio");

const logger = require("../utils/logger");
const client = twilio(ACcountSid, authToken);

async function sendSMS(to, body) {
  // try {
  //   const message = await client.messages.create({
  //     body,
  //     from: twilioPhoneNumber,
  //     to,
  //   });
  //   logger.info("SMS sent successfully:", message.sid);
  //   return message.sid;
  // } catch (error) {
  //   logger.error("Error sending SMS:", error.message);
  //   throw error;
  // }
}

module.exports = { sendSMS };
