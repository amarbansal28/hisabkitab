const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema({
  name: { type: String, required: true },
  mobile: { type: String, unique: true, required: true },
  OTP: { type: String, default: "1234" },
});

const Account = mongoose.model("Account", accountSchema);

module.exports = Account;
