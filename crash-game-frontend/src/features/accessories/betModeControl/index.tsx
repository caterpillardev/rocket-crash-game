import { useCrash } from "@context/CrashContext";
import S from "./index.module.scss";
import clsx from "clsx";
import { FC, useEffect } from "react";
import { toast } from "react-toastify";
import {
  ControlPanel,
  DropButton,
  MainButton,
  RangeSlider,
  RoundSection,
} from "@features/ui";
import { TextRender } from "./textRender";
import { useApp } from "@context/AppContext";

const headerList = ["manual", "auto"];

interface IProps {
  currentCashout: number;
}

export const BetControl: FC<IProps> = ({ currentCashout }) => {
  const { crash, setCrash } = useCrash();
  const { app } = useApp();

  const handleClick = () => {
    if (!app.user) return;
    if (crash.gameStep === "before") {
      setCrash((prevState) => ({
        ...prevState,
        betState: !prevState.betState,
      }));

      toast.success("Start betting", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else if (crash.gameStep === "gaming") {
      if (crash.betState) {
        if (
          crash.gameMode !== "auto" ||
          (crash.gameMode === "auto" && crash.getCoin)
        ) {
          setCrash((prevState) => ({ ...prevState, betState: false }));
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
        } else if (crash.gameMode === "auto") {
          setCrash((prevState) => ({ ...prevState, getCoin: true }));
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
        }
      } else {
        setCrash((prevState) => ({
          ...prevState,
          nextRound: !prevState.nextRound,
        }));
        if (crash.nextRound) {
          toast.warning("Cancel betting", {
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
          toast.success("Set next round", {
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
    } else if (crash.gameStep === "end") {
      if (crash.betState) {
        setCrash((prevState) => ({ ...prevState, betState: false }));
        toast.warning("Cancel betting", {
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
        setCrash((prevState) => ({
          ...prevState,
          nextRound: !prevState.nextRound,
        }));
        toast.success("Set next round", {
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
  };

  const handleChangeCashout = (value: number) => {
    if (!crash.betState) {
      setCrash((prevState) => ({
        ...prevState,
        cashout: value,
      }));
      // toast.success("Cashout", {
      //   position: "top-right",
      //   autoClose: 3000,
      //   hideProgressBar: false,
      //   closeOnClick: true,
      //   pauseOnHover: true,
      //   draggable: true,
      //   progress: undefined,
      //   theme: "light",
      // });
    }
  };

  useEffect(() => {
    if (
      crash.numberRound !== 0 &&
      crash.socket &&
      crash.betState &&
      crash.gameStep === "before"
    ) {
      crash.socket.emit("join-game", crash.cashout, crash.betAmount);
    }

    if (
      crash.numberRound === 0 &&
      crash.betState &&
      crash.gameMode === "auto"
    ) {
      setCrash((prevState) => ({
        ...prevState,
        betState: false,
      }));
    }
  }, [crash.numberRound, crash.gameStep]);

  useEffect(() => {
    if (
      crash.gameStep === "gaming" &&
      ((crash.betState && crash.getCoin) || !crash.betState) &&
      crash.socket
    ) {
      crash.socket.emit("bet-cashout");
    }
  }, [crash.betState, crash.getCoin]);

  useEffect(() => {
    if (crash.betState && crash.socket) {
      crash.socket.emit("join-game", crash.cashout, crash.betAmount);
    }
  }, [crash.betState]);

  return (
    <div className={S.body}>
      <div className={S.header}>
        <h3>bet mode</h3>
        {headerList.map((list, index) => (
          <MainButton
            key={index}
            $padding="8px 16px"
            $title={list}
            $fontFamily="Manrope"
            $fontSize="14px"
            $fontWeight="500"
            $lineHeight="20px"
            $textTransform="capitalize"
            $active={crash.gameMode === list}
            $activeBgColor="#FFEDC2"
            onClick={() => {
              setCrash((prevState) => ({
                ...prevState,
                gameMode: list,
                betState: false,
              }));
            }}
            $filterWidth="1px"
          />
        ))}
      </div>
      <ControlPanel />
      <RangeSlider
        title="Auto Cashout"
        name="cashout"
        step={0.1}
        value={crash.cashout}
        onChange={handleChangeCashout}
      />
      {crash.gameMode === "auto" && <RoundSection />}
      <DropButton $filter="2px">
        <div
          className={clsx(
            S.startBtn,
            crash.gameStep === "before"
              ? crash.betState || crash.nextRound
                ? S.activeGame
                : crash.gameMode === "auto" && ""
              : crash.gameStep === "gaming"
              ? crash.betState
                ? crash.getCoin
                  ? S.activeGame
                  : S.viewGame
                : crash.nextRound && S.activeGame
              : (crash.nextRound || crash.betState) && S.activeGame
          )}
          onClick={handleClick}
        >
          {TextRender(
            crash.gameStep,
            crash.nextRound,
            crash.betState,
            crash.gameMode,
            crash.getCoin,
            currentCashout,
            crash.betAmount
          )}
        </div>
      </DropButton>
    </div>
  );
};
