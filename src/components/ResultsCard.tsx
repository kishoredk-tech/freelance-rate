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
    <div className="mt-8 p-6 bg-gray-100 rounded-xl space-y-4">
      <div>
        <p className="text-sm text-gray-700">
          Total Required Income
        </p>
        <p className="text-xl font-bold text-green-600">
          {currencySymbol} {totalRequired}
        </p>
      </div>

      <div>
        <p className="text-sm text-gray-700">
          Recommended Hourly Rate
        </p>
        <p className="text-xl font-bold text-blue-600">
          {currencySymbol} {recommendedHourlyRate} / hour
        </p>
      </div>

      <div>
        <p className="text-sm text-gray-700">
          Suggested Project Price
        </p>
        <p className="text-xl font-bold text-gray-900">
          {currencySymbol} {projectPrice}
        </p>
      </div>
    </div>
  );
}
