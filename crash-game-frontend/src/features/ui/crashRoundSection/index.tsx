import { useCrash } from "@context/CrashContext";
import { MainButton } from "../button";
import S from "./index.module.scss";

const round = [5, 10, 25, 50, -1];

export const RoundSection = () => {
  const { crash, setCrash } = useCrash();

  return (
    <div className={S.body}>
      <span>Number of round</span>
      <div className={S.btnGroup}>
        {round.map((item, index) => (
          <MainButton
            key={index}
            $title={item !== -1 ? item : "∞"}
            $filterWidth="1px"
            $padding="6px 8px"
            $fontFamily="Manrope"
            $fontSize="14px"
            $fontWeight="500"
            $lineHeight="18px"
            $active={item === crash.numberRound}
            $activeBgColor="#FFEDC2"
            $activeEffect="1.5px 1.5px black inset"
            $justifyContent="center"
            onClick={() => {
              if (item !== crash.numberRound && !crash.betState) {
                setCrash((prevState) => ({ ...prevState, numberRound: item }));
              }
            }}
          />
        ))}
      </div>
    </div>
  );
};
