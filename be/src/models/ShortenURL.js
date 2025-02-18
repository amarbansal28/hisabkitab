const mongoose = require("mongoose");

const shortenURLSchema = new mongoose.Schema({
  longURL: { type: String, required: true },
  date: { type: String, default: new Date().getTime() },
  shortURL: { type: String, unique: true, required: true },
  // accountId: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "Account",
  //   required: true,
  // },
});

const ShortenURL = mongoose.model("ShortenURL", shortenURLSchema);

module.exports = ShortenURL;
