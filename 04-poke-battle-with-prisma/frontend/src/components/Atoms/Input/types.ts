import { InputHTMLAttributes } from "react";

export type TInput = {
  label?: string;
	classLabel?: string;
} & InputHTMLAttributes<HTMLInputElement>;
