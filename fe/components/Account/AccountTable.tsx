"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

const AccountTable = () => {
  // ReactGA.initialize("YOUR_GA_TRACKING_CODE");
  // ReactGA.set({ page: window.location.pathname });
  // ReactGA.pageview(window.location.pathname);
  // ReactGA.event({ category: "page", action: "load", label: "account-table" });
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/accounts");
        setAccounts(response.data);
      } catch (error: any) {
        console.error("Error fetching accounts data:", error.message);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-screen-md w-full">
        <h1 className="text-2xl font-bold mb-4">Account List</h1>
        <table className="min-w-full border border-gray-300">
          <thead>
            <tr>
              <th className="py-2 px-4 bg-gray-100 border-b">Name</th>
              <th className="py-2 px-4 bg-gray-100 border-b">Mobile</th>
            </tr>
          </thead>
          <tbody>
            {accounts?.length > 0 ? (
              <>
                {accounts.map((account: any) => (
                  <tr key={account.mobile}>
                    <td className="py-2 px-4 border-b">{account.name}</td>
                    <td className="py-2 px-4 border-b">{account.mobile}</td>
                  </tr>
                ))}
              </>
            ) : (
              <tr>
                <td className="py-2 px-4 border-b"> No Data Found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AccountTable;
