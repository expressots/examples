import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";
import { Slot } from "@radix-ui/react-slot";

// types
import type { TButton } from "./types";

// ::
const Button = forwardRef<HTMLButtonElement, TButton>(
  ({ children, asChild = false, className, ...rest }, ref) => {
    const Component = asChild ? Slot : "button";
    return (
      <Component
        {...rest}
        ref={ref}
        className={twMerge(
          "border-2 border-b-8 border-primary-focus bg-primary text-primary-content flex cursor-pointer items-center justify-center gap-1 rounded-md p-2 shadow-md  transition-colors",
          className,
        )}
      >
        {children}
      </Component>
    );
  },
);

Button.displayName = "Button";

export default Button;
