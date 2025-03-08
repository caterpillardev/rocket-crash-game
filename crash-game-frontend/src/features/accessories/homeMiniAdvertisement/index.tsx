import { useApp } from "@context/AppContext";
import S from "./index.module.scss";
import clsx from "clsx";
import { GameItem } from "../homeCasinoAdvertisement/item";
import { MiniAdvertisementDatas } from "@utils/dataUtils";

const buttonsData = ["chrome", "rush"];

export const HomeMiniAdvertisement = () => {
  const { app } = useApp();

  return (
    <div className={S.body}>
      <div className={S.casinoBorder}>
        <span>Mini Games</span>
      </div>
      <div
        className={clsx(
          S.casinoList,
          app.activeMiniGame === buttonsData[0] ? S.firstType : S.secondType
        )}
      >
        {MiniAdvertisementDatas.map((item, index) => (
          <GameItem key={index} data={item} type="mini" />
        ))}
      </div>
    </div>
  );
};
