"use client";

import { useState } from "react";

export default function SubscribeForm({ onSubscribed }: any) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const res = await fetch("/api/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    if (res.ok) {
      setMessage("Unlocked. You can now download the report.");
      onSubscribed();
    } else {
      setMessage("Subscription failed.");
    }

    setLoading(false);
  };

  return (
    <div className="bg-zinc-800 p-6 rounded-xl border border-zinc-700 mt-6">

      <h3 className="text-lg font-semibold text-white text-center">
        Unlock Premium Pricing Report
      </h3>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3 mt-4">

        <input
          type="email"
          placeholder="Enter your email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-3 rounded-lg bg-black border border-gray-600 text-white"
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-white text-black py-3 rounded-lg font-semibold"
        >
          {loading ? "Unlocking..." : "Unlock Report"}
        </button>
      </form>

      {message && (
        <p className="text-sm text-green-400 mt-3 text-center">
          {message}
        </p>
      )}
    </div>
  );
}
