"use client";

import Link from "next/link";
import React from "react";

const NavigationMenu = () => {
  const nav = [
    {
      name: "Dashboard",
      path: "/",
    },
    {
      name: "Account",
      path: "/account",
    },
    {
      name: "Add Account",
      path: "/add-account",
    },
    // {
    //   name: "Customer",
    //   path: "/customer",
    // },
    // {
    //   name: "Add Customer",
    //   path: "/add-customer",
    // },
    // {
    //   name: "Transaction",
    //   path: "/transaction",
    // },
    // {
    //   name: "Create Transaction",
    //   path: "/create-transaction",
    // },
    // {
    //   name: "Ledger",
    //   path: "/ledger",
    // },
    {
      name: "Expense Analyser",
      path: "/expense-analyser",
    },
    {
      name: "Expense",
      path: "/expense",
    },
    {
      name: "Add Expense",
      path: "/add-expense",
    },
    // {
    //   name: "Todo",
    //   path: "/todo",
    // },
    // {
    //   name: "Add Todo",
    //   path: "/add-todo",
    // },
    // {
    //   name: "Inventory",
    //   path: "/inventory",
    // },
    // {
    //   name: "Add Inventory",
    //   path: "/add-inventory",
    // },
    // ,
    // {
    //   name: "Invoice",
    //   path: "/invoice",
    // },
    // {
    //   name: "Add Invoice",
    //   path: "/add-invoice",
    // },
    // ,
    // {
    //   name: "Investment Analyser",
    //   path: "/investment-analyser",
    // },
    // {
    //   name: "Investment",
    //   path: "/investment",
    // },
    // {
    //   name: "Add Investment",
    //   path: "/add-investment",
    // },
    // {
    //   name: "Shares",
    //   path: "/shares",
    // },
    // {
    //   name: "Compare Shares",
    //   path: "/compare-shares",
    // },
    // {
    //   name: "URL Shorten",
    //   path: "/url-shorten",
    // },
  ];

  return (
    <div className="w-1/5 min-h-screen bg-gray-200 p-4">
      <nav>
        <ul>
          {nav?.map((n: any, i) => (
            <li className="p-2" key={i}>
              <b>
                <Link href={n.path}>{n.name}</Link>
              </b>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default NavigationMenu;
