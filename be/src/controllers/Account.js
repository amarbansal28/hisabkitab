const Account = require("../models/Account");
const logger = require("../utils/logger");
const fs = require("fs");
const xlsx = require("xlsx");

exports.createAccount = async (req, res) => {
  try {
    const { name, mobile } = req.body;
    const account = new Account({ name, mobile });
    await account.save();
    logger.info(`Account created: ${account}`);
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Max-Age", "1800");
    res.setHeader("Access-Control-Allow-Headers", "content-type");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "PUT, POST, GET, DELETE, PATCH, OPTIONS"
    );
    res.status(201).json(account);
  } catch (error) {
    logger.error(`Error creating account: ${error}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getAllAccounts = async (req, res) => {
  try {
    const accounts = await Account.find();
    res.json(accounts);
  } catch ([error]) {
    logger.error(`Error retrieving accounts: ${error}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.uploadAccounts = async (req, res) => {
  try {
    logger.info(`uploadAccounts`);
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Max-Age", "1800");
    res.setHeader("Access-Control-Allow-Headers", "content-type");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "PUT, POST, GET, DELETE, PATCH, OPTIONS"
    );
    const accountsData = await readAccountData(filePath, fileType);
    const m = await saveAccountsToDatabase(accountsData);
    res.json(m);
  } catch (error) {
    logger.error(`Error uploadAccounts accounts: ${error}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

async function readAccountData(filePath, fileType) {
  return new Promise((resolve, reject) => {
    const accountsData = [];
    const fileStream = fs.createReadStream(filePath);
    fileStream.on("error", (error) => {
      reject(error);
    });
    if (fileType === "excel") {
      const workbook = xlsx.readFile(filePath);
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const excelData = xlsx.utils.sheet_to_json(sheet, { header: 1 });
      for (let i = 1; i < excelData.length; i++) {
        const row = excelData[i];
        const account = {
          name: row[0],
          mobile: row[1],
        };
        accountsData.push(account);
      }
      resolve(accountsData);
    } else {
      reject(
        new Error('Invalid file type. Supported types are "csv" and "excel".')
      );
    }
  });
}

async function saveAccountsToDatabase(accountsData) {
  const promises = accountsData.map(async (accountData) => {
    const account = new Account(accountData);
    return account.save();
  });
  return Promise.all(promises);
}
