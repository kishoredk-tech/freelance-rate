type InputFieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
};

export default function InputField({
  label,
  value,
  onChange,
}: InputFieldProps) {
  return (
    <div>
      <label className="block mb-3 font-semibold text-gray-800">
        {label}
      </label>

      <input
        type="number"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full p-4 border border-gray-300 rounded-2xl bg-white text-gray-900 text-lg font-medium shadow-sm focus:ring-2 focus:ring-indigo-600 focus:outline-none"
      />
    </div>
  );
}
