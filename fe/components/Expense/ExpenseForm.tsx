"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

const ExpenseForm = () => {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState(0);
  const [category, setCategory] = useState("");
  const [errors, setErrors]: any = useState({});
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

  const validateForm = () => {
    const errors: any = {};
    if (!category) {
      errors.category = "Category is required";
    }
    if (!amount || isNaN(amount) || +amount <= 0) {
      errors.amount = "Please enter a valid positive amount";
    }
    if (!description) {
      errors.description = "Description is required";
    }
    return errors;
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      try {
        setErrors({});
        await axios.post(
          "http://localhost:3001/expenses",
          {
            category,
            amount,
            description,
            accountId,
          },
          { headers: { "content-type": "application/json" } }
        );
        setDescription("");
        setAmount(0);
        setCategory("");
      } catch (error: any) {
        console.error("Error saving expense details:", error.message);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-screen-md w-full">
        <h1 className="text-2xl font-bold mb-4">Expense Form</h1>
        <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8">
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
              htmlFor="category"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Category
            </label>
            <select
              id="category"
              name="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none ${
                errors.category ? "border-red-500" : "focus:border-blue-500"
              }`}
            >
              <option value=""></option>
              <option value="investment">Investment</option>
              <option value="rent">Rent</option>
              <option value="shopping">Shopping</option>
              <option value="food">Food</option>
            </select>
            {errors.category && (
              <p className="text-red-500 text-sm mt-1">{errors.category}</p>
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
              value={amount}
              onChange={(e: any) => setAmount(e.target.value)}
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
              htmlFor="description"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={description}
              onChange={(e: any) => setDescription(e.target.value)}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none ${
                errors.description ? "border-red-500" : "focus:border-blue-500"
              }`}
            ></textarea>
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">{errors.description}</p>
            )}
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ExpenseForm;
