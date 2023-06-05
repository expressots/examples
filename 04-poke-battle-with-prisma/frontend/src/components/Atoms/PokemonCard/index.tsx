import { KeyboardEvent } from "react";
import { TCardPokemonProps } from "./type";
import { clsxm } from "../../../utils/clsxm";

const PokemonCard = ({
  name,
  player1Selected,
  player2Selected,
  sprite,
  states,
  type,
  handleClickPokemon,
}: TCardPokemonProps) => {
  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter") {
      handleClickPokemon();
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={handleClickPokemon}
      onKeyDown={handleKeyDown}
      className={clsxm(
        "transition-colors bg-base-100 rounded-md shadow-sm flex flex-col border-4 border-b-[20px] border-base-300 max-w-md",
        player1Selected && "bg-blue-500 border-blue-900 text-white",
        player2Selected && "bg-red-500 border-red-900 text-white",
      )}
    >
      <div
        className={clsxm(
          "transition-colors flex items-center justify-between bg-base-200 p-2",
          player1Selected && "bg-blue-600",
          player2Selected && "bg-red-600",
        )}
      >
        <p className="capitalize font-semibold">{name}</p>
      </div>
      <div className="flex w-full items-center justify-center p-2">
        <img className="h-32 w-32" src={sprite} alt={`pokemon ${name} image`} />
      </div>
      <h3 className="p-2 font-semibold">Type</h3>
      <div className="flex gap-2 p-2 flex-wrap">
        {type.map((item) => (
          <p
            className={clsxm(
              "transition-colors bg-base-200 p-2 capitalize rounded-sm shadow-sm",
              player1Selected && "bg-blue-700",
              player2Selected && "bg-red-700",
            )}
          >
            {item.type.name}
          </p>
        ))}
      </div>
      <h3 className="p-2 font-semibold">Status</h3>
      <div className="flex gap-2 flex-wrap p-2">
        {states.map((stat) => (
          <p
            className={clsxm(
              "transition-colors bg-base-200 p-2 capitalize rounded-sm shadow-sm",
              player1Selected && "bg-blue-700",
              player2Selected && "bg-red-700",
            )}
          >
            {stat.stat.name}-{stat.base_stat}
          </p>
        ))}
      </div>
    </div>
  );
};

export default PokemonCard;
