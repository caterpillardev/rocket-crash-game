import S from "./index.module.scss";
import { useEffect, useState } from "react";
import { formatNumber } from "@utils/formatUtils";
import { useCrash } from "@context/CrashContext";
import { Icon } from "@features/icon";
import { GamestateItem } from "@features/ui";

export const CrashPlayerList = () => {
  const { crash } = useCrash();
  const [ids, setIds] = useState<string[]>([]);
  const [totalBetAmount, setTotalBetAmount] = useState<number>(0);

  useEffect(() => {
    setIds(Object.keys(crash.players));
  }, [crash.players]);

  useEffect(() => {
    let total = 0;
    ids.map((id) => {
      if (crash.players[id] && crash.players[id].betAmount) {
        total += crash.players[id].betAmount;
      }
    });
    setTotalBetAmount(total);
  }, [ids]);

  return (
    <div className={S.body}>
      <div className={S.title}>
        <h3>{ids.length} players</h3>
        <Icon name="Hold" width={16} height={16} viewBox="0 0 16 16" />
        <h4>{formatNumber(totalBetAmount)}</h4>
      </div>
      <div className={S.wrapper}>
        <div className={S.header}>
          <span>User</span>
          <span>Bet</span>
          <span>Multipler</span>
          <span>Payout</span>
        </div>
        <div className={S.border} />
        <div className={S.list}>
          {ids.map((id, index) => (
            <GamestateItem
              key={index}
              data={{
                ...crash.players[id],
                layout: "1fr repeat(3, minmax(60px, 72px))",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
