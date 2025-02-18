const Customer = require("../models/Customer");
const logger = require("../utils/logger");

exports.createCustomer = async (req, res) => {
  try {
    const { name, mobile, accountId } = req.body;
    const customer = new Customer({ name, mobile, accountId });
    await customer.save();
    res.status(201).json(customer);
  } catch (error) {
    logger.error(`Error creating customer: ${error}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getAllCustomers = async (req, res) => {
  try {
    const { accountId } = req.body;
    const customers = await Customer.find({ accountId });
    res.json(customers);
  } catch (error) {
    logger.error(`Error retrieving customers: ${error}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
