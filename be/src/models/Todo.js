const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  completed: { type: Boolean, default: false },
  date: { type: String, default: new Date().getTime() },
  accountId: { type: mongoose.Schema.Types.ObjectId, ref: "Account" },
});

const Todo = mongoose.model("Todo", todoSchema);

module.exports = Todo;
