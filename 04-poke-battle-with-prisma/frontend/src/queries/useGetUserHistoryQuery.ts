import { useQuery } from "@tanstack/react-query";

// service
import { getUserHistory } from "../service/getUserHistory";

// ::
export const useGetUserHistoryQuery = (id: string) => {
  return useQuery({
    queryKey: [`user-history-${id}`],
    queryFn: () => getUserHistory(id),
    refetchOnWindowFocus: false,
  });
};
