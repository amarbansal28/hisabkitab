"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

const CustomerTable = () => {
  const [customers, setCustomer] = useState([]);
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
      setCustomer([]);
      if (accountId) {
        try {
          const response = await axios.post("http://localhost:3001/customers", {
            accountId,
          });
          setCustomer(response.data);
        } catch (error: any) {
          console.error("Error fetching customers data:", error.message);
        }
      }
    };
    fetchData();
  }, [accountId]);
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-screen-md w-full">
        <h1 className="text-2xl font-bold mb-4">Customer List</h1>
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
              <th className="py-2 px-4 bg-gray-100 border-b">Mobile</th>
            </tr>
          </thead>
          <tbody>
            {customers?.length > 0 ? (
              <>
                {customers.map((customer: any) => (
                  <tr key={customer.mobile}>
                    <td className="py-2 px-4 border-b">{customer.name}</td>
                    <td className="py-2 px-4 border-b">{customer.mobile}</td>
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

export default CustomerTable;
