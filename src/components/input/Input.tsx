import React from "react";
import {
  UseFormRegister,
  FieldErrors,
  RegisterOptions,
  Path,
  FieldValues,
} from "react-hook-form";
import "./input.css";

type InputProps<TFieldValues extends FieldValues> = {
  id: string;
  name: Path<TFieldValues>; // Utilisation de Path pour garantir une compatibilité stricte
  label: string;
  register: UseFormRegister<TFieldValues>;
  errors: FieldErrors<TFieldValues>;
  required?: boolean;
  type: string;
  validationSchema?: RegisterOptions<TFieldValues>;
  container_input?: string;
  classe?: string;
  value?: string;
  messRequired?: string;
  messMinLength?: string;
  messMaxLength?: string;
  messPattern?: string;
  messMax?: string;
  messMin?: string;
  messValidate?: string;
  onchange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  labelcss?: string;
};

const Input = <TFieldValues extends FieldValues>({
  id,
  name,
  label,
  register,
  errors,
  required = false,
  type,
  validationSchema = {},
  container_input = "",
  classe = "",
  value = "",
  messRequired = "This field is required",
  messMinLength,
  messMaxLength,
  messPattern,
  messMax,
  messMin,
  messValidate,
  onchange,
  labelcss = "",
}: InputProps<TFieldValues>) => {
  const errorType = errors?.[name]?.type;

  return (
    <div className={container_input}>
      <label className={labelcss} htmlFor={id}>
        {label}
        {required && " *"}
      </label>

      <input
        id={id}
        type={type}
        className={classe}
        defaultValue={value}
        {...register(name, validationSchema)}
        onChange={onchange}
      />
      <div className="error">
        {errorType === "required" && (
          <div className="text-danger h">{messRequired}</div>
        )}
        {errorType === "minLength" && (
          <div className="text-danger">{messMinLength}</div>
        )}
        {errorType === "maxLength" && (
          <div className="text-danger">{messMaxLength}</div>
        )}
        {errorType === "pattern" && (
          <div className="text-danger">{messPattern}</div>
        )}
        {errorType === "max" && <div className="text-danger">{messMax}</div>}
        {errorType === "min" && <div className="text-danger">{messMin}</div>}
        {errorType === "validate" && (
          <div className="text-red-500">{messValidate}</div>
        )}
      </div>
    </div>
  );
};

export default Input;
