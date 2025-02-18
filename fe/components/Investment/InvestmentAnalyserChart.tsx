"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const InvestmentAnalyserChart = () => {
  const [investments, setInvestments] = useState([]);
  const [options, setOptions] = useState({});
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
        setInvestments([]);
        if (accountId) {
          const response = await axios.get(
            `http://localhost:3001/investments?accountId=${accountId}`
          );
          setInvestments(response.data);
        }
      } catch (error: any) {
        console.error("Error fetching expense data:", error.message);
      }
    };
    fetchData();
  }, [accountId]);
  useEffect(() => {
    if (investments?.length > 0) {
      setOptions({
        title: {
          text: "",
        },
        xAxis: {
          categories: investments?.map((inv: any) => inv?.amount),
        },
        series: [
          {
            data: investments?.map((inv: any) => +inv?.maturityAmount),
          },
        ],
      });
    }
  }, [investments]);

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
      {investments?.length > 0 && (
        <HighchartsReact highcharts={Highcharts} options={options} />
      )}
    </>
  );
};

export default InvestmentAnalyserChart;
