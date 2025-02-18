"use client";

import { useEffect, useState } from "react";
import * as d3 from "d3";
import axios from "axios";

const ExpenseAnalyserChart = () => {
  const [expenses, setExpenses] = useState([]);
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
        setExpenses([]);
        if (accountId) {
          const response = await axios.get(
            `http://localhost:3001/expenses/category-wise?accountId=${accountId}`
          );
          setExpenses(response.data);
        }
      } catch (error: any) {
        console.error("Error fetching expense data:", error.message);
      }
    };
    fetchData();
  }, [accountId]);
  useEffect(() => {
    if (expenses?.length > 0) {
      const radius = Math.min(300, 300) / 2;
      const svg = d3
        .select("#pieChartContainer")
        .append("svg")
        .attr("width", 300)
        .attr("height", 300)
        .append("g")
        .attr("transform", `translate(${300 / 2},${300 / 2})`);
      const color = d3.scaleOrdinal(d3.schemeCategory10);
      const pie = d3.pie().value((d: any) => d.amount);
      const arc: any = d3.arc().innerRadius(0).outerRadius(radius);
      svg
        .selectAll("path")
        .data(pie(expenses))
        .enter()
        .append("path")
        .attr("d", arc)
        .attr("fill", ({ d, i }: any) => color(i));
      svg
        .selectAll("text")
        .data(pie(expenses))
        .enter()
        .append("text")
        .text((d: any) => {
          return d.data.category;
        })
        .attr("transform", (d: any) => `translate(${arc.centroid(d)})`)
        .style("text-anchor", "middle");
      return () => {
        svg.selectAll("*").remove();
      };
    }
  }, [expenses]);

  return (
    <>
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
      <div id="pieChartContainer"></div>
    </>
  );
};

export default ExpenseAnalyserChart;
