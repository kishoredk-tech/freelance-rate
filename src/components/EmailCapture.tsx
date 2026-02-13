"use client";

import { useState } from "react";

export default function EmailCapture() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (!email) return;
    console.log("Collected email:", email);
    setSubmitted(true);
    setEmail("");
  };

  return (
    <div className="mt-12 p-6 bg-white rounded-xl shadow text-center">
      <h2 className="text-lg font-semibold mb-2">
        Want Freelancing Pricing Tips?
      </h2>
      <p className="text-sm text-gray-500 mb-4">
        Get beginner-friendly tips to stop underpricing your work.
      </p>

      {submitted ? (
        <p className="text-green-600 font-medium">
          Thanks! You’re on the list 🚀
        </p>
      ) : (
        <div className="flex flex-col sm:flex-row gap-2 justify-center">
          <input
            type="email"
            placeholder="Enter your email"
            className="border px-3 py-2 rounded-md w-full sm:w-64"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            onClick={handleSubmit}
            className="bg-black text-white px-4 py-2 rounded-md"
          >
            Subscribe
          </button>
        </div>
      )}
    </div>
  );
}
