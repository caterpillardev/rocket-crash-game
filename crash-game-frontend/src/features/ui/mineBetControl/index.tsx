import { ChangeEvent, Dispatch, SetStateAction } from "react";
import S from "./index.module.scss";
import { DropButton } from "../dropButton";

const valueAmount = ["+100", "+500", "+1000", "+5000", "1/2", "2x", "MAX"];

export const MineBetControl = ({
  amount,
  setAmount,
}: {
  amount: number;
  setAmount: Dispatch<SetStateAction<number>>;
}) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    if (!inputValue) {
      setAmount(0);
    } else if (Number(inputValue) > 50000) {
      setAmount(50000);
    } else {
      setAmount((Number(inputValue) * 10) / 10);
    }
  };

  const changeAmount = (type: string) => {
    if (
      type === "+100" ||
      type === "+500" ||
      type === "+1000" ||
      type === "+5000"
    ) {
      setAmount((prevAmount) => Math.min(prevAmount + parseFloat(type), 50000));
    } else if (type === "1/2") {
      setAmount((prevAmount) => Math.min(prevAmount / 2, 50000));
    } else if (type === "2x") {
      setAmount((prevAmount) => Math.min(prevAmount * 2, 50000));
    } else if (type === "MAX") {
      setAmount(50000);
    }
  };

  return (
    <div className={S.body}>
      <h3>Bet Amount</h3>
      <div className={S.inputPanel}>
        <div />
        <input type="number" onChange={handleChange} value={amount} />
        <span>$coin</span>
      </div>
      <div className={S.btnGroup}>
        {valueAmount.map((item, index) => (
          <DropButton $filter="1px" key={index}>
            <div className={S.button} onClick={() => changeAmount(item)}>
              {item}
            </div>
          </DropButton>
        ))}
      </div>
    </div>
  );
};
