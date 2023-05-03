// api: requesters
import { requester } from "../api/requester";

// end-poins
import { ENDPOINT } from "../endpoints";

// types
import type { TPokemonListEndpoint } from "../types";

export const getPokemonList = async (
  offSet: string,
): Promise<TPokemonListEndpoint> => {
  const { data } = await requester().get<TPokemonListEndpoint>(
    offSet || `${ENDPOINT.listOfPokemons}`,
  );

  return data;
};
