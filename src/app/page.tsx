"use client";

import { useState } from "react";
import InputField from "@/components/InputField";
import ResultsCard from "@/components/ResultsCard";
import { jsPDF } from "jspdf";
import { track } from "@vercel/analytics";

export default function Home() {
  const [currency, setCurrency] = useState("INR");

  // 🔥 renamed (no logic break)
  const [desiredProfit, setDesiredProfit] = useState("");
  const [monthlyExpenses, setMonthlyExpenses] = useState("");

  const [workingDays, setWorkingDays] = useState("");
  const [billableHours, setBillableHours] = useState("");

  // 🔥 NEW
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
  // 🔥 UPDATED LOGIC (ENHANCED)
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
  // PDF (ENHANCED)
  // =============================

  const generatePremiumPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Freelance Pricing Report", 20, 20);

    doc.setFontSize(12);

    doc.text(`Expenses: ${symbol} ${monthlyExpenses}`, 20, 40);
    doc.text(`Desired Profit: ${symbol} ${desiredProfit}`, 20, 50);
    doc.text(`Total Target: ${symbol} ${totalRequired}`, 20, 60);

    doc.text(
      `Effective Billable Hours: ${Math.round(effectiveBillableHours)}`,
      20,
      80
    );

    doc.text(
      `Recommended Rate: ${symbol} ${recommendedHourlyRate}/hr`,
      20,
      100
    );

    doc.text(`Project Price: ${symbol} ${projectPrice}`, 20, 115);

    if (rateGap > 0) {
      doc.text(`Undercharging: ${symbol} ${rateGap}/hr`, 20, 135);
      doc.text(`Monthly Loss: ${symbol} ${monthlyLoss}`, 20, 145);
    }

    doc.save("pricing-report.pdf");

    track("premium_report_downloaded");
  };

  const handleUnlock = async () => {
    if (!email) return;

    setLoading(true);
    setSuccessMessage("");

    const res = await fetch("/api/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    if (res.ok) {
      track("email_conversion");
      setUnlocked(true);
      setSuccessMessage("Unlocked. Generating report...");
      generatePremiumPDF();
    } else {
      setSuccessMessage("Something went wrong.");
    }

    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-blue-100 py-16 px-6">
      <div className="max-w-3xl mx-auto bg-white/80 backdrop-blur-xl shadow-2xl rounded-3xl p-12 space-y-10 border border-white/40">

        <h1 className="text-4xl font-bold text-indigo-900 text-center">
          Freelance Rate Intelligence
        </h1>

        <div className="space-y-6">

          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            className="w-full p-4 rounded-xl border border-indigo-300"
          >
            <option value="INR">INR (₹)</option>
            <option value="USD">USD ($)</option>
            <option value="EUR">EUR (€)</option>
            <option value="GBP">GBP (£)</option>
          </select>

          <InputField
            label={`Monthly Expenses (${symbol})`}
            value={monthlyExpenses}
            onChange={setMonthlyExpenses}
          />

          <InputField
            label={`Desired Profit (${symbol})`}
            value={desiredProfit}
            onChange={setDesiredProfit}
          />

          <InputField label="Working Days" value={workingDays} onChange={setWorkingDays} />
          <InputField label="Hours per Day" value={billableHours} onChange={setBillableHours} />

          {/* 🔥 NEW SLIDER */}
          <div>
            <label className="font-semibold">
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

          <InputField label={`Current Rate (${symbol})`} value={currentRate} onChange={setCurrentRate} />
          <InputField label="Project Hours" value={projectHours} onChange={setProjectHours} />
        </div>

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

        {!unlocked && (
          <div className="p-8 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl">

            <h2 className="text-xl font-semibold text-center">
              Unlock Full Pricing Breakdown
            </h2>

            <p className="text-sm text-center mt-2">
              Includes loss analysis, effective rate & strategy insights
            </p>

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 mt-4 rounded text-black"
            />

            <button
              onClick={handleUnlock}
              className="w-full mt-4 bg-white text-indigo-700 p-3 rounded font-semibold"
            >
              {loading ? "Processing..." : "Unlock Report"}
            </button>

            {successMessage && <p className="mt-2 text-center">{successMessage}</p>}
          </div>
        )}
      </div>
    </main>
  );
}