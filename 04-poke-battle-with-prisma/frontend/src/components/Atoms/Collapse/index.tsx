import React, { useState } from "react";
import { TCollapseProps } from "./types";
import clsx from "clsx";

const Collapse = ({
  isDraw,
  log,
  loserName,
  playerId,
  pokemon1,
  pokemon2,
  userName,
  winner,
  winnerName,
  id,
}: TCollapseProps) => {
  const [collapseToggle, setCollapseToggle] = useState(false);

  const handleCollpaseToggle = () => {
    setCollapseToggle(!collapseToggle);
  };

  return (
    <div className="animate-fadeIn collapse w-full collapse-arrow shadow-md rounded-md">
      <input type="checkbox" className="peer" />
      <div
        className={clsx(
          "collapse-title flex items-start justify-start gap-2",
          winner
            ? "bg-success text-success-content"
            : "bg-error text-error-content",
        )}
      >
        <div className="flex flex-col gap-2 w-full animate-leftSlide ">
          <div className="flex items-center justify-between w-full">
            <span className="font-semibold">
              {pokemon1.name} VS {pokemon2.name}
            </span>
            <span className="font-thin">
              Turns: {Math.floor((log.length + 1) / 2)}
            </span>
          </div>
          <div className="flex gap-2">
            <div className="bg-base-200 p-1 rounded-md shadow-md">
              <img
                className="h-16 w-16 "
                src={pokemon1.sprites[0 || 1 || 2]}
                alt={pokemon1.name}
              />
            </div>
            <div className="bg-base-200 p-1 rounded-md shadow-md">
              <img
                className="h-16 w-16 "
                src={pokemon2.sprites[0 || 1 || 2]}
                alt={pokemon2.name}
              />
            </div>
          </div>
        </div>
      </div>
      <div
        className={clsx(
          "collapse-content flex flex-col gap-2",
          winner
            ? "bg-success text-success-content"
            : "bg-error text-error-content",
        )}
      >
        {log.map((log) => (
          <div className="flex flex-col justify-center items-start p-2 bg-base-200 text-base-content  shadow-sm rounded-md">
            <p className="font-thin">Turn: {log.turn}</p>
            <p>{`${log.attacker} used ${log.attack}`}</p>
            <p>{`${log.defender} received ${log.damage} damage!`}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Collapse;
