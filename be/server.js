const { GrowthBook } = require("@growthbook/growthbook");

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const transactionController = require("./src/controllers/Transaction");
const accountController = require("./src/controllers/Account");
const customerController = require("./src/controllers/Customer");
const ledgerController = require("./src/controllers/Ledger");
const expenseController = require("./src/controllers/Expense");
const todoController = require("./src/controllers/Todo");
const inventoryController = require("./src/controllers/Inventory");
const investmentController = require("./src/controllers/Investment");
const invoiceController = require("./src/controllers/Invoice");
const loginController = require("./src/controllers/Login");
const shortenURLController = require("./src/controllers/ShortenURL");
const logger = require("./src/utils/logger");
const app = express();
const PORT = 3001;
const cors = require("cors");
const Flagsmith = require("flagsmith-nodejs");

flagsmith.init({
  environmentID: "<Flagsmith Environment API Key>",
  cache: {
    has: (key) =>
      new Promise((resolve, reject) => {
        redisClient.exists(key, (err, reply) => {
          console.log("check " + key + " from cache", err, reply);
          resolve(reply === 1);
        });
      }),
    get: (key) =>
      new Promise((resolve) => {
        redisClient.get(key, (err, cacheValue) => {
          console.log("get " + key + " from cache");
          resolve(cacheValue && JSON.parse(cacheValue));
        });
      }),
    set: (key, value) =>
      new Promise((resolve) => {
        redisClient.set(key, JSON.stringify(value), "EX", 60, (err, reply) => {
          console.log("set " + key + " to cache", err);
          resolve();
        });
      }),
  },
});

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use((req, res, next) => {
  logger.info(`${req.method} ${req.url}`);
  next();
});

app.use(cors(corsOptions));

mongoose.connect("mongodb://localhost:27017/transactionsDB");

app.use(bodyParser.json());

app.post("/login", loginController.loginUser);

app.post("/account", accountController.createAccount);
app.get("/accounts", accountController.getAllAccounts);

app.post("/customer", customerController.createCustomer);
app.post("/customers", customerController.getAllCustomers);

app.post("/transactions", transactionController.createTransaction);
app.get("/transactions", transactionController.getAllTransactions);

app.get("/ledgers", ledgerController.getTransactionsByType);
app.get(
  "/ledgers/account-balance-specific-receiver",
  ledgerController.getAccountBalance
);
app.get("/ledgers/account-balance", ledgerController.getBalancesForAccount);

app.post("/expenses", expenseController.addExpense);
app.get("/expenses", expenseController.getExpenseByAccountId);
app.get(
  "/expenses/category-wise",
  expenseController.getExpenseByAccountIdCategoryWise
);

app.get("/todos", todoController.getAllTodosbyAccountId);
app.post("/todos", todoController.addTodo);

app.get("/inventory", inventoryController.getAllProducts);
app.post("/inventory", inventoryController.addProduct);

app.get("/investments", investmentController.getAllInvestments);
app.post("/investments", investmentController.addInvestment);

app.get("/invoices", invoiceController.getAllInvoices);
app.post("/invoices", invoiceController.createInvoice);

app.post("/shorten-url", shortenURLController.createShortURL);

app.listen(PORT, () => {
  logger.info(`Server is running on http://localhost:${PORT}`);
});
