import { useMemo } from "react";
import { useGetSinglePokemonQuery } from "../../queries/useGetSinglePokemonQuery";
import { useStartPokemonBattleMutation } from "../../queries/useStartPokemonBattleMutation";
import { TBattlePokemonProps } from "./types";
import clsx from "clsx";
import {
  BattleHistory,
  Button,
  CollapseRow,
  StatusCard,
} from "../../components";
import {
  ArrowUturnLeftIcon,
  ShieldExclamationIcon,
} from "@heroicons/react/24/outline";

const searchChallenger = (): number => {
  const min = 1;
  const max = 281;

  const challengerId = Math.floor(Math.random() * (max - min + 1)) + min;

  return challengerId;
};

const BattlePokemon = ({
  pokemon,
  handleClickExitBattle,
}: TBattlePokemonProps) => {
  const {
    mutate: startBattle,
    isLoading: battleLoading,
    isError: battleError,
    data: battleResult,
  } = useStartPokemonBattleMutation();

  const challengerId = useMemo(
    () => searchChallenger(),
    [pokemon, searchChallenger],
  );
  const { data: challenger, isFetching } =
    useGetSinglePokemonQuery(challengerId);

  if (battleError)
    return (
      <div className="container px-4 mx-auto flex flex-col gap-3 max-w-sm">
        <StatusCard
          title="Battle error"
          type="error"
          description="An error occurred in the battle algorithm, please try again"
        />

        <Button onClick={handleClickExitBattle} className="font-semibold">
          <ArrowUturnLeftIcon className="h-5 w-5" />
          Return to Arena
        </Button>
      </div>
    );

  if (isFetching)
    return (
      <p className="animate-fadeIn font-semibold animate-pulse">
        Looking for opponent
      </p>
    );

  if (!challenger) return null;

  return (
    <div className="flex flex-col gap-5 w-full max-w-sm">
      <div className="flex items-baseline justify-center gap-10">
        <img
          className={clsx(
            "-scale-x-100 transform-gpu  rounded-md shadow-sm",
            battleResult !== undefined && !battleResult.winner && "grayscale",
            battleLoading && "animate-pulse",
          )}
          src={
            pokemon.sprites.versions["generation-v"]["black-white"].animated
              .front_default ||
            pokemon.sprites.other["official-artwork"].front_default
          }
          alt={pokemon.name}
        />
        <img
          className={clsx(
            " rounded-md shadow-sm",
            battleResult !== undefined && battleResult.winner && "grayscale",
            battleLoading && "animate-pulse",
          )}
          src={
            challenger.sprites.versions["generation-v"]["black-white"].animated
              .front_default ||
            challenger.sprites.other["official-artwork"].front_default
          }
          alt={challenger.name}
        />
      </div>
      {battleLoading && (
        <p className="font-semibold text-center">
          The pokemons are battling wildly!
        </p>
      )}
      {!battleResult && !battleLoading && (
        <div className="flex flex-col gap-5">
          <p className="font-semibold text-center">
            You found{" "}
            <span className="text-error capitalize text-lg">
              {challenger.name}
            </span>{" "}
            opponent
          </p>

          <div className="flex gap-2 items-center justify-center">
            <Button
              onClick={() =>
                startBattle({
                  pokemon1: pokemon,
                  pokemon2: challenger,
                })
              }
              className="font-semibold"
            >
              <ShieldExclamationIcon className="h-5 w-5" /> Fight
            </Button>
            <Button onClick={handleClickExitBattle} className="font-semibold">
              <ArrowUturnLeftIcon className="h-5 w-5" />
              Run
            </Button>
          </div>
        </div>
      )}
      {battleResult && (
        <div className="flex flex-col gap-5">
          <p className="font-semibold text-center">
            {battleResult.winner && "Congratulations you won this battle!"}
            {!battleResult.winner &&
              "Opponent was too strong, will do better next time"}
            {battleResult.isDraw &&
              "This battle was amazing, both are unconscious!"}
          </p>
          <CollapseRow
            winner={battleResult.winner}
            pokemon2={battleResult.pokemon2}
            log={battleResult.log}
            pokemon1={battleResult.pokemon1}
            isDraw={battleResult.isDraw}
            isOpen={true}
          />
          <Button onClick={handleClickExitBattle} className="font-semibold">
            <ArrowUturnLeftIcon className="h-5 w-5" />
            Return to arena
          </Button>
        </div>
      )}
    </div>
  );
};

export default BattlePokemon;
