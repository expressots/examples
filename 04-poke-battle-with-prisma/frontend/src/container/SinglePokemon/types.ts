import { TPokemonContentEndpoint } from "../../types";

export type TSinglePokemonProps = {
  uri: string;
  selected: boolean;
  handleClickPokemon: (pokemon: TPokemonContentEndpoint) => void;
};
