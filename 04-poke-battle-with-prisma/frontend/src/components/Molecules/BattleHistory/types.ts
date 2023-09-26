import { THistoryBattleResponse } from "../../../service/types";

export type TBattleHistory = {
  history: THistoryBattleResponse[] | undefined;
  loading: boolean;
  error: boolean;
};
