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
    <div className="mt-12 p-6 bg-gray-100 rounded-xl max-w-md mx-auto">
      <h3 className="text-xl font-semibold mb-2">
        Stop Underpricing Your Work
      </h3>
      <p className="text-sm text-gray-600 mb-4">
        Get beginner-friendly freelance pricing tips weekly.
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
          className="p-2 border rounded"
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-black text-white p-2 rounded"
        >
          {loading ? "Subscribing..." : "Get Pricing Tips"}
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
