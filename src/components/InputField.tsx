interface InputFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

export default function InputField({
  label,
  value,
  onChange,
}: InputFieldProps) {
  return (
    <div>
      <label className="block mb-1 font-medium">
        {label}
      </label>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full p-2 border rounded-lg"
      />
    </div>
  );
}
