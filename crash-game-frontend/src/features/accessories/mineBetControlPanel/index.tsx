import { DropButton, MineBetControl, MineMinecontrol } from "@features/ui";
import S from "./index.module.scss";
import { useState } from "react";
import clsx from "clsx";
import { mineSocket } from "@utils/socketUtils";
import { toast } from "react-toastify";
import { useMine } from "@context/MineContext";

export const MineBetControlPanel = () => {
  const [mines, setMines] = useState<number>(1);
  const [amount, setAmount] = useState<number>(1);
  const { mine, setMine } = useMine();

  const handleStartGame = () => {
    if (mineSocket && !mine.delayEndSituation) {
      if (mine.state === "end") {
        setMine((prevState) => ({ ...prevState, state: "gaming" }));
        mineSocket.emit("join-game", mines, amount);
        toast.success("Start bet", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else if (mine.state === "gaming") {
        setMine((prevState) => ({ ...prevState, state: "end" }));
        mineSocket.emit("over-game");
        toast.success("Cashout", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setMine((prevState) => ({ ...prevState, delayEndSituation: true }));
        setTimeout(() => {
          setMine((prevState) => ({ ...prevState, delayEndSituation: false }));
        }, 2300);
      }
    }
  };

  return (
    <div className={S.body}>
      <MineBetControl amount={amount} setAmount={setAmount} />
      <MineMinecontrol mines={mines} setMines={setMines} />
      <DropButton $filter="2px">
        <div
          className={clsx(S.startBtn, mine.state === "gaming" && S.activeGame)}
          onClick={handleStartGame}
        >
          {mine.state === "end" ? (
            "Start Bet"
          ) : (
            <>
              <p className={S.amount}>Cashout</p>
              <span className={S.amount}>
                {(mine.cashout * amount) / 100} $coin
              </span>
            </>
          )}
        </div>
      </DropButton>
    </div>
  );
};
