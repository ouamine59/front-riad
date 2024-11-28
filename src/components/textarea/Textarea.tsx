import React from "react";
import { UseFormRegister, FieldValues, FieldErrors } from "react-hook-form";

type TextareaProps = {
  label: string;
  name: string;

  register: UseFormRegister<FieldValues>;
  validationSchema: object;
  errors: FieldErrors<FieldValues>;
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

const Textarea: React.FC<TextareaProps> = ({
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
}) => {
  return (
    <>
      <label className={labelcss}>{label}</label>
      <div className="h-24">
        <textarea
          id={name}
          {...register(name, validationSchema)}
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
