import { useState } from "react";
import { Collapse } from "../../components";
import CollapseRow from "../../components/Atoms/CollapseRow";
import CustomAvatar from "../../components/Molecules/CustomAvatar";
import { useGetUserHistoryQuery } from "../../queries/useGetUserHistoryQuery";
import { useUser } from "../../store";

const Home = () => {
  const user = useUser();
	const [test, setTest] = useState<any>();
  const {
    data: historyData,
    isFetching: historyLoading,
    isError: historyError,
  } = useGetUserHistoryQuery(`${user?.id}`);

  return (
    <div className="container px-4 mx-auto pt-20 min-h-screen max-w-4xl">
      <CustomAvatar
				setConstructAvatar={setTest}
			/>
      <div className="flex flex-col gap-2 justify-center items-start">
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
