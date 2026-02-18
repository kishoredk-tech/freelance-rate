"use client";

import { useState } from "react";
import InputField from "@/components/InputField";
import ResultsCard from "@/components/ResultsCard";
import SubscribeForm from "@/components/SubscribeForm";

export default function Home() {
  // =========================
  // STATE
  // =========================
  const [monthlyIncomeGoal, setMonthlyIncomeGoal] = useState("");
  const [monthlyExpenses, setMonthlyExpenses] = useState("");
  const [workingDays, setWorkingDays] = useState("");
  const [billableHours, setBillableHours] = useState("");
  const [bufferPercent, setBufferPercent] = useState(20);
  const [projectHours, setProjectHours] = useState("");
  const [shareMessage, setShareMessage] = useState("");
  const [nonBillablePercent, setNonBillablePercent] = useState(30);
  const [currency, setCurrency] = useState("INR");

  // =========================
  // CURRENCY SYMBOLS
  // =========================
  const currencySymbols: Record<string, string> = {
    INR: "₹",
    USD: "$",
    EUR: "€",
    GBP: "£",
  };

  const symbol = currencySymbols[currency];

  // =========================
  // BUSINESS LOGIC
  // =========================

  const totalRequired =
    Math.max(0, Number(monthlyIncomeGoal || 0)) +
    Math.max(0, Number(monthlyExpenses || 0));

  const totalWorkingHours =
    Math.max(0, Number(workingDays || 0)) *
    Math.max(0, Number(billableHours || 0));

  // Adjust for non-billable time
  const effectiveBillableHours =
    totalWorkingHours * (1 - nonBillablePercent / 100);

  const baseHourlyRate =
    effectiveBillableHours > 0
      ? totalRequired / effectiveBillableHours
      : 0;

  const recommendedHourlyRate =
    Math.round(baseHourlyRate * (1 + bufferPercent / 100));

  const projectPrice =
    Math.round(recommendedHourlyRate * Number(projectHours || 0));

  const handleReset = () => {
    setMonthlyIncomeGoal("");
    setMonthlyExpenses("");
    setWorkingDays("");
    setBillableHours("");
    setProjectHours("");
    setBufferPercent(20);
    setNonBillablePercent(30);
    setCurrency("INR");
  };

  // =========================
  // SHARE FUNCTION
  // =========================

  const handleShare = async () => {
    const shareData = {
      title: "Freelance Rate Calculator",
      text: "Stop underpricing your freelance work. Calculate your ideal hourly rate instantly.",
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        setShareMessage("Link copied to clipboard!");
        setTimeout(() => setShareMessage(""), 2000);
      }
    } catch (error) {
      console.error("Sharing failed:", error);
    }
  };

  return (
    <main className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-xl mx-auto bg-white shadow-md rounded-xl p-6 space-y-6">

        {/* HEADER */}
        <h1 className="text-2xl font-bold text-gray-800 text-center">
          Stop Underpricing Your Freelance Work
        </h1>

        <p className="text-sm text-gray-600 text-center">
          Free calculator to find your ideal freelance hourly rate.
        </p>

        {/* CURRENCY SELECTOR */}
        <div>
          <label className="block mb-2 font-semibold text-gray-800">
            Currency
          </label>
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            className="w-full p-2 border rounded-lg"
          >
            <option value="INR">INR (₹)</option>
            <option value="USD">USD ($)</option>
            <option value="EUR">EUR (€)</option>
            <option value="GBP">GBP (£)</option>
          </select>
        </div>

        {/* INPUTS */}
        <div className="space-y-4">

          <InputField
            label={`Monthly Income Goal (${symbol})`}
            value={monthlyIncomeGoal}
            onChange={setMonthlyIncomeGoal}
          />

          <InputField
            label={`Monthly Expenses (${symbol})`}
            value={monthlyExpenses}
            onChange={setMonthlyExpenses}
          />

          <InputField
            label="Working Days per Month"
            value={workingDays}
            onChange={setWorkingDays}
          />

          <InputField
            label="Billable Hours per Day"
            value={billableHours}
            onChange={setBillableHours}
          />

          {/* NON BILLABLE SLIDER */}
          <div>
            <label className="block mb-2 font-semibold text-gray-800">
              Non-Billable Time: {nonBillablePercent}%
            </label>
            <input
              type="range"
              min="0"
              max="80"
              value={nonBillablePercent}
              onChange={(e) =>
                setNonBillablePercent(Number(e.target.value))
              }
              className="w-full"
            />
          </div>

          {/* BUFFER SLIDER */}
          <div>
            <label className="block mb-2 font-semibold text-gray-800">
              Safety Buffer: {bufferPercent}%
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={bufferPercent}
              onChange={(e) =>
                setBufferPercent(Number(e.target.value))
              }
              className="w-full"
            />
          </div>

          <InputField
            label="Project Estimated Hours"
            value={projectHours}
            onChange={setProjectHours}
          />

        </div>

        {/* RESULTS */}
        <ResultsCard
          totalRequired={totalRequired}
          recommendedHourlyRate={recommendedHourlyRate}
          projectPrice={projectPrice}
          symbol={symbol}
        />

        {/* MICRO TRIGGER */}
        <p className="text-sm text-center text-gray-600 mt-2">
          Want help reaching this rate consistently? Get my pricing framework below 👇
        </p>

        {/* NEWSLETTER */}
        <div className="mt-6">
          <SubscribeForm />
        </div>

        {/* SHARE SECTION */}
        <p className="text-xs text-gray-600 text-center mt-4">
          Know a freelancer who undercharges? Share this tool with them.
        </p>

        <button
          onClick={handleShare}
          className="w-full bg-black text-white py-3 rounded-lg mt-3 hover:bg-gray-800 transition font-medium"
        >
          Share This Tool
        </button>

        {shareMessage && (
          <p className="text-center text-sm text-green-600 mt-2">
            {shareMessage}
          </p>
        )}

        {/* RESET BUTTON */}
        <button
          onClick={handleReset}
          className="w-full bg-gray-200 hover:bg-gray-300 text-black font-medium py-2 rounded-lg mt-3"
        >
          Reset
        </button>

        {/* FOOTER */}
        <p className="text-center text-sm text-gray-600 mt-6">
          Built by Kishore • Practical tools for freelancers
        </p>

      </div>
    </main>
  );
}
