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
        setMessage("Successfully subscribed!");
        setEmail("");
      } else {
        setMessage(data.error || "Subscription failed");
      }
    } catch {
      setMessage("Something went wrong");
    }

    setLoading(false);
  };

  return (
    <div className="mt-12 p-6 bg-gray-200 rounded-xl max-w-md mx-auto">
      <h3 className="text-xl font-semibold mb-2 text-black">
        Want to Earn More From Freelancing?
      </h3>
      <p className="text-sm text-gray-900 mb-4">
        I share practical pricing strategies, real examples, and beginner-friendly frameworks. No spam.
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <p className="text-xs text-gray-900 mt-3">
          Join 17+ freelancers already using this calculator.
        </p>
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
          className="bg-black text-white p-2 rounded"
        >
          {loading ? "Subscribing..." : "Get Free Pricing Guide"}
        </button>
      </form>

      {message && (
        <p
          className={`text-sm mt-3 text-center font-medium ${
            message.includes("Successfully")
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
