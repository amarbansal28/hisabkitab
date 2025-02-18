const logger = require("../utils/logger");

async function sendSMS(to, body) {
  try {
    return "1";
  } catch (error) {
    logger.error("Error sending SMS:", error.message);
    throw error;
  }
}

module.exports = { sendSMS };
