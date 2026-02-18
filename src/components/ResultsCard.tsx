type ResultsCardProps = {
  currencySymbol: string;
  totalRequired: number;
  recommendedHourlyRate: number;
  projectPrice: number;
};

export default function ResultsCard({
  currencySymbol,
  totalRequired,
  recommendedHourlyRate,
  projectPrice,
}: ResultsCardProps) {
  return (
    <div className="mt-8 p-8 bg-gray-50 rounded-2xl shadow-inner space-y-6">

      <div>
        <p className="text-sm text-gray-500 uppercase">
          Required Monthly Income
        </p>
        <p className="text-2xl font-bold text-gray-800">
          {currencySymbol} {totalRequired}
        </p>
      </div>

      <div>
        <p className="text-sm text-gray-500 uppercase">
          Recommended Hourly Rate
        </p>
        <p className="text-2xl font-bold text-indigo-600">
          {currencySymbol} {recommendedHourlyRate} / hour
        </p>
      </div>

      <div>
        <p className="text-sm text-gray-500 uppercase">
          Suggested Project Price
        </p>
        <p className="text-2xl font-bold text-gray-800">
          {currencySymbol} {projectPrice}
        </p>
      </div>

    </div>
  );
}
