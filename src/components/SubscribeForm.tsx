"use client";

import { useState } from "react";

type Props = {
  onSuccess: () => void;
};

export default function SubscribeForm({ onSuccess }: Props) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const res = await fetch("/api/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    if (res.ok) {
      setMessage("Unlocked. You can now download your premium report.");
      onSuccess();
    } else {
      setMessage("Something went wrong.");
    }

    setLoading(false);
  };

  return (
    <div className="
      p-10
      rounded-3xl
      bg-gradient-to-r
      from-slate-900
      to-indigo-950
      shadow-2xl
      space-y-6
    ">

      {/* Title */}
      <h3 className="text-2xl font-semibold text-white text-center">
        Unlock Premium Pricing Intelligence Report
      </h3>

      {/* Subtitle */}
      <p className="text-sm text-indigo-200 text-center">
        Enter your email to download your detailed pricing intelligence report.
      </p>

      {/* Form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-6">

        <input
          type="email"
          required
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="
            w-full
            px-5
            py-4
            rounded-2xl
            bg-slate-800
            text-white
            placeholder-slate-400
            border border-slate-700
            focus:outline-none
            focus:ring-2
            focus:ring-indigo-500
            focus:border-indigo-500
            transition
            text-lg
          "
        />

        <button
          type="submit"
          disabled={loading}
          className="
            w-full
            py-4
            rounded-2xl
            font-semibold
            text-white
            bg-gradient-to-r
            from-indigo-600
            to-purple-600
            hover:from-indigo-700
            hover:to-purple-700
            transition
            shadow-lg
            text-lg
            disabled:opacity-60
          "
        >
          {loading ? "Unlocking..." : "Download Premium Report (PDF)"}
        </button>

      </form>

      {/* Message */}
      {message && (
        <p className="text-center text-sm font-medium text-green-400">
          {message}
        </p>
      )}

    </div>
  );
}
