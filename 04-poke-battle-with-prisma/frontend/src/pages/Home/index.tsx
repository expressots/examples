import { useState } from "react";
import { Button } from "../../components";
import CollapseRow from "../../components/Atoms/CollapseRow";
import { useGetUserHistoryQuery } from "../../queries/useGetUserHistoryQuery";
import { useUser } from "../../store";
import { useNavigate } from "react-router-dom";
import { ROUTE } from "../../routes";

const Home = () => {
  const user = useUser();
  const navigate = useNavigate();
  const {
    data: historyData,
    isFetching: historyLoading,
    isError: historyError,
  } = useGetUserHistoryQuery(`${user?.id}`);

  return (
    <div className="container px-4 mx-auto pt-20 min-h-screen">
      <div className="flex flex-col gap-2 justify-center items-start">
        <div className="flex flex-col gap-2">
          <Button
            onClick={() => navigate(`${ROUTE.auth}${ROUTE.arena}`)}
            className="font-semibold"
          >
            Go to battle
          </Button>
        </div>
        <h2 className="text-lg font-semibold">Your matchs</h2>
        <div className="pb-10 flex flex-col w-full">
          {historyData?.map((history) => (
            <CollapseRow
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
