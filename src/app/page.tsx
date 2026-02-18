"use client";

import { useState, useMemo } from "react";
import InputField from "@/components/InputField";
import ResultsCard from "@/components/ResultsCard";
import SubscribeForm from "@/components/SubscribeForm";

export default function Home() {
  const [currency, setCurrency] = useState("INR");
  const [desiredIncome, setDesiredIncome] = useState("");
  const [monthlyExpenses, setMonthlyExpenses] = useState("");
  const [workingDays, setWorkingDays] = useState("");
  const [billableHours, setBillableHours] = useState("");
  const [bufferPercent, setBufferPercent] = useState(20);
  const [projectHours, setProjectHours] = useState("");
  const [currentRate, setCurrentRate] = useState("");

  const currencySymbols: Record<string, string> = {
    INR: "₹",
    USD: "$",
    EUR: "€",
    GBP: "£",
  };

  const symbol = currencySymbols[currency];

  const calculations = useMemo(() => {
    const income = Number(desiredIncome) || 0;
    const expenses = Number(monthlyExpenses) || 0;
    const days = Number(workingDays) || 0;
    const hours = Number(billableHours) || 0;
    const projectHrs = Number(projectHours) || 0;
    const current = Number(currentRate) || 0;

    const totalRequired = income + expenses;
    const totalBillableHours = days * hours;

    const baseRate =
      totalBillableHours > 0
        ? totalRequired / totalBillableHours
        : 0;

    const recommended =
      baseRate > 0
        ? Math.round(baseRate * (1 + bufferPercent / 100))
        : 0;

    const projectPrice =
      recommended > 0
        ? Math.round(recommended * projectHrs)
        : 0;

    const rateGap =
      current > 0 ? recommended - current : 0;

    const monthlyLoss =
      rateGap > 0 ? Math.round(rateGap * totalBillableHours) : 0;

    const yearlyLoss =
      monthlyLoss > 0 ? monthlyLoss * 12 : 0;

    const isUnderpricing =
      current > 0 && current < recommended;

    return {
      totalRequired,
      recommended,
      projectPrice,
      monthlyLoss,
      yearlyLoss,
      isUnderpricing,
    };
  }, [
    desiredIncome,
    monthlyExpenses,
    workingDays,
    billableHours,
    projectHours,
    currentRate,
    bufferPercent,
  ]);

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50 py-16 px-4">

      <div className="max-w-3xl mx-auto bg-white/80 backdrop-blur-lg shadow-2xl rounded-3xl p-10 space-y-8 border border-gray-200">

        {/* HEADER */}
        <div className="text-center space-y-3">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
            Freelance Rate Intelligence
          </h1>
          <p className="text-gray-600 text-lg">
            Structural pricing calculator for serious freelancers.
          </p>
        </div>

        {/* CURRENCY */}
        <div>
          <label className="block mb-3 font-semibold text-gray-800">
            Currency
          </label>
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            className="w-full p-4 border border-gray-300 rounded-2xl bg-white text-gray-900 font-medium shadow-sm focus:ring-2 focus:ring-indigo-600 focus:outline-none"
          >
            <option value="INR">INR (₹)</option>
            <option value="USD">USD ($)</option>
            <option value="EUR">EUR (€)</option>
            <option value="GBP">GBP (£)</option>
          </select>
        </div>

        {/* INPUTS */}
        <div className="space-y-6">

          <InputField
            label={`Desired Monthly Income (${symbol})`}
            value={desiredIncome}
            onChange={setDesiredIncome}
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

          <InputField
            label={`Your Current Hourly Rate (${symbol})`}
            value={currentRate}
            onChange={setCurrentRate}
          />

          {/* BUFFER */}
          <div>
            <label className="block mb-3 font-semibold text-gray-800">
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
              className="w-full accent-indigo-600"
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
          currencySymbol={symbol}
          totalRequired={calculations.totalRequired}
          recommendedHourlyRate={calculations.recommended}
          projectPrice={calculations.projectPrice}
          monthlyLoss={calculations.monthlyLoss}
          yearlyLoss={calculations.yearlyLoss}
          isUnderpricing={calculations.isUnderpricing}
        />

        <SubscribeForm />

      </div>
    </main>
  );
}
