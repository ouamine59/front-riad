import React from "react";
import { UseFormRegister, FieldValues, FieldErrors } from "react-hook-form";

type InputProps = {
  id: string;
  name: string;
  label: string;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
  required?: boolean;
  type: string;
  validationSchema?: Record<string, unknown>;
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

const Input: React.FC<InputProps> = ({
  id,
  name,
  label,
  register,
  errors,
  required = false,
  type,
  validationSchema = {},
  container_input = "", // Classe par défaut pour le conteneur
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
}) => {
  // Vérification des erreurs pour ce champ spécifique
  const errorType = errors?.[name]?.type;

  return (
    <div className={container_input}>
      <label className={labelcss} htmlFor={id}>
        {label}
        {required && " *"} {/* Affiche une étoile si le champ est requis */}
      </label>
      <input
        id={id}
        type={type}
        className={classe}
        defaultValue={value}
        {...register(name, validationSchema)}
        onChange={onchange}
      />
      {/* Gestion des messages d'erreur */}
      <div className="h-2.5">
        {errorType === "required" && (
          <div className="text-red-500">{messRequired}</div>
        )}
        {errorType === "minLength" && (
          <div className="text-red-500">{messMinLength}</div>
        )}
        {errorType === "maxLength" && (
          <div className="text-red-500">{messMaxLength}</div>
        )}
        {errorType === "pattern" && (
          <div className="text-red-500">{messPattern}</div>
        )}
        {errorType === "max" && <div className="text-red-500">{messMax}</div>}
        {errorType === "min" && <div className="text-red-500">{messMin}</div>}
        {errorType === "validate" && (
          <div className="text-red-500">{messValidate}</div>
        )}
      </div>
    </div>
  );
};

export default Input;
