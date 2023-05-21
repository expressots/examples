import { useId, useRef } from "react";
import { twMerge } from "tailwind-merge";

// types
import type { TInput } from "./types";

// ::
const Input = ({ label, classLabel, ...rest }: TInput) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const inputId = useId();

  const handleInputClick = () => {
    inputRef.current?.focus();
  };

  return (
    <div
      onClick={handleInputClick}
      className="flex flex-col justify-start items-start w-full gap-2 relative"
    >
      <input
        ref={inputRef}
        placeholder={rest.placeholder || ""}
        className={twMerge(
          "border-2 border-b-8 border-base-300 peer bg-base-200 placeholder:text-base-200-content text-base-200-content w-full p-2 outline-none rounded-md shadow-md",
          rest.className,
        )}
        {...rest}
        id={`${inputId}-${label}`}
      />
      {label && (
        <label
          className={twMerge(
            "transition-all top-[-25px] peer-focus-within:top-[-25px] absolute peer-placeholder-shown:top-2 left-2",
            classLabel,
          )}
          htmlFor={inputId}
        >
          {label}
        </label>
      )}
    </div>
  );
};

export default Input;
