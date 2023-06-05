import { useGetUserHistoryQuery } from "../../queries/useGetUserHistoryQuery";
import { useUser } from "../../store";
import { useNavigate } from "react-router-dom";
import { ROUTE } from "../../routes";
import {
  BattleHistory,
  Button,
  CollapseRow,
  StatusCard,
} from "../../components";

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
      <div className="flex flex-col gap-5 justify-center items-start">
        <div className="flex items-start flex-col justify-start gap-2 flex-wrap">
          <StatusCard
            description={`Click on the "Go to the Arena" button to play`}
            type="info"
            title="How to play"
          />
          <Button
            onClick={() => navigate(`${ROUTE.auth}${ROUTE.arena}`)}
            className="font-semibold"
          >
            Go to the Arena
          </Button>
        </div>
        <h2 className="text-lg font-semibold">Your matchs</h2>
        <div className="pb-10 flex flex-col w-full">
          <BattleHistory
            history={historyData}
            error={historyError}
            loading={historyLoading}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
