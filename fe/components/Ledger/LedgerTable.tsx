"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

const LedgerTable = () => {
  const [transactions, setTransactions] = useState([]);
  const [balance, setBalance] = useState(0);
  const [customerList, setCustomerList] = useState([]);
  const [customerId, setCustomerId] = useState("");
  const [accounts, setAccounts] = useState([]);
  const [accountId, setAccountId] = useState("");
  useEffect(() => {
    const fetchAccount = async () => {
      try {
        const response = await axios.get("http://localhost:3001/accounts");
        setAccounts(response.data);
      } catch (error: any) {
        console.error("Error fetching accounts data:", error.message);
      }
    };
    fetchAccount();
  }, []);
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        setCustomerList([]);
        setTransactions([]);
        if (accountId) {
          const response = await axios.post("http://localhost:3001/customers", {
            accountId,
          });
          setCustomerList(response.data);
        }
      } catch (error: any) {
        console.error("Error fetching customer data:", error.message);
      }
    };
    fetchCustomers();
  }, [accountId]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setTransactions([]);
        setBalance(0);
        if (customerId) {
          const response = await axios.get(
            `http://localhost:3001/ledgers?customerId=${customerId}&accountId=${accountId}`
          );
          setTransactions(response.data);
          let val = 0;
          for (const d of response.data) {
            if (d.type === "pay") {
              val -= d.amount;
            } else {
              val += d.amount;
            }
          }
          setBalance(val);
        }
      } catch (error: any) {
        console.error("Error fetching eldger data:", error.message);
      }
    };
    fetchData();
  }, [customerId]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-screen-md w-full">
        <h1 className="text-2xl font-bold mb-4 flex justify-between items-center">
          Customer Ledger
          <span className="ml-auto">Balance ({balance}/-)</span>
        </h1>
        <div className="mb-4">
          <label
            htmlFor="accountId"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Select Account
          </label>
          <select
            name="accountId"
            value={accountId}
            onChange={(e: any) => setAccountId(e.target.value)}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"`}
          >
            <option></option>
            {accounts?.map((acc: any) => {
              return (
                <option key={acc._id} value={acc._id}>
                  {acc.name}
                </option>
              );
            })}
          </select>
        </div>
        <div className="mb-4">
          <label
            htmlFor="customerId"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Select Customer
          </label>
          <select
            id="customerId"
            name="customerId"
            value={customerId}
            onChange={(e) => setCustomerId(e.target.value)}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"`}
          >
            <option></option>
            {customerList?.map((led: any) => {
              return (
                <option key={led._id} value={led._id}>
                  {led.name}
                </option>
              );
            })}
          </select>
        </div>
        <table className="min-w-full border border-gray-300">
          <thead>
            <tr>
              <th className="py-2 px-4 bg-gray-100 border-b">Date</th>
              <th className="py-2 px-4 bg-gray-100 border-b">Description</th>
              <th className="py-2 px-4 bg-gray-100 border-b">Type</th>
              <th className="py-2 px-4 bg-gray-100 border-b">Amount</th>
            </tr>
          </thead>
          <tbody>
            {transactions?.length > 0 ? (
              <>
                {transactions.map((transaction: any) => (
                  <tr key={transaction._id}>
                    <td className="py-2 px-4 border-b">{transaction.date}</td>
                    <td className="py-2 px-4 border-b">
                      {transaction.description}
                    </td>
                    <td className="py-2 px-4 border-b">{transaction.type}</td>
                    <td className="py-2 px-4 border-b">{transaction.amount}</td>
                  </tr>
                ))}
              </>
            ) : (
              <tr>
                <td className="py-2 px-4 border-b">No Data Found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LedgerTable;
