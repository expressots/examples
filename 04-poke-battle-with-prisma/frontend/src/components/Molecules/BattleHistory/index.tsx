import { useMemo } from "react";
import { TBattleHistory } from "./types";
import { CollapseRow, StatusCard } from "../../";

const BattleHistory = ({ error, history, loading }: TBattleHistory) => {
  const isEmpty = useMemo(() => history?.length === 0, [history]);

  if (loading) {
    return (
      <div className="animate-fadeIn pb-10 flex flex-col w-full gap-1">
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className="flex animate-pulse bg-base-300 h-20 w-full"
          ></div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <StatusCard
        description="There was an error loading the match history"
        type="error"
        title="History"
      />
    );
  }
  if (isEmpty) {
    return (
      <StatusCard
        description="You still don't have matches played, go to the arena and battle a few
				times!"
        type="info"
        title="History"
      />
    );
  }
  return (
    <div className="animate-fadeIn pb-10 flex flex-col w-full">
      {history?.map((match) => (
        <CollapseRow
          isDraw={match.isDraw}
          log={match.log}
          pokemon1={match.pokemon1}
          pokemon2={match.pokemon2}
          winner={match.winner}
          key={match.id}
        />
      ))}
    </div>
  );
};

export default BattleHistory;
