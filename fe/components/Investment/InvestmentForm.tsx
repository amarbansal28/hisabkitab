"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

const InvestmentForm = () => {
  const [accountId, setAccountId] = useState("");
  const [newInvestment, setNewInvestment] = useState({
    name: "",
    amount: 0,
    maturityAmount: 0,
    term: 0,
    maturityDate: "",
    startDate: "",
    accountId: "",
  });
  const [errors, setErrors]: any = useState({});
  const [accounts, setAccounts] = useState([]);
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
  const validateForm = () => {
    const errors: any = {};
    if (!newInvestment.name) {
      errors.name = "Name is required";
    }
    if (!newInvestment.amount) {
      errors.amount = "Amount is required";
    }
    if (!newInvestment.maturityAmount) {
      errors.maturityAmount = "Maturity Date is required";
    }
    if (!newInvestment.term) {
      errors.term = "Term is required";
    }
    if (!newInvestment.startDate) {
      errors.startDate = "Start Date is required";
    }
    if (!newInvestment.maturityDate) {
      errors.maturityDate = "Maturity Date is required";
    }
    return errors;
  };

  const addInvestment = async () => {
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      try {
        setErrors({});
        await axios.post("http://localhost:3001/investments", newInvestment, {
          headers: { "content-type": "application/json" },
        });
        setNewInvestment({
          name: "",
          amount: 0,
          maturityAmount: 0,
          term: 0,
          maturityDate: "",
          startDate: "",
          accountId: "",
        });
      } catch (error: any) {
        console.error("Error saving Investment details:", error.message);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-md mx-auto mt-8">
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
            onChange={(e: any) => {
              setNewInvestment({
                ...newInvestment,
                accountId: e.target.value,
              });
              setAccountId(e.target.value);
            }}
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
            htmlFor="name"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Investment Name"
            value={newInvestment.name}
            onChange={(e) =>
              setNewInvestment({ ...newInvestment, name: e.target.value })
            }
            className={`w-full px-3 py-2 border rounded-md focus:outline-none ${
              errors.name ? "border-red-500" : "focus:border-blue-500"
            }`}
            required
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name}</p>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="startDate"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Start Date
          </label>
          <input
            type="date"
            id="startDate"
            name="startDate"
            placeholder="startDate"
            value={newInvestment.startDate}
            onChange={(e) =>
              setNewInvestment({
                ...newInvestment,
                startDate: e.target.value,
              })
            }
            className={`w-full px-3 py-2 border rounded-md focus:outline-none ${
              errors.startDate ? "border-red-500" : "focus:border-blue-500"
            }`}
            required
          />
          {errors.startDate && (
            <p className="text-red-500 text-sm mt-1">{errors.startDate}</p>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="amount"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Amount
          </label>
          <input
            type="number"
            id="amount"
            name="amount"
            placeholder="amount"
            value={newInvestment.amount}
            onChange={(e) =>
              setNewInvestment({
                ...newInvestment,
                amount: parseInt(e.target.value, 10),
              })
            }
            className={`w-full px-3 py-2 border rounded-md focus:outline-none ${
              errors.amount ? "border-red-500" : "focus:border-blue-500"
            }`}
            required
          />
          {errors.amount && (
            <p className="text-red-500 text-sm mt-1">{errors.amount}</p>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="term"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Term
          </label>
          <input
            type="number"
            id="term"
            name="term"
            placeholder="term"
            value={newInvestment.term}
            onChange={(e) =>
              setNewInvestment({
                ...newInvestment,
                term: +e.target.value,
              })
            }
            className={`w-full px-3 py-2 border rounded-md focus:outline-none ${
              errors.term ? "border-red-500" : "focus:border-blue-500"
            }`}
            required
          />
          {errors.term && (
            <p className="text-red-500 text-sm mt-1">{errors.term}</p>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="maturityDate"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Maturity Date
          </label>
          <input
            type="date"
            id="maturityDate"
            name="maturityDate"
            placeholder="maturityDate"
            value={newInvestment.maturityDate}
            onChange={(e) =>
              setNewInvestment({
                ...newInvestment,
                maturityDate: e.target.value,
              })
            }
            className={`w-full px-3 py-2 border rounded-md focus:outline-none ${
              errors.maturityDate ? "border-red-500" : "focus:border-blue-500"
            }`}
            required
          />
          {errors.maturityDate && (
            <p className="text-red-500 text-sm mt-1">{errors.maturityDate}</p>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="maturityAmount"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Maturity Amount
          </label>
          <input
            type="number"
            id="maturityAmount"
            name="maturityAmount"
            placeholder="maturityAmount"
            value={newInvestment.maturityAmount}
            onChange={(e) =>
              setNewInvestment({
                ...newInvestment,
                maturityAmount: parseFloat(e.target.value),
              })
            }
            className={`w-full px-3 py-2 border rounded-md focus:outline-none ${
              errors.maturityAmount ? "border-red-500" : "focus:border-blue-500"
            }`}
            required
          />
          {errors.maturityAmount && (
            <p className="text-red-500 text-sm mt-1">{errors.maturityAmount}</p>
          )}
        </div>
        <div className="text-center">
          <button
            onClick={addInvestment}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default InvestmentForm;
