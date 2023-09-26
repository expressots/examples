import { useMutation } from "@tanstack/react-query";
import { TPokemonContentEndpoint } from "../types";
import { createBattle } from "../service/createBattle";
import { useToken } from "../store";

export const useStartPokemonBattleMutation = () => {
  const token = useToken();

  // Queries
  return useMutation({
    mutationFn: (body: {
      pokemon1: TPokemonContentEndpoint;
      pokemon2: TPokemonContentEndpoint;
    }) => createBattle(body, token),
  });
};
