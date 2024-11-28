import React from "react";
import { UseFormRegister, FieldValues } from "react-hook-form";

interface SelectInputProps {
  label?: string;
  options: { value: string | number; label: string }[];
  name: string;
  validationSchema: object;
  register: UseFormRegister<FieldValues>;
  defaultValue?: string | number; // Utilisez defaultValue à la place de value
  className: string;
}

const SelectInput: React.FC<SelectInputProps> = ({
  label,
  options,
  name,
  validationSchema,
  register,
  defaultValue,
  className,
}) => {
  return (
    <div>
      {label && <label htmlFor={name}>{label}</label>}
      <select
        id={name}
        defaultValue={defaultValue} // Remplacez value par defaultValue
        {...register(name, validationSchema)}
        className={className}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectInput;
