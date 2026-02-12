type InputFieldProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
};

export default function InputField({
  value,
  onChange,
  placeholder,
}: InputFieldProps) {
  return (
    <input
      type="number"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full p-3 border rounded-lg"
    />
  );
}
