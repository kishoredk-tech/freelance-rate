"use client";

import { useState } from "react";
import InputField from "@/components/InputField";
import ResultsCard from "@/components/ResultsCard";
import SubscribeForm from "@/components/SubscribeForm";

export default function Home() {
  // =========================
  // STATE
  // =========================
  const [currency, setCurrency] = useState("INR");
  const [desiredIncome, setDesiredIncome] = useState("");
  const [monthlyExpenses, setMonthlyExpenses] = useState("");
  const [workingDays, setWorkingDays] = useState("");
  const [billableHours, setBillableHours] = useState("");
  const [bufferPercent, setBufferPercent] = useState(20);
  const [projectHours, setProjectHours] = useState("");
  const [shareMessage, setShareMessage] = useState("");

  const currencySymbols: Record<string, string> = {
    INR: "₹",
    USD: "$",
    EUR: "€",
    GBP: "£",
  };

  // =========================
  // BUSINESS LOGIC
  // =========================

  const totalRequired =
    Math.max(0, Number(desiredIncome || 0)) +
    Math.max(0, Number(monthlyExpenses || 0));

  const totalBillableHours =
    Math.max(0, Number(workingDays || 0)) *
    Math.max(0, Number(billableHours || 0));

  const baseHourlyRate =
    totalBillableHours > 0
      ? totalRequired / totalBillableHours
      : 0;

  const recommendedHourlyRate =
    Math.round(baseHourlyRate * (1 + bufferPercent / 100));

  const projectPrice =
    Math.round(recommendedHourlyRate * Number(projectHours || 0));

  const handleReset = () => {
    setDesiredIncome("");
    setMonthlyExpenses("");
    setWorkingDays("");
    setBillableHours("");
    setProjectHours("");
    setBufferPercent(20);
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

        {/* INPUTS */}
        <div className="space-y-4">

          {/* Currency */}
          <div>
            <label className="block mb-2 font-semibold text-gray-800">
              Currency
            </label>
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="w-full p-3 border border-gray-400 rounded-lg bg-white"
            >
              <option value="INR">INR (₹)</option>
              <option value="USD">USD ($)</option>
              <option value="EUR">EUR (€)</option>
              <option value="GBP">GBP (£)</option>
            </select>
          </div>

          <InputField
            label={`Desired Take-Home Income (${currencySymbols[currency]})`}
            value={desiredIncome}
            onChange={setDesiredIncome}
          />

          <InputField
            label={`Monthly Expenses (${currencySymbols[currency]})`}
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
          currencySymbol={currencySymbols[currency]}
          totalRequired={totalRequired}
          recommendedHourlyRate={recommendedHourlyRate}
          projectPrice={projectPrice}
        />

        {/* Reality Check */}
        {recommendedHourlyRate > 0 && (
          <div className="mt-6 p-4 bg-yellow-100 rounded-lg text-sm text-gray-800">
            <p className="font-semibold">Reality Check:</p>
            <p className="mt-2">
              If you charge less than {currencySymbols[currency]} {recommendedHourlyRate},
              you're likely:
            </p>
            <ul className="list-disc ml-5 mt-2">
              <li>Working more hours than planned</li>
              <li>Underestimating your expenses</li>
              <li>Skipping your safety buffer</li>
            </ul>
          </div>
        )}

        {/* MICRO TRIGGER */}
        <p className="text-sm text-center text-gray-600 mt-4">
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
          Built by Kishore • Micro tools for freelancers
        </p>

      </div>
    </main>
  );
}
