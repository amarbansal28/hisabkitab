const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
  accountId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Account",
    required: true,
  },
  name: { type: String, required: true },
  mobile: { type: String, required: true, unique: true },
});

const Customer = mongoose.model("Customer", customerSchema);

module.exports = Customer;
