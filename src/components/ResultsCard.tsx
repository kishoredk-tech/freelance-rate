type ResultsCardProps = {
  currencySymbol: string;
  totalRequired: number;
  recommendedHourlyRate: number;
  projectPrice: number;
  monthlyLoss: number;
  yearlyLoss: number;
  isUnderpricing: boolean;
};

export default function ResultsCard({
  currencySymbol,
  totalRequired,
  recommendedHourlyRate,
  projectPrice,
  monthlyLoss,
  yearlyLoss,
  isUnderpricing,
}: ResultsCardProps) {
  return (
    <div className="mt-8 p-8 bg-white rounded-3xl border border-gray-200 shadow-lg space-y-6">

      <div>
        <p className="text-gray-500 text-sm uppercase tracking-wide">
          Required Monthly Income
        </p>
        <p className="text-3xl font-bold text-gray-900">
          {currencySymbol} {totalRequired.toLocaleString()}
        </p>
      </div>

      <div>
        <p className="text-gray-500 text-sm uppercase tracking-wide">
          Recommended Hourly Rate
        </p>
        <p className="text-3xl font-bold text-indigo-600">
          {currencySymbol} {recommendedHourlyRate.toLocaleString()} / hour
        </p>
      </div>

      <div>
        <p className="text-gray-500 text-sm uppercase tracking-wide">
          Suggested Project Price
        </p>
        <p className="text-3xl font-bold text-gray-900">
          {currencySymbol} {projectPrice.toLocaleString()}
        </p>
      </div>

      {isUnderpricing && (
        <div className="p-5 bg-red-50 border border-red-200 rounded-2xl">
          <p className="font-semibold text-red-600 text-lg">
            You are undercharging.
          </p>
          <p className="mt-2 text-gray-700">
            Monthly loss: {currencySymbol} {monthlyLoss.toLocaleString()}
          </p>
          <p className="text-gray-700">
            Yearly loss: {currencySymbol} {yearlyLoss.toLocaleString()}
          </p>
        </div>
      )}
    </div>
  );
}
