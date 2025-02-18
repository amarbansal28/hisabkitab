const logger = require("../utils/logger");
const Transaction = require("../models/Transaction");

exports.getTransactionsByType = async (req, res) => {
  try {
    logger.warn(`getTransactionsByType`);
    const { customerId, accountId } = req.query;
    const transactions = await Transaction.find({ customerId, accountId });
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getAccountBalance = async (req, res) => {
  try {
    logger.warn(`getAccountBalance`);
    const { accountId, customerId } = req.query;
    const transactions = await Transaction.find({ accountId, customerId });
    let amount = 0;
    for (const entry of transactions) {
      if (entry.type === "pay") {
        amount -= entry.amount;
      } else {
        amount += entry.amount;
      }
      logger.info(`entry ${entry}`);
    }
    res.json(amount);
  } catch (error) {
    logger.error(`Error retrieving transactions by type: ${error}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getBalancesForAccount = async (req, res) => {
  try {
    logger.warn(`getBalancesForAccount`);
    const { accountId, customerId } = req.query;
    const transactions = await Transaction.find({ accountId, customerId });
    const accounts = {};
    for (const entry of transactions) {
      if (entry.customerId in accounts) {
        if (entry.type === "pay") {
          accounts[entry.customerId] -= entry.amount;
        } else {
          accounts[entry.customerId] += entry.amount;
        }
      } else {
        accounts[entry.customerId] = 0;
        if (entry.type === "pay") {
          accounts[entry.customerId] -= entry.amount;
        } else {
          accounts[entry.customerId] += entry.amount;
        }
      }
    }
    res.json(accounts);
  } catch (error) {
    logger.error(`Error retrieving transactions by type: ${error}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
