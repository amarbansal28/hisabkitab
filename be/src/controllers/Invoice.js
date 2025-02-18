const Invoice = require("../models/Invoice");
const Customer = require("../models/Customer");

const getAllInvoices = async (req, res) => {
  try {
    const accountId = req.query.accountId;
    const invoices = await Invoice.find({ accountId });
    const customers = await Customer.find({ accountId });
    const obj = {};
    for (const cus of customers) {
      obj[cus._id] = cus.name;
    }
    const t = [];
    for (const inv of invoices) {
      t.push({
        customerName: obj[inv?.customerId],
        invoiceNumber: inv?.invoiceNumber,
        totalAmount: inv?.totalAmount,
        date: inv?.date,
      });
    }
    res.json(t);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const createInvoice = async (req, res) => {
  const { customerId, items, accountId, totalAmount } = req.body;
  try {
    const newInvoice = new Invoice({
      customerId,
      items,
      accountId,
      totalAmount,
    });
    const savedInvoice = await newInvoice.save();
    res.json(savedInvoice);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  getAllInvoices,
  createInvoice,
};
