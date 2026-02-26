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
  const [unlocked, setUnlocked] = useState(false);

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
  // EXECUTIVE PDF
  // =============================

  const generatePremiumPDF = () => {
    const doc = new jsPDF();
    const today = new Date().toLocaleDateString();

    // COVER
    doc.setFillColor(49, 46, 129);
    doc.rect(0, 0, 210, 297, "F");

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(26);
    doc.text("Freelance Pricing Intelligence", 105, 85, { align: "center" });

    doc.setFontSize(16);
    doc.text("Executive Strategic Report", 105, 100, { align: "center" });

    doc.setFontSize(12);
    doc.text(`Prepared for: ${email}`, 105, 120, { align: "center" });
    doc.text(`Generated on: ${today}`, 105, 130, { align: "center" });

    doc.setFontSize(10);
    doc.text(
      "Prepared by Kishore Devanga Kothavaru • Senior Software Engineer",
      105,
      270,
      { align: "center" }
    );

    // PAGE 2 – FINANCIALS
    doc.addPage();
    doc.setTextColor(0, 0, 0);

    doc.setFontSize(20);
    doc.text("Financial Overview", 20, 30);
    doc.line(20, 35, 190, 35);

    doc.setFontSize(13);
    doc.text(`Target Monthly Income: ${symbol} ${totalRequired}`, 20, 55);
    doc.text(`Recommended Hourly Rate: ${symbol} ${recommendedHourlyRate}`, 20, 70);
    doc.text(`Estimated Project Price: ${symbol} ${projectPrice}`, 20, 85);

    // PAGE 3 – DIAGNOSIS
    doc.addPage();
    doc.setFontSize(20);
    doc.text("Pricing Diagnosis", 20, 30);
    doc.line(20, 35, 190, 35);

    doc.setFontSize(13);

    if (rateGap > 0) {
      doc.text(`You are undercharging by ${symbol} ${rateGap}/hour.`, 20, 55);
      doc.text(`Monthly Revenue Leakage: ${symbol} ${monthlyLoss}`, 20, 70);
      doc.text(`Yearly Revenue Leakage: ${symbol} ${yearlyLoss}`, 20, 85);

      doc.text("Strategic Recommendations:", 20, 110);
      doc.text("- Raise pricing gradually in structured increments.", 20, 125);
      doc.text("- Anchor pricing to value delivered.", 20, 140);
      doc.text("- Stop competing purely on price.", 20, 155);
      doc.text("- Position yourself as premium, not affordable.", 20, 170);
    } else {
      doc.text("Your pricing appears structurally aligned.", 20, 55);
    }

    doc.setFontSize(10);
    doc.text("Pricing is structural. Not emotional.", 20, 270);

    doc.save("Freelance-Pricing-Executive-Report.pdf");

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
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    if (res.ok) {
      track("email_conversion");
      setUnlocked(true);
      setSuccessMessage("Email verified. Premium insights unlocked.");
      generatePremiumPDF();
    } else {
      setSuccessMessage("Something went wrong. Try again.");
    }

    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-blue-100 py-16 px-6">
      <div className="max-w-3xl mx-auto bg-white/80 backdrop-blur-xl shadow-2xl rounded-3xl p-12 space-y-10 border border-white/40">

        <div className="text-center space-y-3">
          <h1 className="text-4xl font-bold text-indigo-900">
            Freelance Rate Intelligence
          </h1>
          <p className="text-gray-600">
            Strategic pricing calculator for serious freelancers.
          </p>
        </div>

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
          rateGap={rateGap}
          monthlyLoss={monthlyLoss}
          yearlyLoss={yearlyLoss}
          unlocked={unlocked}
        />

        {!unlocked && (
          <div className="mt-12 p-10 rounded-3xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white space-y-6 shadow-xl">

            <h2 className="text-2xl font-semibold text-center">
              Unlock Premium Pricing Diagnosis
            </h2>

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