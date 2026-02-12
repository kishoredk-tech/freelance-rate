type ResultsCardProps = {
  totalRequired: number;
  recommendedHourlyRate: number;
  projectPrice: number;
};

export default function ResultsCard({
  totalRequired,
  recommendedHourlyRate,
  projectPrice,
}: ResultsCardProps) {
  return (
    <div className="mt-8 p-6 bg-gray-50 rounded-xl space-y-4">
      <div>
        <p className="text-sm text-gray-500">
          Total Required Income
        </p>
        <p className="text-xl font-semibold text-green-600">
          ₹ {totalRequired}
        </p>
      </div>

      <div>
        <p className="text-sm text-gray-500">
          Recommended Hourly Rate
        </p>
        <p className="text-2xl font-bold text-blue-600">
          ₹ {recommendedHourlyRate} / hour
        </p>
      </div>

      <div>
        <p className="text-sm text-gray-500">
          Suggested Project Price
        </p>
        <p className="text-lg font-semibold">
          ₹ {projectPrice}
        </p>
      </div>
    </div>
  );
}
