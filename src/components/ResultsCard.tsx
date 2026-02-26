type ResultsCardProps = {
  currencySymbol: string;
  totalRequired: number;
  recommendedHourlyRate: number;
  projectPrice: number;
  rateGap: number;
  monthlyLoss: number;
  yearlyLoss: number;
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
  unlocked,
}: ResultsCardProps) {
  return (
    <div className="mt-8 p-8 bg-white rounded-2xl shadow-xl space-y-6 border">

      <div>
        <p className="text-sm text-gray-500 uppercase">Required Monthly Income</p>
        <p className="text-2xl font-bold text-gray-800">
          {currencySymbol} {totalRequired}
        </p>
      </div>

      <div>
        <p className="text-sm text-gray-500 uppercase">Recommended Hourly Rate</p>
        <p className="text-2xl font-bold text-indigo-600">
          {currencySymbol} {recommendedHourlyRate} / hour
        </p>
      </div>

      <div>
        <p className="text-sm text-gray-500 uppercase">Suggested Project Price</p>
        <p className="text-2xl font-bold text-gray-800">
          {currencySymbol} {projectPrice}
        </p>
      </div>

      {/* PREMIUM SECTION */}

      <div className="relative mt-6 p-6 rounded-xl bg-indigo-50 border border-indigo-200">

        {!unlocked && (
          <div className="absolute inset-0 backdrop-blur-md bg-white/60 flex items-center justify-center rounded-xl">
            <p className="font-semibold text-indigo-800">
              Premium Pricing Diagnosis Locked
            </p>
          </div>
        )}

        <p className="font-semibold text-indigo-800 mb-2">
          Pricing Diagnosis
        </p>

        {rateGap > 0 ? (
          <div className="space-y-1 text-indigo-900">
            <p>Undercharging by: {currencySymbol} {rateGap}/hour</p>
            <p>Monthly Revenue Loss: {currencySymbol} {monthlyLoss}</p>
            <p>Yearly Revenue Loss: {currencySymbol} {yearlyLoss}</p>
          </div>
        ) : (
          <p className="text-indigo-900">
            Your pricing structure appears aligned.
          </p>
        )}

      </div>
    </div>
  );
}