import { ButtonHTMLAttributes, ReactNode } from "react";

export type TButton = {
  children?: ReactNode;
  asChild?: boolean
} & ButtonHTMLAttributes<HTMLButtonElement>;
