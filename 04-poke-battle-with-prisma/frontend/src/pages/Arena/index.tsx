import { useState } from "react";
import { Button, Input, LoadingStatus, StatusCard } from "../../components";
import { BattlePokemon, SinglePokemon, UniquePokemon } from "../../container";
import { useGetPokemonListQuery } from "../../queries/useGetPokemonListQuery";
import { TPokemonContentEndpoint } from "../../types";
import { PlayIcon } from "@heroicons/react/24/solid";
import useDebounce from "../../hooks/useDebounce";

const Arena = () => {
  const [screen, setScreen] = useState<"selection" | "battle">("selection");
  const [searchPokemon, setSearchPokemon] = useState("");
  const debounceSearchPokemon = useDebounce(searchPokemon, 1200);
  const [selectedPokemon, setSelectedPokemon] = useState<
    TPokemonContentEndpoint | undefined
  >(undefined);

  const {
    data: pokemonList,
    isError: pokemonListError,
    isFetching: pokemonListLoading,
    fetchNextPage,
    hasNextPage,
  } = useGetPokemonListQuery();

  if (screen !== "selection" && selectedPokemon) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <BattlePokemon
          handleClickExitBattle={() => setScreen("selection")}
          pokemon={selectedPokemon}
        />
      </div>
    );
  }

  return (
    <div className="container px-4 mx-auto py-24 min-h-screen flex flex-col gap-8">
      <StatusCard
        title="How to battle"
        description={`Click on the box of the pokemon you want and then on the "Battle" button at the bottom of the screen to look for an opponent`}
        type="info"
      />
      <Input
        classLabel="font-semibold"
        label="Search for pokemons"
        value={searchPokemon}
        onChange={(e) => setSearchPokemon(e.target.value)}
      />
      {searchPokemon && (
        <UniquePokemon
          handleClickPokemon={(pokemon) => setSelectedPokemon(pokemon)}
          selected={
            searchPokemon.trim().toLowerCase() === selectedPokemon?.name
          }
          uri={debounceSearchPokemon.trim().toLowerCase()}
        />
      )}
      {pokemonListError && (
        <StatusCard
          type="error"
          title="Pokemon list"
          description="There was an error loading the pokemon list"
        />
      )}
      {pokemonList?.pages && (
        <div className="flex gap-2 flex-wrap items-start justify-start py-2">
          {pokemonList?.pages?.map((page) =>
            page.results.map((pokemon) => (
              <SinglePokemon
                handleClickPokemon={(pokemon) => setSelectedPokemon(pokemon)}
                selected={pokemon.name === selectedPokemon?.name}
                uri={pokemon.url}
              />
            )),
          )}
        </div>
      )}
      <div>
        {pokemonListLoading && (
          <div className="flex gap-2 items-center justify-start">
            <LoadingStatus />
            <p className="animate-pulse font-semibold">Loading pokemons</p>
          </div>
        )}
      </div>
      {pokemonList?.pages && (
        <div>
          <Button
            disabled={!hasNextPage}
            onClick={() => fetchNextPage()}
            className="font-semibold"
          >
            Load more pokemons
          </Button>
        </div>
      )}
      {selectedPokemon && (
        <div className="fixed z-30 bottom-8 right-8 animate-fadeIn">
          <Button onClick={() => setScreen("battle")} className="font-semibold">
            <PlayIcon className="h-6 w-6" />
            Battle
          </Button>
        </div>
      )}
    </div>
  );
};

export default Arena;
