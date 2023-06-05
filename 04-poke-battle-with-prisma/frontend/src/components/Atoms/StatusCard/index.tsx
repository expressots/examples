import clsx from "clsx";
import { useMemo } from "react";
import { TCardStatus } from "./types";
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  InformationCircleIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";

const StatusCard = ({ description, type, title }: TCardStatus) => {
  const icon = {
    error: XCircleIcon,
    warning: ExclamationCircleIcon,
    success: CheckCircleIcon,
    info: InformationCircleIcon,
  };

  const RenderIcon = useMemo(() => icon[type], [type]);

  return (
    <div
      className={clsx(
        "max-w-xl p-5 items-start justify-start animate-fadeIn flex flex-col w-full rounded-md shadow-md",
        type === "error" && "bg-error text-error-content",
        type === "warning" && "bg-warning text-warning-content",
        type === "success" && "bg-success text-success-content",
        type === "info" && "bg-info text-info-content",
      )}
    >
      <div className="flex flex-wrap gap-2 items-center justify-start">
        <RenderIcon className="h-6 w-6" />
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
      <p>{description}</p>
    </div>
  );
};

export default StatusCard;
