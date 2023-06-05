export type TCardStatus = {
  type: "error" | "info" | "warning" | "success";
  description: string;
  title?: string;
};
