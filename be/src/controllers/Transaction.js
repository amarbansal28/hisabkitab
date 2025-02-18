const logger = require("../utils/logger");
const Transaction = require("../models/Transaction");
const SendMail = require("../utils/sendEmail");
const { sendSMS } = require("../utils/sendSMS");
const { sendWhatsAppMsg } = require("../utils/sendWhatsAppMsg");
const Customer = require("../models/Customer");

exports.createTransaction = async (req, res) => {
  try {
    const { description, amount, type, accountId, customerId } = req.body;
    const transaction = new Transaction({
      description,
      amount,
      type,
      accountId,
      customerId,
    });
    await transaction.save();
    logger.info(`Transaction created: ${transaction}`);
    const message = `New transaction:\n\nDescription: ${transaction.description}\nAmount: ${transaction.amount}\nType: ${transaction.type}`;
    const toPhoneNumber = "+919897241649";
    const msgid = await sendSMS(toPhoneNumber, message);
    logger.info(`msgid created: ${msgid}`);
    const wid = await sendWhatsAppMsg(toPhoneNumber, message);
    logger.info(`wid created: ${wid}`);
    const eid = await SendMail.sendEmail(message);
    logger.info(`eid created: ${eid}`);
    res.status(201).json(transaction);
  } catch (error) {
    logger.error(`Error creating transaction: ${error}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getAllTransactions = async (req, res) => {
  try {
    const { accountId } = req.query;
    const transactions = await Transaction.find({ accountId });
    const customers = await Customer.find({ accountId });
    const obj = {};
    for (const cus of customers) {
      obj[cus._id] = cus.name;
    }
    const t = [];
    for (const trans of transactions) {
      t.push({
        customerName: obj[trans?.customerId],
        description: trans?.description,
        amount: trans?.amount,
        date: trans?.date,
        type: trans?.type,
      });
    }
    res.json(t);
  } catch (error) {
    logger.error(`Error retrieving transactions: ${error}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
