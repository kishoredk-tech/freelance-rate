"use client";

import { useState } from "react";
import InputField from "@/components/InputField";
import ResultsCard from "@/components/ResultsCard";

export default function Home() {
  const [monthlyIncomeGoal, setMonthlyIncomeGoal] = useState("");
  const [monthlyExpenses, setMonthlyExpenses] = useState("");
  const [workingDays, setWorkingDays] = useState("");
  const [billableHours, setBillableHours] = useState("");
  const [bufferPercent, setBufferPercent] = useState(20);
  const [projectHours, setProjectHours] = useState("");

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
    <main className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-lg p-8 rounded-2xl shadow-lg space-y-4">
        <h1 className="text-3xl font-bold text-center mb-4">
          FreelanceRate Calculator
        </h1>

        <InputField
          value={monthlyIncomeGoal}
          onChange={setMonthlyIncomeGoal}
          placeholder="Monthly Income Goal (₹)"
        />

        <InputField
          value={monthlyExpenses}
          onChange={setMonthlyExpenses}
          placeholder="Monthly Expenses (₹)"
        />

        <InputField
          value={workingDays}
          onChange={setWorkingDays}
          placeholder="Working Days per Month"
        />

        <InputField
          value={billableHours}
          onChange={setBillableHours}
          placeholder="Billable Hours per Day"
        />

        <div>
          <label className="text-sm font-medium">
            Safety Buffer: {bufferPercent}%
          </label>
          <input
            type="range"
            min="0"
            max="50"
            value={bufferPercent}
            onChange={(e) =>
              setBufferPercent(Number(e.target.value))
            }
            className="w-full mt-2"
          />
        </div>

        <InputField
          value={projectHours}
          onChange={setProjectHours}
          placeholder="Project Estimated Hours"
        />

        <ResultsCard
          totalRequired={totalRequired}
          recommendedHourlyRate={recommendedHourlyRate}
          projectPrice={projectPrice}
        />

        <button
          onClick={handleReset}
          className="mt-4 w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition"
        >
          Reset Calculator
        </button>
      </div>
    </main>
  );
}
