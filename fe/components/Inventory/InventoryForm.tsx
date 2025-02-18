"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

const InventoryForm = () => {
  const [accountId, setAccountId] = useState("");
  const [newProduct, setNewProduct] = useState({
    name: "",
    quantity: 0,
    price: 0,
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
    if (!newProduct.name) {
      errors.name = "Name is required";
    }
    if (!newProduct.quantity) {
      errors.quantity = "Quantity is required";
    }
    if (!newProduct.price) {
      errors.price = "Price is required";
    }
    return errors;
  };

  const addProduct = async () => {
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      try {
        setErrors({});
        await axios.post("http://localhost:3001/inventory", newProduct, {
          headers: { "content-type": "application/json" },
        });
        setNewProduct({
          name: "",
          quantity: 0,
          price: 0,
          accountId: "",
        });
      } catch (error: any) {
        console.error("Error saving inventory details:", error.message);
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
              setNewProduct({
                ...newProduct,
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
            placeholder="Product Name"
            value={newProduct.name}
            onChange={(e) =>
              setNewProduct({ ...newProduct, name: e.target.value })
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
            htmlFor="Quantity"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Quantity
          </label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            placeholder="Quantity"
            value={newProduct.quantity}
            onChange={(e) =>
              setNewProduct({
                ...newProduct,
                quantity: parseInt(e.target.value, 10),
              })
            }
            className={`w-full px-3 py-2 border rounded-md focus:outline-none ${
              errors.quantity ? "border-red-500" : "focus:border-blue-500"
            }`}
            required
          />
          {errors.quantity && (
            <p className="text-red-500 text-sm mt-1">{errors.quantity}</p>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="Price"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Price
          </label>
          <input
            type="number"
            id="price"
            name="price"
            placeholder="Price"
            value={newProduct.price}
            onChange={(e) =>
              setNewProduct({
                ...newProduct,
                price: parseFloat(e.target.value),
              })
            }
            className={`w-full px-3 py-2 border rounded-md focus:outline-none ${
              errors.price ? "border-red-500" : "focus:border-blue-500"
            }`}
            required
          />
          {errors.price && (
            <p className="text-red-500 text-sm mt-1">{errors.price}</p>
          )}
        </div>
        <div className="text-center">
          <button
            onClick={addProduct}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default InventoryForm;
