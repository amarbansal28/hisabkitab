const Account = require("../models/Account");
const logger = require("../utils/logger");

exports.loginUser = async (req, res) => {
  try {
    const { OTP, mobile } = req.body;
    const account = await Account.find({ mobile, OTP });
    logger.info(`Account loggedin: ${account}`);
    if (account?.length === 1) {
      res.status(201).json({ ok: true, data: account[0]?._id });
    } else {
      res.status(201).json({ ok: false, message: "User does not exists" });
    }
  } catch (error) {
    logger.error(`Error loggedin account: ${error}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
