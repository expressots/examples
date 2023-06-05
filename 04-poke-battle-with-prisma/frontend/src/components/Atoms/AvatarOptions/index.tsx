import { useCallback, useEffect, useMemo } from "react";

import Svg from "react-inlinesvg";
import clsx from "clsx";

// icons
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";

// types
import type { TAvatarOptionsSelector } from "./types";
import DraggableItems from "../../Molecules/DragabbleItems";

const AvatarOptionSelector = <T,>({
  currentOption,
  label,
  options,
  setCurrentOption,
  preview,
  optionKey,
  disabled,
}: TAvatarOptionsSelector<T>) => {
  return (
    <div className="flex flex-col gap-2">
      {label && <p>{label}</p>}
      <DraggableItems>
        {options.map((option) => {
          return (
            <button
              disabled={disabled}
              onClick={() => setCurrentOption(option)}
              key={`option`}
              className="h-16 w-16 select-none min-h-fit min-w-fit"
            >
              <Svg
                className={clsx(
                  "h-16 w-16 rounded-sm object-cover min-w-fit",
                  option === currentOption[0] && "border-2 border-primary",
                  disabled && "grayscale",
                )}
                src={preview(optionKey, [option]).toString()}
              />
            </button>
          );
        })}
      </DraggableItems>
    </div>
  );
};

export default AvatarOptionSelector;
