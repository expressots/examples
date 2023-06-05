import { useQuery } from "@tanstack/react-query";

// service
import { getSinglePokemon } from "../service/getSinglePokemon";

// ::
export const useGetSinglePokemonQuery = (pokemon: string | number) => {
  return useQuery({
    queryKey: [`single-pokemon-${pokemon}`],
    queryFn: () => getSinglePokemon(pokemon),
    refetchOnWindowFocus: false,
  });
};
