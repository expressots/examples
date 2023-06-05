// api: requesters
import { requester } from "../api/requester";

// end-poins
import { ENDPOINT } from "../endpoints";

// types
import { THistoryBattleResponse } from "./types";

export const getUserHistory = async (
  id: string,
): Promise<THistoryBattleResponse[]> => {
  const { data } = await requester().get<THistoryBattleResponse[]>(
    `${ENDPOINT.userBattleHistory}?id=${id}`,
  );

  return data;
};
