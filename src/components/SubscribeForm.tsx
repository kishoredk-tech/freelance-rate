"use client";

import { useState } from "react";

export default function SubscribeForm() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("Check your email! Your free pricing framework is on its way 🚀");
        setEmail("");
      } else {
        setMessage(data.error || "Subscription failed");
      }
    } catch {
      setMessage("Something went wrong. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div className="mt-6 p-6 bg-gray-200 rounded-xl max-w-md mx-auto">
      
      {/* HEADING */}
      <h3 className="text-lg font-semibold text-black text-center">
        Get My Freelance Pricing Framework (Free PDF)
      </h3>

      {/* DESCRIPTION */}
      <p className="text-sm text-gray-800 mt-2 text-center">
        A simple step-by-step system to confidently calculate and charge your ideal freelance rate.
      </p>

      {/* SOCIAL PROOF */}
      <p className="text-xs text-gray-700 mt-3 text-center">
        Join 17+ freelancers improving their pricing strategy.
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3 mt-4">
        
        <input
          type="email"
          placeholder="Enter your best email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
          className="p-3 border border-gray-400 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition"
        >
          {loading ? "Sending..." : "Send Me The Free PDF"}
        </button>
      </form>

      {/* MESSAGE */}
      {message && (
        <p
          className={`text-sm mt-3 text-center font-medium ${
            message.includes("Check your email")
              ? "text-green-600"
              : "text-red-500"
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
}
