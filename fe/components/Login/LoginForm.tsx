"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const router = useRouter();

  const [mobile, setMobile] = useState("");
  const [OTP, setOTP] = useState("");
  const [errors, setErrors]: any = useState({});
  const validateForm = () => {
    const errors: any = {};
    if (!mobile.trim()) {
      errors.mobile = "Mobile is required";
    }
    if (!OTP.trim()) {
      errors.mobile = "OTP is required";
    }
    setMobile("");
    setOTP("");
    return errors;
  };
  const handleLogin = async (e: any) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      try {
        setErrors({});
        const response: any = await axios.post(
          "http://localhost:3001/login",
          { OTP, mobile },
          {
            headers: { "content-type": "application/json" },
          }
        );
        if (response?.data?.ok) {
          sessionStorage.setItem(
            "userId",
            JSON.stringify(response?.data?.data)
          );
          setOTP("");
          setMobile("");
          router.push("/");
        } else {
          console.error("Login failed");
        }
      } catch (error: any) {
        console.error("Error saving account details:", error.message);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleLogin} className="max-w-md mx-auto mt-8">
        <h1 className="text-2xl font-bold mb-4">Login</h1>
        <div className="mb-4">
          <label
            htmlFor="mobile"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Mobile
          </label>
          <input
            type="number"
            id="mobile"
            name="mobile"
            maxLength={10}
            minLength={10}
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
        <div className="mb-4">
          <label
            htmlFor="mobile"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            OTP
          </label>
          <input
            type="number"
            id="otp"
            name="otp"
            maxLength={4}
            minLength={4}
            value={OTP}
            onChange={(e) => setOTP(e.target.value)}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none ${
              errors.OTP ? "border-red-500" : "focus:border-blue-500"
            }`}
            required
          />
          {errors.OTP && (
            <p className="text-red-500 text-sm mt-1">{errors.OTP}</p>
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

export default LoginForm;
