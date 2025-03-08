import { ChangeEvent, useEffect, useState } from "react";
import S from "./index.module.scss";
import { DropButton, RangeSlider } from "@features/ui";
import head from "@assets/img/coinflip/head.webp";
import tail from "@assets/img/coinflip/tail.webp";
import clsx from "clsx";
import { IoIosArrowDown } from "react-icons/io";
import { useCoinflip } from "@context/CoinflipContext";
import { io } from "socket.io-client";
import { useApp } from "@context/AppContext";
import { getAccessToken } from "@utils/axiosUtils";
import { toast } from "react-toastify";

const valueAmount = ["1/2", "2x", "MAX"];

const presetList = [
  { type: "10:5", value: "10:5(x1.57)" },
  { type: "1:1", value: "1:1(x1.96)" },
  { type: "4:3", value: "4:3(x3.14)" },
  { type: "6:5", value: "6:5(x8.96)" },
  { type: "9:8", value: "9:8(x50.18)" },
  { type: "10:10", value: "10:10(x1003.52)" },
];

interface IPreset {
  amount: number;
  head: number;
  type: string;
  value: string;
}

export const CoinFlipBetControl = () => {
  const [amount, setAmount] = useState<number>(1);
  const [gameState, setGameState] = useState<string>("end");
  const [auto, setAuto] = useState<number>(1);
  const [preset, setPreset] = useState<IPreset>({
    amount: 1,
    head: 1,
    type: "1:1",
    value: "1:1(x1.96)",
  });
  const [toaster, setToaster] = useState<boolean>(false);
  const [check, setCheck] = useState<boolean>(false);

  const { coinflip, setCoinflip } = useCoinflip();
  const { app, setApp } = useApp();

  useEffect(() => {
    const socketId = `${
      process.env.BACK_URL || "http://localhost:4000"
    }/coinflip`;

    const socket = io(socketId);
    if (!socket) return;
    setCoinflip((prevState) => ({ ...prevState, socket: socket }));

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (coinflip.socket) {
      if (app.user) {
        const token = getAccessToken();
        coinflip.socket.emit("auth", { address: app.user.crypto, token });
      }

      coinflip.socket.on("update-wallet", (data) => {
        setApp((prevState) => ({
          ...prevState,
          user: {
            id: prevState.user?.id || "",
            amount: data,
            crypto: prevState.user?.crypto || "",
            avatar: prevState.user?.avatar || "",
            nickname: prevState.user?.nickname || "",
            username: prevState.user?.username || "",
          },
        }));
      });

      coinflip.socket.on("game-end", (data) => {
        setToaster(true);
        setCheck(data);
        setGameState("end");
      });
    }
  }, [coinflip.socket, app]);

  useEffect(() => {
    if (toaster) {
      setToaster(false);
      if (check) {
        toast.success("You are winner", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        toast.error("You lost", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    }
  }, [toaster]);

  useEffect(() => {
    const currentType = `${coinflip.coinAmount}:${coinflip.heads}`;
    const index = presetList.findIndex((item) => item.type === currentType);
    const currentValue = index >= 0 ? presetList[index].value : "Custom";

    setPreset({
      amount: coinflip.coinAmount,
      head: coinflip.heads,
      type: currentType,
      value: currentValue,
    });
  }, [coinflip.coinAmount, coinflip.heads]);

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
    if (type === "1/2") {
      setAmount((prevAmount) => Math.min(prevAmount / 2, 50000));
    } else if (type === "2x") {
      setAmount((prevAmount) => Math.min(prevAmount * 2, 50000));
    } else if (type === "MAX") {
      setAmount(50000);
    }
  };

  const handleStartGame = () => {
    if (coinflip.socket) {
      if (gameState === "end") {
        setGameState("gaming");
        coinflip.socket.emit("create-new-game", {
          amount,
          count: coinflip.coinAmount,
          heads: coinflip.heads,
          type: coinflip.coinType,
        });
      }
    }
  };

  const handleChangeCoinAmount = (value: number) => {
    setCoinflip((prevState) => ({ ...prevState, coinAmount: value }));
  };

  const handleChangeHeads = (value: number) => {
    setCoinflip((prevState) => ({ ...prevState, heads: value }));
  };

  const handleChangeAutobet = (value: number) => {
    setAuto(value);
  };

  const handleChangeCoinType = (value: boolean) => {
    setCoinflip((prevState) => ({ ...prevState, coinType: value }));
  };

  const handleChangeAuto = () => {
    setCoinflip((prevState) => ({ ...prevState, autobet: !prevState.autobet }));
  };

  return (
    <div className={S.body}>
      <div className={S.coinControl}>
        <RangeSlider
          title="Coin Amount"
          name="coinamount"
          step={1}
          value={coinflip.coinAmount}
          onChange={handleChangeCoinAmount}
          className={S.ranger}
        />
        <RangeSlider
          title="Min Heads/Tails"
          name="heads"
          step={1}
          value={coinflip.heads}
          onChange={handleChangeHeads}
          className={S.ranger}
        />
        <input
          type="checkbox"
          className={S.checker}
          onChange={handleChangeAuto}
          checked={coinflip.autobet}
        />
        <div></div>
        <RangeSlider
          title="Auto Bet"
          name="auto"
          step={0.1}
          value={auto}
          onChange={handleChangeAutobet}
          className={clsx(S.ranger, !coinflip.autobet && S.disable)}
          disable={!coinflip.autobet}
        />
        <div className={S.selector}>
          <span>{preset.value}</span>
          <IoIosArrowDown size={20} />
        </div>
      </div>
      <div className={S.betAmount}>
        <h3>Bet Amount</h3>
        <div className={S.inputPanel}>
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
      <div className={S.coinSide}>
        <h3>Coin side</h3>
        <div className={S.selectType}>
          <div
            className={clsx(S.flipButton, !coinflip.coinType && S.active)}
            onClick={() => handleChangeCoinType(false)}
          >
            <img src={tail} alt="" />
            <span>Tail</span>
          </div>
          <div
            className={clsx(S.flipButton, coinflip.coinType && S.active)}
            onClick={() => handleChangeCoinType(true)}
          >
            <img src={head} alt="" />
            <span>head</span>
          </div>
        </div>
      </div>
      <div className={S.startBtn} onClick={handleStartGame}>
        Flip Coins
      </div>
    </div>
  );
};
