const mongoose = require("mongoose");

const investmentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  amount: { type: Number, required: true },
  term: { type: Number, required: true },
  date: { type: String, default: new Date().getTime() },
  startDate: { type: String, required: true },
  maturityDate: { type: String, required: true },
  maturityAmount: { type: String, required: true },
  accountId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Account",
    required: true,
  },
});

const Investment = mongoose.model("Investment", investmentSchema);

module.exports = Investment;
