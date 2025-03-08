import { useApp } from "@context/AppContext";
import S from "./index.module.scss";
import clsx from "clsx";
import { CasinoAdvertisementDatas } from "@utils/dataUtils";
import { GameItem } from "./item";

const buttonsData = ["crash", "flip", "mine"];

export const HomeCasinoAdvertisement = () => {
  //   const state = ActiveContext.useSelector((state) => state);
  //   const { send } = ActiveContext.useActorRef();
  const { app, setApp } = useApp();

  return (
    <div className={S.body}>
      <div className={S.casinoBorder}>
        <span>Casino</span>
        <div className={S.casinoGroup}>
          {buttonsData.map((item, index) => (
            <div
              key={index}
              className={clsx(
                S.activeButton,
                item === app.activeGame && S.active
              )}
              onClick={() =>
                setApp((prevState) => ({ ...prevState, activeGame: item }))
              }
            />
          ))}
        </div>
      </div>
      <div
        className={clsx(
          S.casinoList,
          app.activeGame === buttonsData[0]
            ? S.firstType
            : app.activeGame === buttonsData[1]
            ? S.secondType
            : S.thirdType
        )}
      >
        {CasinoAdvertisementDatas.map((item, index) => (
          <GameItem key={index} data={item} type="casino" />
        ))}
      </div>
    </div>
  );
};
