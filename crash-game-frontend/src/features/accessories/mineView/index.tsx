import { IRefMineGame, MineGame } from "@features/games";
import S from "./index.module.scss";
import { useEffect, useRef, useState } from "react";
import { DropBox } from "@features/ui";
import star from "@assets/img/mine/star.webp";
import { mineSocket } from "@utils/socketUtils";
import { getAccessToken } from "@utils/axiosUtils";
import { useApp } from "@context/AppContext";
import { useMine } from "@context/MineContext";
import { MainGame } from "@features/games/mine/scenes";

export const MineView = () => {
  const phaserRef = useRef<IRefMineGame | null>(null);
  const [step, setStep] = useState<number>(0);
  const { app, setApp } = useApp();
  const { setMine } = useMine();

  const currentScene = () => {
    // setCanMoveSprite(scene.scene.key !== "MainMenu");
  };

  const startedGame = () => {
    if (phaserRef.current) {
      const scene = phaserRef.current.scene as MainGame;

      if (scene && scene.sys.config === "MineGame") {
        scene.startedGame();
      }
    }
  };

  const showStar = (type: number) => {
    if (phaserRef.current) {
      const scene = phaserRef.current.scene as MainGame;

      if (scene && scene.sys.config === "MineGame") {
        scene.showStar(type);
      }
    }
  };

  const endGame = (type: number[]) => {
    if (phaserRef.current) {
      const scene = phaserRef.current.scene as MainGame;

      if (scene && scene.sys.config === "MineGame") {
        scene.endGame(type);
      }
    }
  };

  useEffect(() => {
    if (mineSocket && app.user) {
      const token = getAccessToken();
      mineSocket.emit("auth", { address: app.user.crypto, token });
      mineSocket.on("open-step", (data) => {
        setStep(data);
      });
      mineSocket.on("update_wallet", (data) => {
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
      mineSocket.on("cashout", (data) => {
        setMine((prevState) => ({ ...prevState, cashout: data }));
        setStep(0);
      });
      mineSocket.on("end-game", (data) => {
        setMine((prevState) => ({
          ...prevState,
          cashout: 0,
          state: "end",
          delayEndSituation: true,
        }));
        setStep(0);
        endGame(data);
        setTimeout(() => {
          setMine((prevState) => ({ ...prevState, delayEndSituation: false }));
        }, 2300);
      });
      mineSocket.on("current-state", (data) => {
        showStar(data);
      });
      mineSocket.on("started-game", () => {
        startedGame();
      });
    }

    return () => {
      mineSocket.off();
    };
  }, [app]);

  return (
    <div className={S.body}>
      <MineGame ref={phaserRef} currentActiveScene={currentScene} />
      <DropBox $filter="2px" className={S.mark}>
        <img src={star} alt="" />
        <span>{step}</span>
      </DropBox>
    </div>
  );
};
