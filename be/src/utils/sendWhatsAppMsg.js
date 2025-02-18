const logger = require("./logger");

async function sendWhatsAppMsg(to, body) {
  try {
    return "1";
  } catch (error) {
    logger.error("Error sending SMS:", error.message);
    throw error;
  }
}

module.exports = { sendWhatsAppMsg };
