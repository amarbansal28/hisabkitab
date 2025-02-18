const Investment = require("../models/Investment");

const getAllInvestments = async (req, res) => {
  try {
    const accountId = req.query.accountId;
    const investments = await Investment.find({ accountId });
    res.json(investments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const addInvestment = async (req, res) => {
  const {
    name,
    amount,
    startDate,
    maturityDate,
    maturityAmount,
    term,
    accountId,
  } = req.body;
  try {
    const newInvestment = new Investment({
      name,
      amount,
      startDate,
      maturityDate,
      maturityAmount,
      term,
      accountId,
    });
    const savedInvestment = await newInvestment.save();
    res.json(savedInvestment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  getAllInvestments,
  addInvestment,
};
