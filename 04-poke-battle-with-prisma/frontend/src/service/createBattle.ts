import { requester } from "../api/requester";
import { ENDPOINT } from "../endpoints";
import { TPokemonContentEndpoint } from "../types";
import { THistoryBattleResponse } from "./types";

export const createBattle = async (
  body: {
    pokemon1: TPokemonContentEndpoint;
    pokemon2: TPokemonContentEndpoint;
  },
  token: string,
): Promise<THistoryBattleResponse> => {
  const { data } = await requester({
    headers: {
      Authorization: token,
    },
  }).post<THistoryBattleResponse>(ENDPOINT.createBattle, body);

  return data;
};
