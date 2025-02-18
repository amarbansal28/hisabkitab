const Expense = require("../models/Expense");
const logger = require("../utils/logger");

exports.addExpense = async (req, res) => {
  const { description, amount, category, accountId } = req.body;
  try {
    const newExpense = new Expense({
      description,
      amount,
      category,
      accountId,
    });
    const savedExpense = await newExpense.save();
    res.json(savedExpense);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.getExpenseByAccountId = async (req, res) => {
  try {
    const { accountId } = req.query;
    const expense = await Expense.find({
      accountId,
    });
    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }
    res.json(expense);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.getExpenseByAccountIdCategoryWise = async (req, res) => {
  try {
    const { accountId } = req.query;
    const expense = await Expense.find({
      accountId,
    });
    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }
    const exp = {};
    for (const key of expense) {
      if (key.category in exp) {
        exp[key.category] += key.amount;
      } else {
        exp[key.category] = key.amount;
      }
    }
    const arr = [];
    for (const key in exp) {
      arr.push({ category: key, amount: exp[key] });
    }
    res.json(arr);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
