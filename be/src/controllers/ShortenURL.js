const ShortenURL = require("../models/ShortenURL.js");
const logger = require("../utils/logger");

exports.createShortURL = async (req, res) => {
  try {
    const { longURL } = req.body;
    if (!longURL) {
      return res
        .status(400)
        .json({ error: "Missing longURL in the request body" });
    }
    const shortURL = `${"http://localhost:3002"}/${longURL}`;
    const shortenURL = new ShortenURL({ longURL, shortURL });
    await shortenURL.save();
    res.status(201).json(shortenURL);
  } catch (error) {
    logger.error(`Error creating shortenurl: ${error}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getAllShortenURLs = async (req, res) => {
  try {
    const shortenURLs = await ShortenURL.find();
    logger.info(`Retrieved all shortenurl: ${shortenURLs}`);
    res.json(shortenURLs);
  } catch (error) {
    logger.error(`Error retrieving shortenurl: ${error}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
