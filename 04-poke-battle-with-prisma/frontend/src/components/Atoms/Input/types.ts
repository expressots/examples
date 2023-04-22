import { InputHTMLAttributes } from "react";

export type TInput = {
  label?: string;
} & InputHTMLAttributes<HTMLInputElement>;
