const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  description: { type: String, required: true },
  amount: { type: Number, required: true },
  date: { type: String, default: new Date().getTime() },
  accountId: { type: mongoose.Schema.Types.ObjectId, ref: "Account" },
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: "Customer" },
  type: { type: String, enum: ["pay", "receive"], required: true },
});

const Transaction = mongoose.model("Transaction", transactionSchema);

module.exports = Transaction;
