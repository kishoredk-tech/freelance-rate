"use client";

type ResultsCardProps = {
  currencySymbol: string;
  totalRequired: number;
  recommendedHourlyRate: number;
  projectPrice: number;
  rateGap: number;
  monthlyLoss: number;
  yearlyLoss: number;
  effectiveHours: number; // ✅ THIS WAS MISSING
  unlocked: boolean;
};

export default function ResultsCard({
  currencySymbol,
  totalRequired,
  recommendedHourlyRate,
  projectPrice,
  rateGap,
  monthlyLoss,
  yearlyLoss,
  effectiveHours,
  unlocked,
}: ResultsCardProps) {
  return (
    <div className="mt-10 p-8 bg-white rounded-3xl shadow-2xl border border-gray-100 space-y-8">

      {/* TOP */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        <div className="p-6 rounded-2xl bg-gray-50 border">
          <p className="text-xs text-gray-500 uppercase">Required Monthly Revenue</p>
          <p className="text-2xl font-bold text-gray-900">
            {currencySymbol} {totalRequired}
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-indigo-50 border border-indigo-200">
          <p className="text-xs text-indigo-600 uppercase">Hourly Rate</p>
          <p className="text-2xl font-bold text-indigo-700">
            {currencySymbol} {recommendedHourlyRate} / hr
          </p>
        </div>

      </div>

      {/* SECOND */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        <div className="p-6 rounded-2xl bg-gray-50 border">
          <p className="text-xs text-gray-500 uppercase">Project Price</p>
          <p className="text-2xl font-bold text-gray-900">
            {currencySymbol} {projectPrice}
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-yellow-50 border border-yellow-200">
          <p className="text-xs text-yellow-700 uppercase">Effective Hours</p>
          <p className="text-2xl font-bold text-yellow-800">
            {Math.round(effectiveHours)} hrs/month
          </p>
        </div>

      </div>

      {/* PREMIUM */}
      <div className="relative p-6 rounded-2xl bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200">

        {!unlocked && (
          <div className="absolute inset-0 bg-white/70 backdrop-blur-md flex items-center justify-center rounded-2xl text-center px-4">
            <p className="font-semibold text-indigo-800">
              🔒 Unlock Premium Diagnosis
            </p>
          </div>
        )}

        <p className="font-semibold text-indigo-800 mb-3">
          Pricing Diagnosis
        </p>

        {rateGap > 0 ? (
          <div className="space-y-1 text-indigo-900">
            <p>Undercharging: {currencySymbol} {rateGap}/hr</p>
            <p>Monthly Loss: {currencySymbol} {monthlyLoss}</p>
            <p>Yearly Loss: {currencySymbol} {yearlyLoss}</p>
          </div>
        ) : (
          <p className="text-indigo-900">
            Your pricing is aligned.
          </p>
        )}

      </div>

    </div>
  );
}