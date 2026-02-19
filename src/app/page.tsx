"use client";

import { useState } from "react";
import InputField from "@/components/InputField";
import ResultsCard from "@/components/ResultsCard";
import { jsPDF } from "jspdf";
import { track } from "@vercel/analytics";

export default function Home() {
  const [currency, setCurrency] = useState("INR");
  const [desiredIncome, setDesiredIncome] = useState("");
  const [monthlyExpenses, setMonthlyExpenses] = useState("");
  const [workingDays, setWorkingDays] = useState("");
  const [billableHours, setBillableHours] = useState("");
  const [projectHours, setProjectHours] = useState("");
  const [currentRate, setCurrentRate] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const currencySymbols: Record<string, string> = {
    INR: "₹",
    USD: "$",
    EUR: "€",
    GBP: "£",
  };

  const symbol = currencySymbols[currency];

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
  // PREMIUM EXECUTIVE PDF
  // =============================

  const generatePremiumPDF = () => {
    const doc = new jsPDF();
    const today = new Date().toLocaleDateString();

    // COVER
    doc.setFillColor(30, 58, 138);
    doc.rect(0, 0, 210, 297, "F");

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(28);
    doc.text("Freelance Pricing Intelligence", 105, 90, { align: "center" });

    doc.setFontSize(16);
    doc.text("Executive Strategic Report", 105, 105, { align: "center" });

    doc.setFontSize(12);
    doc.text(`Prepared for: ${email}`, 105, 125, { align: "center" });
    doc.text(`Date: ${today}`, 105, 135, { align: "center" });

    doc.setFontSize(10);
    doc.text(
      "Kishore Devanga Kothavaru • Senior Software Engineer",
      105,
      270,
      { align: "center" }
    );

    // PAGE 2
    doc.addPage();
    doc.setTextColor(0, 0, 0);

    doc.setFontSize(20);
    doc.text("Financial Overview", 20, 30);
    doc.line(20, 35, 190, 35);

    doc.setFontSize(13);
    doc.text(`Required Monthly Income: ${symbol} ${totalRequired}`, 20, 55);
    doc.text(`Recommended Hourly Rate: ${symbol} ${recommendedHourlyRate}`, 20, 70);
    doc.text(`Suggested Project Price: ${symbol} ${projectPrice}`, 20, 85);

    // PAGE 3
    doc.addPage();
    doc.setFontSize(20);
    doc.text("Pricing Diagnosis & Strategy", 20, 30);
    doc.line(20, 35, 190, 35);

    doc.setFontSize(13);

    if (rateGap > 0) {
      doc.text(`Undercharging by: ${symbol} ${rateGap}/hour`, 20, 55);
      doc.text(`Monthly Loss: ${symbol} ${monthlyLoss}`, 20, 70);
      doc.text(`Yearly Loss: ${symbol} ${yearlyLoss}`, 20, 85);

      doc.text("Strategic Recommendations:", 20, 110);
      doc.text("- Increase pricing in structured increments.", 20, 125);
      doc.text("- Anchor pricing around value, not time.", 20, 140);
      doc.text("- Avoid competing on price alone.", 20, 155);
    } else {
      doc.text("Your pricing appears structurally aligned.", 20, 55);
    }

    doc.setFontSize(10);
    doc.text("Pricing is structural. Not emotional.", 20, 270);

    doc.save("Freelance-Rate-Intelligence-Report.pdf");

    track("premium_report_downloaded");
  };

  // =============================
  // EMAIL GATED DOWNLOAD
  // =============================

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
      setSuccessMessage("Email verified. Generating your report...");
      generatePremiumPDF();
    } else {
      setSuccessMessage("Subscription failed. Try again.");
    }

    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-blue-100 py-16 px-6">
      <div className="max-w-3xl mx-auto backdrop-blur-lg bg-white/80 shadow-2xl rounded-3xl p-12 space-y-10 border border-white/40">

        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-indigo-900">
            Freelance Rate Intelligence
          </h1>
          <p className="text-gray-600 text-lg">
            Strategic pricing calculator for serious freelancers.
          </p>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block mb-2 font-semibold text-indigo-800">
              Currency
            </label>
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="w-full p-4 rounded-xl border border-indigo-300 bg-white text-indigo-900 font-semibold shadow-md focus:ring-2 focus:ring-indigo-600"
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

        <div className="mt-12 p-10 rounded-3xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white space-y-6 shadow-xl">

          <h2 className="text-2xl font-semibold text-center">
            Download Your Executive Pricing Report
          </h2>

          <input
            type="email"
            placeholder="Enter your professional email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-4 rounded-xl text-gray-900 placeholder-gray-400"
          />

          <button
            onClick={handleUnlock}
            disabled={loading}
            className="w-full py-4 rounded-xl font-semibold text-lg bg-white text-indigo-700 hover:opacity-90 transition"
          >
            {loading ? "Processing..." : "Generate Premium Report"}
          </button>

          {successMessage && (
            <p className="text-center text-sm font-medium">
              {successMessage}
            </p>
          )}
        </div>

      </div>
    </main>
  );
}
