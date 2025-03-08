import { Dispatch, SetStateAction } from "react";
import S from "./index.module.scss";
import { MainButton } from "../button";
import bomb from "@assets/img/mine/bomb.webp";

const valueAmount = [1, 3, 5, 10, 24];

export const MineMinecontrol = ({
  mines,
  setMines,
}: {
  mines: number;
  setMines: Dispatch<SetStateAction<number>>;
}) => {
  return (
    <div className={S.body}>
      <h3>Mines Amount</h3>
      <div className={S.inputPanel}>
        <div />
        <input type="number" value={mines} disabled />
        <img src={bomb} alt="" />
      </div>
      <div className={S.btnGroup}>
        {valueAmount.map((item, index) => (
          <MainButton
            key={index}
            $padding="8px"
            $width="100%"
            $fontFamily="Saira"
            $fontSize="16px"
            $fontWeight="400"
            $lineHeight="25px"
            $textTransform="uppercase"
            $title={item}
            $active={item === mines}
            $activeBgColor="hsla(42, 100%, 88%, 1)"
            $activeEffect="2.5px 2.5px black inset"
            $borderRadius="4px"
            onClick={() => {
              if (mines !== item) {
                setMines(item);
              }
            }}
            $filterWidth="1.5px"
            $justifyContent="center"
          />
        ))}
      </div>
    </div>
  );
};
