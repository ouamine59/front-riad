import React from "react";
import {
  UseFormRegister,
  RegisterOptions,
  FieldValues,
  Path,
} from "react-hook-form";
import "./selectinput.css";

interface SelectInputProps<T extends FieldValues> {
  label?: string;
  options: { value: string | number; label: string }[];
  name: Path<T>; // Utilisation de Path<T> pour les champs de formulaire
  validationSchema?: RegisterOptions<T>;
  register: UseFormRegister<T>;
  defaultValue?: string | number;
  className: string;
  id: string;
  onchange?: (option: { value: string | number; label: string }) => void;
}

const SelectInput = <T extends FieldValues>({
  label,
  options,
  name,
  validationSchema,
  register,
  defaultValue,
  className,
  id,
  onchange,
}: SelectInputProps<T>) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOption = options.find(
      (option) => option.value === e.target.value,
    );
    if (onchange && selectedOption) {
      onchange(selectedOption);
    }
  };

  return (
    <div className="d-flex flex-column">
      {label && <label htmlFor={id}>{label}</label>}
      <select
        id={id}
        defaultValue={defaultValue}
        {...register(name, validationSchema)}
        className={className}
        onChange={handleChange} // Utilisation de handleChange ici
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
