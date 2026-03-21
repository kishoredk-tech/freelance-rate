"use client";

import { useState } from "react";
import InputField from "@/components/InputField";
import ResultsCard from "@/components/ResultsCard";
import { jsPDF } from "jspdf";
import { track } from "@vercel/analytics";

export default function Home() {
  const [currency, setCurrency] = useState("INR");

  const [desiredProfit, setDesiredProfit] = useState("");
  const [monthlyExpenses, setMonthlyExpenses] = useState("");

  const [workingDays, setWorkingDays] = useState("");
  const [billableHours, setBillableHours] = useState("");
  const [nonBillablePercent, setNonBillablePercent] = useState(30);

  const [projectHours, setProjectHours] = useState("");
  const [currentRate, setCurrentRate] = useState("");

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [unlocked, setUnlocked] = useState(false);

  const currencySymbols: Record<string, string> = {
    INR: "₹",
    USD: "$",
    EUR: "€",
    GBP: "£",
  };

  const symbol = currencySymbols[currency];

  // =============================
  // LOGIC
  // =============================

  const totalRequired =
    Number(desiredProfit || 0) + Number(monthlyExpenses || 0);

  const rawHours =
    Number(workingDays || 0) * Number(billableHours || 0);

  const effectiveBillableHours =
    rawHours * ((100 - nonBillablePercent) / 100);

  const recommendedHourlyRate =
    effectiveBillableHours > 0
      ? Math.round(totalRequired / effectiveBillableHours)
      : 0;

  const projectPrice =
    Math.round(recommendedHourlyRate * Number(projectHours || 0));

  const rateGap =
    recommendedHourlyRate - Number(currentRate || 0);

  const monthlyLoss =
    rateGap > 0 ? Math.round(rateGap * effectiveBillableHours) : 0;

  const yearlyLoss = monthlyLoss * 12;

  // =============================
  // PDF
  // =============================

  const generatePremiumPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(20);
    doc.text("Freelance Pricing Intelligence Report", 20, 20);

    doc.setFontSize(12);
    doc.text(`Monthly Expenses: ${symbol} ${monthlyExpenses}`, 20, 40);
    doc.text(`Desired Profit: ${symbol} ${desiredProfit}`, 20, 50);
    doc.text(`Total Target: ${symbol} ${totalRequired}`, 20, 60);

    doc.text(
      `Effective Billable Hours: ${Math.round(effectiveBillableHours)}`,
      20,
      80
    );

    doc.text(
      `Recommended Hourly Rate: ${symbol} ${recommendedHourlyRate}`,
      20,
      100
    );

    doc.text(`Project Price: ${symbol} ${projectPrice}`, 20, 115);

    if (rateGap > 0) {
      doc.text(`Undercharging by: ${symbol} ${rateGap}/hr`, 20, 135);
      doc.text(`Monthly Loss: ${symbol} ${monthlyLoss}`, 20, 145);
      doc.text(`Yearly Loss: ${symbol} ${yearlyLoss}`, 20, 155);
    }

    doc.save("Freelance-Pricing-Report.pdf");

    track("premium_report_downloaded");
  };

  // =============================
  // EMAIL GATE
  // =============================

  const handleUnlock = async () => {
    if (!email) return;

    setLoading(true);
    setSuccessMessage("");

    const res = await fetch("/api/subscribe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    if (res.ok) {
      track("email_conversion");
      setUnlocked(true);
      setSuccessMessage("Unlocked. Generating report...");
      generatePremiumPDF();
    } else {
      setSuccessMessage("Something went wrong. Try again.");
    }

    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-blue-100 py-16 px-6">
      <div className="max-w-3xl mx-auto bg-white/80 backdrop-blur-xl shadow-2xl rounded-3xl p-12 space-y-10 border border-white/40">

        {/* HEADER */}
        <div className="text-center space-y-3">
          <h1 className="text-4xl font-bold text-indigo-900">
            Freelance Rate Intelligence
          </h1>
          <p className="text-gray-600">
            Calculate your true freelance rate based on real capacity.
          </p>
        </div>

        {/* INPUTS */}
        <div className="space-y-6">

          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            className="w-full p-4 rounded-xl border border-indigo-300 bg-white text-indigo-900 font-semibold shadow-md"
          >
            <option value="INR">INR (₹)</option>
            <option value="USD">USD ($)</option>
            <option value="EUR">EUR (€)</option>
            <option value="GBP">GBP (£)</option>
          </select>

          <InputField
            label={`Monthly Business Expenses (${symbol})`}
            value={monthlyExpenses}
            onChange={setMonthlyExpenses}
          />

          <InputField
            label={`Desired Monthly Profit (${symbol})`}
            value={desiredProfit}
            onChange={setDesiredProfit}
          />

          <InputField label="Working Days per Month" value={workingDays} onChange={setWorkingDays} />
          <InputField label="Billable Hours per Day" value={billableHours} onChange={setBillableHours} />

          {/* NON BILLABLE SLIDER */}
          <div>
            <label className="block mb-2 font-semibold text-gray-800">
              Non-billable Time: {nonBillablePercent}%
            </label>
            <input
              type="range"
              min="0"
              max="60"
              value={nonBillablePercent}
              onChange={(e) => setNonBillablePercent(Number(e.target.value))}
              className="w-full"
            />
          </div>

          <InputField label={`Your Current Rate (${symbol})`} value={currentRate} onChange={setCurrentRate} />
          <InputField label="Project Estimated Hours" value={projectHours} onChange={setProjectHours} />
        </div>

        {/* RESULTS */}
        <ResultsCard
          currencySymbol={symbol}
          totalRequired={totalRequired}
          recommendedHourlyRate={recommendedHourlyRate}
          projectPrice={projectPrice}
          rateGap={rateGap}
          monthlyLoss={monthlyLoss}
          yearlyLoss={yearlyLoss}
          effectiveHours={effectiveBillableHours}
          unlocked={unlocked}
        />

        {/* PREMIUM */}
        {!unlocked && (
          <div className="mt-12 p-10 rounded-3xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white space-y-6 shadow-xl">

            <h2 className="text-2xl font-semibold text-center">
              Unlock Full Pricing Breakdown
            </h2>

            <p className="text-sm text-center opacity-90">
              Includes revenue leakage, effective rate, and strategy insights
            </p>

            <input
              type="email"
              placeholder="Enter your professional email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-4 rounded-xl text-gray-900"
            />

            <button
              onClick={handleUnlock}
              disabled={loading}
              className="w-full py-4 rounded-xl font-semibold text-lg bg-white text-indigo-700"
            >
              {loading ? "Processing..." : "Unlock Premium Insights"}
            </button>

            {successMessage && (
              <p className="text-center text-sm">{successMessage}</p>
            )}

          </div>
        )}

      </div>
    </main>
  );
}