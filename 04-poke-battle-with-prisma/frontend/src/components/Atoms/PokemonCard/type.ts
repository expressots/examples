import { PokemonStats, TPokemonContentEndpoint } from "../../../types";
import { PokemonTypes } from "../../../types";

export type TCardPokemonProps = {
  player1Selected: boolean;
  player2Selected: boolean;
  name: string;
  sprite: string;
  type: PokemonTypes[];
  states: PokemonStats[];
  handleClickPokemon: () => void;
};
