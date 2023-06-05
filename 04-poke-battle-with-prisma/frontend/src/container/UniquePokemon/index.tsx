import { PokemonCard, StatusCard } from "../../components";
import { useGetSinglePokemonQuery } from "../../queries/useGetSinglePokemonQuery";
import { TSinglePokemonProps } from "../SinglePokemon/types";

const UniquePokemon = ({
  uri,
  selected,
  handleClickPokemon,
}: TSinglePokemonProps) => {
  const { data, isError, isFetching } = useGetSinglePokemonQuery(uri);

  if (isFetching) {
    return (
      <div className="animate-pulse h-96 text-white bg-base-200 rounded-md shadow-sm flex flex-col border-4 border-b-[20px] border-base-300 max-w-md"></div>
    );
  }

  if (isError)
    return (
      <StatusCard
        title="Pokemon"
        type="error"
        description={`Error when searching for pokemon ${uri}`}
      />
    );

  if (!data?.name) return null;

  return (
    <PokemonCard
      name={data?.name}
      player1Selected={selected}
      player2Selected={false} // TODO: Implement local battles
      sprite={data?.sprites?.other["official-artwork"].front_default}
      states={data?.stats}
      type={data?.types}
      handleClickPokemon={() => handleClickPokemon(data)}
    />
  );
};

export default UniquePokemon;
