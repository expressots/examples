import { Collapse } from "../../components";
import { useGetUserHistoryQuery } from "../../queries/useGetUserHistoryQuery";
import { useUser } from "../../store";

const Home = () => {
  const user = useUser();
  const {
    data: historyData,
    isFetching: historyLoading,
    isError: historyError,
  } = useGetUserHistoryQuery(`${user?.id}`);

  return (
    <div className="container px-4 mx-auto pt-20 min-h-screen">
      <div className="flex flex-col gap-2 justify-center items-start">
        <h2 className="text-lg font-semibold">Your matchs</h2>
        <div className="flex flex-col gap-2 w-full">
          {historyData?.map((history) => (
            <Collapse
              isDraw={history.isDraw}
              log={history.log}
              loserName={history.loserName}
              playerId={history.playerId}
              pokemon1={history.pokemon1}
              pokemon2={history.pokemon2}
              userName={history.userName}
              winner={history.winner}
              winnerName={history.winnerName}
              id={history.id}
              key={history.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
