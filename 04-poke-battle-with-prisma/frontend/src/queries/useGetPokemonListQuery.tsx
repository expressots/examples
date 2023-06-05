import { useInfiniteQuery } from "@tanstack/react-query";

// end-points
import { ENDPOINT } from "../endpoints";

// services
import { getPokemonList } from "../service/getPokemonList";

// ::
export const useGetPokemonListQuery = () => {
  return useInfiniteQuery({
    queryKey: ["list", ENDPOINT.listOfPokemons],
    queryFn: ({ pageParam }) => getPokemonList(pageParam),
    getPreviousPageParam: (firstPage) => firstPage.next ?? undefined,
    getNextPageParam: (lastPage) => lastPage.next ?? undefined,
    refetchOnWindowFocus: false,
  });
};
