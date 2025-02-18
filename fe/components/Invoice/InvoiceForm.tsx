"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

const InvoiceForm = () => {
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [description, setDescription] = useState("");
  const [errors, setErrors]: any = useState({});
  const [accounts, setAccounts] = useState([]);
  const [accountId, setAccountId] = useState("");
  const [customerId, setCustomerId] = useState("");
  const [customerList, setCustomerList] = useState([]);
  const [inventory, setInventory] = useState([]);
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
        setInventory([]);
        if (accountId) {
          const response = await axios.get(
            `http://localhost:3001/inventory?accountId=${accountId}`
          );
          setInventory(response.data);
        }
      } catch (error: any) {
        console.error("Error fetching inv data:", error.message);
      }
    };
    fetchData();
  }, [accountId]);
  const validateForm = () => {
    const errors: any = {};
    if (!description) {
      errors.description = "Description is required";
    }
    if (!totalAmount || isNaN(totalAmount) || +totalAmount <= 0) {
      errors.totalAmount = "Please enter a valid positive totalAmount";
    }
    if (!accountId) {
      errors.accountId = "accountId is required";
    }
    if (!customerId) {
      errors.customerId = "Customer is required";
    }
    if (!price) {
      errors.price = "Price is required";
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
          "http://localhost:3001/Invoices",
          {
            items: [
              {
                description,
                quantity,
                price,
              },
            ],
            totalAmount: quantity * price,
            accountId,
            customerId,
          },
          { headers: { "content-type": "application/json" } }
        );
        setQuantity(0);
        setTotalAmount(0);
        setDescription("");
        setCustomerId("");
        setAccountId("");
        setPrice(0);
      } catch (error: any) {
        console.error("Error saving Invoice details:", error.message);
      }
    }
  };
  useEffect(() => {
    if (quantity && price) {
      setTotalAmount(quantity * price);
    }
  }, [quantity, price]);
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-screen-md w-full">
        <h1 className="text-2xl font-bold mb-4">Invoice Form</h1>
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
            {errors.customerId && (
              <p className="text-red-500 text-sm mt-1">{errors.customerId}</p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Description
            </label>
            <select
              id="description"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none ${
                errors.description ? "border-red-500" : "focus:border-blue-500"
              }`}
            >
              <option value=""></option>
              {inventory?.map((inv: any) => {
                return (
                  <option key={inv._id} value={inv._id}>
                    {inv.name}
                  </option>
                );
              })}
            </select>
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">{errors.description}</p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="quantity"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Qunatity
            </label>
            <input
              id="quantity"
              name="quantity"
              type="number"
              value={quantity}
              onChange={(e: any) => setQuantity(e.target.value)}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none ${
                errors.quantity ? "border-red-500" : "focus:border-blue-500"
              }`}
            />
            {errors.quantity && (
              <p className="text-red-500 text-sm mt-1">{errors.quantity}</p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="price"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Price
            </label>
            <input
              id="price"
              type="number"
              name="price"
              value={price}
              onChange={(e: any) => setPrice(e.target.value)}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none ${
                errors.quantity ? "border-red-500" : "focus:border-blue-500"
              }`}
            />
            {errors.price && (
              <p className="text-red-500 text-sm mt-1">{errors.price}</p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="totalAmount"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Total Amount
            </label>
            <input
              disabled={true}
              type="number"
              id="totalAmount"
              name="totalAmount"
              value={totalAmount}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none ${
                errors.totalAmount ? "border-red-500" : "focus:border-blue-500"
              }`}
              required
            />
            {errors.totalAmount && (
              <p className="text-red-500 text-sm mt-1">{errors.totalAmount}</p>
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

export default InvoiceForm;
