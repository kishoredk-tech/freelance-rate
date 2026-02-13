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
    <div className="space-y-1">
      <label className="block text-sm font-medium text-gray-800">
        {label}
      </label>

      <input
        type="number"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full p-3 border border-gray-400 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
      />
    </div>
  );
}
