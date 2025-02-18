const logger = require("../utils/logger");
const Inventory = require("../models/Inventory");

exports.getAllProducts = async (req, res) => {
  try {
    const accountId = req.query.accountId;
    const products = await Inventory.find({ accountId });
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.addProduct = async (req, res) => {
  const { name, quantity, price, accountId } = req.body;
  try {
    const newProduct = new Inventory({ name, quantity, price, accountId });
    const savedProduct = await newProduct.save();
    res.json(savedProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
