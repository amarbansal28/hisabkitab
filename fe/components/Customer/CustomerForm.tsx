"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

const CustomerForm = () => {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
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
    if (!name.trim()) {
      errors.name = "Name is required";
    }
    if (!mobile.trim()) {
      errors.mobile = "Mobile is required";
    } else if (!isValidMobile(mobile)) {
      errors.mobile = "Please enter a valid mobile";
    }
    setName("");
    setMobile("");
    return errors;
  };

  const isValidMobile = (value: string) => {
    const regex = /^[6-9]\d{9}$/;
    return regex.test(value);
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
          "http://localhost:3001/customer",
          { name, mobile, accountId },
          {
            headers: { "content-type": "application/json" },
          }
        );
        setName("");
        setMobile("");
      } catch (error: any) {
        console.error("Error saving customer details:", error.message);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8">
        <h1 className="text-2xl font-bold mb-4">Customer Form</h1>
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
            htmlFor="name"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
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
            htmlFor="mobile"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Mobile
          </label>
          <input
            type="mobile"
            id="mobile"
            name="mobile"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none ${
              errors.mobile ? "border-red-500" : "focus:border-blue-500"
            }`}
            required
          />
          {errors.mobile && (
            <p className="text-red-500 text-sm mt-1">{errors.mobile}</p>
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
  );
};

export default CustomerForm;
