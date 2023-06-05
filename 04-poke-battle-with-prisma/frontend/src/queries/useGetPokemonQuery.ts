import { useQuery } from "@tanstack/react-query";

// api: requester
import { requester } from "../api/requester";

// types
import type { TPokemonContentEndpoint } from "../types";

// ::
export const useGetPokemonQuery = (uri: string) => {
  const dynamicRequest = async (): Promise<TPokemonContentEndpoint> => {
    const { data } = await requester().get<TPokemonContentEndpoint>(uri);

    return data;
  };

  return useQuery({
    queryKey: [uri],
    queryFn: () => dynamicRequest(),
    refetchOnWindowFocus: false,
    enabled: !!uri,
  });
};
