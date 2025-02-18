"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

const InventoryTable = () => {
  const [balance, setBalance] = useState(0);
  const [inventory, setInventory] = useState([]);
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
    const fetchData = async () => {
      try {
        setBalance(0);
        setInventory([]);
        if (accountId) {
          const response = await axios.get(
            `http://localhost:3001/inventory?accountId=${accountId}`
          );
          setInventory(response.data);
          let val = 0;
          for (const d of response.data) {
            val += d.price * d.quantity;
          }
          setBalance(val);
        }
      } catch (error: any) {
        console.error("Error fetching inv data:", error.message);
      }
    };
    fetchData();
  }, [accountId]);
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-screen-md w-full">
        <h1 className="text-2xl font-bold mb-4 flex justify-between items-center">
          Inventory
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
        <table className="min-w-full border border-gray-300">
          <thead>
            <tr>
              <th className="py-2 px-4 bg-gray-100 border-b">Name</th>
              <th className="py-2 px-4 bg-gray-100 border-b">Quantity</th>
              <th className="py-2 px-4 bg-gray-100 border-b">Price</th>
              <th className="py-2 px-4 bg-gray-100 border-b">Cost</th>
            </tr>
          </thead>
          <tbody>
            {inventory?.length > 0 ? (
              <>
                {inventory.map((inv: any) => (
                  <tr key={inv._id}>
                    <td className="py-2 px-4 border-b">{inv.name}</td>
                    <td className="py-2 px-4 border-b">{inv.quantity}</td>
                    <td className="py-2 px-4 border-b">{inv.price}</td>
                    <td className="py-2 px-4 border-b">
                      {inv.quantity * inv.price}
                    </td>
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

export default InventoryTable;
