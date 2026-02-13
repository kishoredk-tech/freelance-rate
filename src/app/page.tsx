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

  // =========================
  // BUSINESS LOGIC
  // =========================

  const totalRequired =
    Math.max(0, Number(monthlyIncomeGoal || 0)) +
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
    setMonthlyIncomeGoal("");
    setMonthlyExpenses("");
    setWorkingDays("");
    setBillableHours("");
    setProjectHours("");
    setBufferPercent(20);
  };

  return (
    <main className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-xl mx-auto bg-white shadow-md rounded-xl p-6 space-y-6">

        <h1 className="text-2xl font-bold text-center">
          Calculate What You Should Charge as a Freelancer
        </h1>

        <p className="text-sm text-gray-600 text-center">
          Stop underpricing your work. Know your real hourly and project rate.
        </p>

        {/* INPUTS */}
        <div className="space-y-4">

          <InputField
            label="Monthly Income Goal (₹)"
            value={monthlyIncomeGoal}
            onChange={setMonthlyIncomeGoal}
          />

          <InputField
            label="Monthly Expenses (₹)"
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
            <label className="block mb-2 font-medium">
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
        />

        {/* RESET BUTTON */}
        <button
          onClick={handleReset}
          className="w-full bg-gray-200 hover:bg-gray-300 py-2 rounded-lg"
        >
          Reset
        </button>

      </div>

      {/* NEWSLETTER */}
      <div className="max-w-xl mx-auto mt-12">
        <SubscribeForm />
      </div>

    </main>
  );
}
