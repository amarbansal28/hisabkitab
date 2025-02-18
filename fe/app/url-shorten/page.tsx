"use client";

import axios from "axios";
import { useEffect, useState } from "react";

export default function Home() {
  const [longURL, setLongURL] = useState("");
  const [shortURL, setShortURL] = useState("");
  const [errors, setErrors]: any = useState({});
  const validateForm = () => {
    const errors: any = {};
    if (!longURL.trim()) {
      errors.longURL = "longURL is required";
    }
    setLongURL("");
    return errors;
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      const response: any = await axios.post(
        "http://localhost:3001/shorten-url",
        { longURL },
        {
          headers: { "content-type": "application/json" },
        }
      );
      setShortURL(response?.data?.shortURL);
    }
  };

  useEffect(() => {
    console.log("shortURL", shortURL);
  }, [shortURL]);
  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8">
        <h1 className="text-2xl font-bold mb-4">URL Shorten</h1>
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            URL
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={longURL}
            onChange={(e) => setLongURL(e.target.value)}
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
          <label className="block text-gray-700 text-sm font-bold mb-2"></label>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            <a href={shortURL} target="_blank">
              {shortURL}
            </a>
          </label>
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
}
