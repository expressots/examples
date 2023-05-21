import { Dispatch, SetStateAction } from "react";

export type TAvatarOptionsSelector<T> = {
  options: T[];
  label?: string;
  currentOption: string[];
  setCurrentOption: Dispatch<SetStateAction<T>>;
  preview: any;
  optionKey: string;
	disabled?: boolean;
};
