import { useState } from "react";
import Icon from "./Icon";

function FormInput({
  label,
  id,
  type = "text",
  placeholder,
  icon,
  register,
  name,
  error,
  rules,
  as = "input",
  rows = 4,
  options = [],
  defaultValue,
  disabled = false,
  readOnly = false,
}) {
  const isPassword = type === "password";
  const [showPassword, setShowPassword] = useState(false);

  const baseClasses = `
    w-full border-2 p-3 rounded-2xl text-lg outline-none
    transition-colors font-light resize-none
    ${icon && as === "input" ? "pl-12" : "pl-3"}
    ${isPassword ? "pr-12" : "pr-3"}
    ${
      disabled
        ? "bg-gray-100 cursor-not-allowed border-gray-300"
        : error
        ? "border-red-500"
        : "bg-white border-[#F4F0F0] group-hover:border-[#F43F5E] focus:border-[#F43F5E]"
    }
  `;

  return (
    <div className="w-full flex gap-1 flex-col">
      {label && (
        <label htmlFor={id} className="text-xl">
          {label}
        </label>
      )}

      <div className="relative group">
        {/* INPUT */}
        {as === "input" && (
          <input
            id={id}
            type={isPassword && showPassword ? "text" : type}
            placeholder={placeholder}
            defaultValue={defaultValue}
            disabled={disabled}
            readOnly={readOnly}
            {...register(name, rules)}
            className={baseClasses}
          />
        )}

        {/* TEXTAREA */}
        {as === "textarea" && (
          <textarea
            id={id}
            rows={rows}
            placeholder={placeholder}
            defaultValue={defaultValue}
            disabled={disabled}
            readOnly={readOnly}
            {...register(name, rules)}
            className={baseClasses}
          />
        )}

        {/* SELECT */}
        {as === "select" && (
          <select
            id={id}
            defaultValue={defaultValue}
            disabled={disabled}
            {...register(name, rules)}
            className={baseClasses}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        )}

        {/* Left icon */}
        {icon && as === "input" && (
          <Icon
            name={icon}
            className="
              absolute top-1/2 left-4 -translate-y-1/2
              text-gray-400 transition-colors
              group-hover:text-[#F43F5E]
              group-focus-within:text-[#F43F5E]
            "
          />
        )}

        {/* Password toggle */}
        {isPassword && as === "input" && !disabled && !readOnly && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="
              absolute top-1/2 right-4 -translate-y-1/2
              text-gray-400 hover:text-[#F43F5E]
            "
          >
            <Icon name={showPassword ? "oneye-outline" : "offeye-outline"} />
          </button>
        )}
      </div>

      {error && <span className="text-red-500 text-sm">{error.message}</span>}
    </div>
  );
}

export default FormInput;
