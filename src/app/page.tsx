"use client";

import { useState } from "react";
import InputField from "@/components/InputField";
import ResultsCard from "@/components/ResultsCard";
import { jsPDF } from "jspdf";

export default function Home() {

  const [currency, setCurrency] = useState("INR");
  const [desiredIncome, setDesiredIncome] = useState("");
  const [monthlyExpenses, setMonthlyExpenses] = useState("");
  const [workingDays, setWorkingDays] = useState("");
  const [billableHours, setBillableHours] = useState("");
  const [projectHours, setProjectHours] = useState("");
  const [currentRate, setCurrentRate] = useState("");
  const [email, setEmail] = useState("");

  const currencySymbols: Record<string, string> = {
    INR: "₹",
    USD: "$",
    EUR: "€",
    GBP: "£",
  };

  const symbol = currencySymbols[currency];

  // =============================
  // BUSINESS LOGIC
  // =============================

  const totalRequired =
    Number(desiredIncome || 0) + Number(monthlyExpenses || 0);

  const totalBillableHours =
    Number(workingDays || 0) * Number(billableHours || 0);

  const recommendedHourlyRate =
    totalBillableHours > 0
      ? Math.round(totalRequired / totalBillableHours)
      : 0;

  const projectPrice =
    Math.round(recommendedHourlyRate * Number(projectHours || 0));

  const rateGap =
    recommendedHourlyRate - Number(currentRate || 0);

  const monthlyLoss =
    rateGap > 0 ? Math.round(rateGap * totalBillableHours) : 0;

  const yearlyLoss = monthlyLoss * 12;

  // =============================
  // PREMIUM PDF GENERATOR (v2 EXECUTIVE STYLE)
  // =============================

  const generatePremiumPDF = () => {

    const doc = new jsPDF();

    const today = new Date().toLocaleDateString();

    // ---------- PAGE 1 (COVER) ----------

    doc.setFillColor(30, 41, 59);
    doc.rect(0, 0, 210, 297, "F");

    doc.setTextColor(255, 255, 255);

    doc.setFontSize(26);
    doc.text("Freelance Rate Intelligence", 105, 80, { align: "center" });

    doc.setFontSize(16);
    doc.text("Pricing Intelligence Report", 105, 95, { align: "center" });

    doc.setFontSize(12);
    doc.text(`Generated on: ${today}`, 105, 110, { align: "center" });

    doc.setFontSize(11);
    doc.text("Prepared for:", 105, 130, { align: "center" });
    doc.text(email, 105, 140, { align: "center" });

    doc.setFontSize(10);
    doc.text("By Kishore Devanga Kothavaru", 105, 260, { align: "center" });


    // ---------- PAGE 2 (REPORT) ----------

    doc.addPage();
    doc.setTextColor(0, 0, 0);

    doc.setFontSize(20);
    doc.text("Financial Overview", 20, 25);

    doc.setDrawColor(100);
    doc.line(20, 30, 190, 30);

    doc.setFontSize(13);
    doc.text(`Required Monthly Income: ${symbol} ${totalRequired}`, 20, 45);
    doc.text(`Recommended Hourly Rate: ${symbol} ${recommendedHourlyRate}`, 20, 60);
    doc.text(`Suggested Project Price: ${symbol} ${projectPrice}`, 20, 75);

    doc.setFontSize(18);
    doc.text("Pricing Diagnosis", 20, 105);
    doc.line(20, 110, 190, 110);

    doc.setFontSize(12);

    if (rateGap > 0) {
      doc.text(
        `You are undercharging by ${symbol} ${rateGap} per hour.`,
        20,
        125
      );

      doc.text(
        `Estimated Monthly Revenue Loss: ${symbol} ${monthlyLoss}`,
        20,
        140
      );

      doc.text(
        `Estimated Yearly Revenue Loss: ${symbol} ${yearlyLoss}`,
        20,
        155
      );
    } else {
      doc.text(
        "Your pricing structure appears aligned.",
        20,
        125
      );
    }

    doc.setFontSize(10);
    doc.text(
      "Pricing is structural. Not emotional.",
      20,
      270
    );

    doc.save("Freelance-Rate-Intelligence-Report.pdf");
  };

  const handleUnlock = () => {
    if (!email) return;
    generatePremiumPDF();
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50 py-14 px-6">
      <div className="max-w-3xl mx-auto bg-white shadow-2xl rounded-3xl p-12 space-y-10">

        <div className="text-center space-y-3">
          <h1 className="text-4xl font-bold text-gray-900">
            Freelance Rate Intelligence
          </h1>
          <p className="text-gray-600">
            Structural pricing calculator for serious freelancers.
          </p>
        </div>

        <div className="space-y-6">

          <div>
            <label className="block mb-2 font-semibold text-gray-700">
              Currency
            </label>
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="w-full p-3 rounded-xl border border-gray-300 bg-white text-gray-900 font-medium shadow-sm focus:ring-2 focus:ring-indigo-500"
            >
              <option value="INR">INR (₹)</option>
              <option value="USD">USD ($)</option>
              <option value="EUR">EUR (€)</option>
              <option value="GBP">GBP (£)</option>
            </select>
          </div>

          <InputField label={`Desired Monthly Income (${symbol})`} value={desiredIncome} onChange={setDesiredIncome} />
          <InputField label={`Monthly Expenses (${symbol})`} value={monthlyExpenses} onChange={setMonthlyExpenses} />
          <InputField label="Working Days per Month" value={workingDays} onChange={setWorkingDays} />
          <InputField label="Billable Hours per Day" value={billableHours} onChange={setBillableHours} />
          <InputField label={`Your Current Hourly Rate (${symbol})`} value={currentRate} onChange={setCurrentRate} />
          <InputField label="Project Estimated Hours" value={projectHours} onChange={setProjectHours} />

        </div>

        <ResultsCard
          currencySymbol={symbol}
          totalRequired={totalRequired}
          recommendedHourlyRate={recommendedHourlyRate}
          projectPrice={projectPrice}
        />

        {rateGap > 0 && (
          <div className="p-6 bg-red-50 border border-red-200 rounded-xl">
            <p className="font-semibold text-red-700">You are undercharging.</p>
            <p className="mt-2 text-red-600">Monthly Loss: {symbol} {monthlyLoss}</p>
            <p className="text-red-600">Yearly Loss: {symbol} {yearlyLoss}</p>
          </div>
        )}

        <div className="mt-12 p-10 rounded-3xl bg-gradient-to-r from-indigo-900 to-slate-900 text-white space-y-6 shadow-xl">

          <h2 className="text-2xl font-semibold text-center">
            Unlock Premium Pricing Intelligence Report
          </h2>

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-4 rounded-xl bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />

          <button
            onClick={handleUnlock}
            className="w-full py-4 rounded-xl font-semibold text-lg bg-gradient-to-r from-indigo-500 to-purple-600 hover:opacity-90 transition"
          >
            Download Premium Report (PDF)
          </button>

        </div>

      </div>
    </main>
  );
}
