import { useCrash } from "@context/CrashContext";
import { MainButton } from "../button";
import S from "./index.module.scss";

export const ControlPanel = () => {
  const { crash, setCrash } = useCrash();
  //   const { send } = CrashContext.useActorRef();
  //   const state = CrashContext.useSelector((state) => state);

  const handleChangeAmount = (multi: number) => {
    setCrash((prevState) => ({
      ...prevState,
      betAmount: multi * prevState.betAmount,
    }));
  };

  return (
    <div className={S.body}>
      <h5>Bet Amount</h5>
      <div className={S.input}>
        <input
          type="text"
          value={crash.betAmount}
          onChange={(e) => {
            if (!crash.betState) {
              setCrash((prevState) => ({
                ...prevState,
                betAmount: Number(e.target.value),
              }));
            }
          }}
        />
        <span>$coin</span>
      </div>
      <div className={S.btGroup}>
        <MainButton
          $filterWidth="1.5px"
          $activeBgColor="hsla(42, 100%, 88%, 1)"
          $activeEffect="1.5px 1.5px black inset"
          $justifyContent="center"
          $padding="8px"
          $title="2x"
          onClick={() => {
            if (!crash.betState) {
              handleChangeAmount(2);
            }
          }}
        />
        <MainButton
          $filterWidth="1.5px"
          $activeBgColor="hsla(42, 100%, 88%, 1)"
          $activeEffect="1.5px 1.5px black inset"
          $justifyContent="center"
          $padding="8px"
          $title="4x"
          onClick={() => {
            if (!crash.betState) {
              handleChangeAmount(4);
            }
          }}
        />
        <MainButton
          $filterWidth="1.5px"
          $activeBgColor="hsla(42, 100%, 88%, 1)"
          $activeEffect="1.5px 1.5px black inset"
          $justifyContent="center"
          $padding="8px"
          $title="8x"
          onClick={() => {
            if (!crash.betState) {
              handleChangeAmount(8);
            }
          }}
        />
      </div>
    </div>
  );
};
