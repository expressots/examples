import { PokemonCard } from "../../components";
import { useGetPokemonQuery } from "../../queries/useGetPokemonQuery";
import { TSinglePokemonProps } from "./types";

const SinglePokemon = ({
  uri,
  selected,
  handleClickPokemon,
}: TSinglePokemonProps) => {
  const { data } = useGetPokemonQuery(uri);

  if (!data) return null;

  return (
    <PokemonCard
      name={data.name}
      player1Selected={selected}
      player2Selected={false} // TODO: Implement local battles
      sprite={data.sprites.other.home.front_default || data.sprites.other["official-artwork"].front_default}
      states={data.stats}
      type={data.types}
      handleClickPokemon={() => handleClickPokemon(data)}
    />
  );
};

export default SinglePokemon;
