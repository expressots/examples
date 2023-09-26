// api: requesters
import { requester } from "../api/requester";

// end-poins
import { ENDPOINT } from "../endpoints";
import { TPokemonContentEndpoint } from "../types";

export const getSinglePokemon = async (
  pokemon: string | number,
): Promise<TPokemonContentEndpoint> => {
  const { data } = await requester({
    baseURL: import.meta.env.VITE_POKEAPI_URL,
  }).get<TPokemonContentEndpoint>(`${ENDPOINT.pokemon}${pokemon}`);

  return data;
};
