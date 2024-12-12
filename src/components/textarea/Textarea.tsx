import React from "react";
import { UseFormRegister, FieldErrors, FieldValues } from "react-hook-form";
import "./textarea.css";

type TextareaProps<T extends FieldValues> = {
  label: string;
  name: keyof T; // Associe le nom à une clé valide de T
  register: UseFormRegister<T>;
  validationSchema: object;
  errors: FieldErrors<T>;
  messRequired: string;
  messMinLength: string;
  messMaxLength: string;
  messPattern: string;
  messMax: string;
  messMin: string;
  messValidate: string;
  labelcss: string;
  classname: string;
};

const Textarea = <T extends FieldValues>({
  label,
  name,
  register,
  validationSchema,
  errors,
  messRequired,
  messMinLength,
  messMaxLength,
  messPattern,
  messMax,
  messMin,
  messValidate,
  labelcss,
  classname,
}: TextareaProps<T>) => {
  return (
    <>
      <label htmlFor={String(name)} className={labelcss}>
        {label}
      </label>
      <br />
      <div className="h-24">
        <textarea
          id={String(name)}
          {...register(name as any, validationSchema)} // Cast à cause des types génériques
          className={classname}
        />
        <div className="h-2.5">
          {errors[name]?.type === "required" && (
            <div className="text-red-500">{messRequired}</div>
          )}
          {errors[name]?.type === "minLength" && (
            <div className="text-red-500">{messMinLength}</div>
          )}
          {errors[name]?.type === "maxLength" && (
            <div className="text-red-500">{messMaxLength}</div>
          )}
          {errors[name]?.type === "pattern" && (
            <div className="text-red-500">{messPattern}</div>
          )}
          {errors[name]?.type === "max" && (
            <div className="text-red-500">{messMax}</div>
          )}
          {errors[name]?.type === "min" && (
            <div className="text-red-500">{messMin}</div>
          )}
          {errors[name]?.type === "validate" && (
            <div className="text-red-500">{messValidate}</div>
          )}
        </div>
      </div>
    </>
  );
};

export default Textarea;
