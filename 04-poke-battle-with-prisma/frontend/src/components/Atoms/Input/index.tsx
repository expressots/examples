import { useId } from "react";

// types
import type { TInput } from "./types";

// ::
const Input = ({ label, ...rest }: TInput) => {
  const inputId = useId();

  return (
    <div className="flex flex-col justify-start items-start w-full gap-2">
      {label && (
        <label className="" htmlFor={inputId}>
          {label}
        </label>
      )}
      <input
        className="bg-base-300 placeholder:text-base-300-content text-base-300-content w-full p-2 outline-none rounded-md shadow-md"
        {...rest}
        id={inputId}
      />
    </div>
  );
};

export default Input;
