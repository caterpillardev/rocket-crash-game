import {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import S from "./index.module.scss";
import { useCrash } from "@context/CrashContext";
import { IHistory, IPlayer, IRefPhaserGame } from "@utils/typeUtils";
import { formatUsername } from "@utils/formatUtils";
import { End, Play, Prepare } from "@features/games/crash/scenes";
import { useApp } from "@context/AppContext";
import { toast } from "react-toastify";
import { io } from "socket.io-client";
import { DropBox, DropButton } from "@features/ui";
import { CrashGame } from "@features/games";
import { Icon } from "@features/icon";
import { HiOutlineCalendar } from "react-icons/hi";
import { getAccessToken, removeAllTokens } from "@utils/axiosUtils";
import { ConnectionController } from "@web3modal/core";

interface ITick {
  prev: number;
  cur: number;
}

interface IProps {
  setCurrentCashout: Dispatch<SetStateAction<number>>;
}

export const CrashView: FC<IProps> = ({ setCurrentCashout }) => {
  const { crash, setCrash } = useCrash();
  const { app, setApp } = useApp();

  const phaserRef = useRef<IRefPhaserGame | null>(null);
  const updateWalletRef = useRef<boolean>(false);
  const currentCashoutUser = useRef<string>("");
  const [lastCashout, setLastCashout] = useState<number>(0);

  const [players, setPlayers] = useState<{ [userId: string]: IPlayer }>({});
  const [playerId, setPlayerId] = useState<string>();
  const [gameState, setGameState] = useState<string>("");
  const [histories, setHistories] = useState<IHistory[]>([]);
  const [crTick, setCrTick] = useState<ITick>({
    prev: 1,
    cur: 1.01,
  });
  const [checkTick, setCheckTick] = useState<number>(0);

  const currentScene = () => {};

  const changeGameScene = () => {
    if (phaserRef.current) {
      if (checkTick === 0) {
        const scene = phaserRef.current.scene as Prepare;

        if (scene && scene.sys.config === "Prepare") {
          if (crTick.prev === 1) {
            scene.changeScene();
          } else {
            scene.setSceneData(crTick.prev);
          }
        }
      } else {
        setTimeout(() => {
          const scene = phaserRef.current!.scene as Prepare;

          if (scene && scene.sys.config === "Prepare") {
            scene.setSceneData(checkTick);
          }
        }, 120);
      }
    }
  };

  const changeEndScene = () => {
    if (phaserRef.current) {
      const scene = phaserRef.current.scene as Play;

      if (scene && scene.sys.config === "Play") {
        scene.changeScene();
      }
    }
  };

  const changeBeforeScene = () => {
    if (phaserRef.current) {
      const scene = phaserRef.current.scene as End;

      if (scene && scene.sys.config === "End") {
        scene.changeScene();
        // scene.setEndPosition(duration);
      }
    }
  };

  const drawText = (crashout: number) => {
    if (phaserRef.current) {
      const scene = phaserRef.current.scene as Play;

      if (scene && scene.sys.config === "Play") {
        scene.drawCrashout(crashout);
      }
    }
  };

  useEffect(() => {
    drawText(crTick.cur);
  }, [crTick]);

  const dropPlayer = (player: string) => {
    if (phaserRef.current) {
      const scene = phaserRef.current.scene as Play;

      if (scene && scene.sys.config === "Play") {
        scene.dropPlayer(player);
      }
    }
  };

  const drawLastValue = (crashout: number) => {
    if (phaserRef.current) {
      const scene = phaserRef.current.scene as End;

      if (scene && scene.sys.config === "End") {
        scene.drawCrashout(crashout);
      }
    }
  };

  const drawBomb = () => {
    if (phaserRef.current) {
      const scene = phaserRef.current.scene as Prepare;

      if (scene && scene.sys.config === "Prepare") {
        scene.setEndScene();
      }
    }
  };

  useEffect(() => {
    if (playerId) {
      if (playerId === app.user?.id) {
        if (crash.gameMode !== "auto" && crash.betState) {
          setCrash((prevState) => ({ ...prevState, betState: false }));
          toast.success("Winner", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        } else if (crash.gameMode === "auto" && crash.betState) {
          setCrash((prevState) => ({ ...prevState, getCoin: true }));
        }
      }

      dropPlayer(
        formatUsername(
          players[playerId].username
            ? players[playerId].username
            : players[playerId].crypto,
          5
        )
      );
    }
  }, [playerId]);

  useEffect(() => {
    if (
      gameState === "end" &&
      lastCashout &&
      crash.scene?.sys.config === "End"
    ) {
      drawLastValue(lastCashout);
      setCheckTick(0);
    }
  }, [lastCashout, gameState, crash.scene]);

  useEffect(() => {
    setCrash((prevState) => ({ ...prevState, gameStep: gameState }));
    if (gameState === "") {
      // changePreloaderScene();
    } else if (gameState === "before") {
      setCrTick({ prev: 1, cur: 1.01 });
      changeBeforeScene();
    } else if (gameState === "gaming") {
      changeGameScene();
    } else if (gameState === "end") {
      changeEndScene();

      if (crash.gameMode === "auto" && crash.betState) {
        if (crash.numberRound !== -1 && crash.numberRound !== 0) {
          setCrash((prevState) => ({
            ...prevState,
            numberRound: crash.numberRound - 1,
          }));
        } else if (crash.numberRound !== -1) {
          setCrash((prevState) => ({
            ...prevState,
            betState: false,
          }));
        }
      } else if (crash.gameMode !== "auto" && crash.betState) {
        setCrash((prevState) => ({
          ...prevState,
          betState: false,
        }));
      }
    }
  }, [gameState]);

  useEffect(() => {
    setCrash((prevState) => ({
      ...prevState,
      players: players,
    }));
  }, [players]);

  useEffect(() => {
    const socketId = `${process.env.BACK_URL || "http://localhost:4000"}/crash`;

    const socket = io(socketId);
    if (!socket) return;
    setCrash((prevState) => ({ ...prevState, socket: socket }));

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (crash.socket) {
      if (app.user) {
        const token = getAccessToken();
        crash.socket.emit("auth", { address: app.user.crypto, token });
      }

      if (histories.length === 0) {
        crash.socket.emit("get-history");
      }

      crash.socket.on("currrent-crash-state", (data) => {
        if (data === 4) {
          setTimeout(() => {
            drawBomb();
          }, 120);
        }
      });

      crash.socket.on("crashgame-history", (data: IHistory[]) => {
        setHistories(data);
      });

      crash.socket.on("update_wallet", (data) => {
        if (!updateWalletRef.current) {
          updateWalletRef.current = true;
          setApp((prevState) => ({
            ...prevState,
            user: {
              id: prevState.user?.id || "",
              crypto: prevState.user?.crypto || "",
              amount: data.amount,
              avatar: prevState.user?.avatar || "",
              nickname: prevState.user?.nickname || "",
              username: prevState.user?.username || "",
            },
          }));
          setTimeout(() => {
            updateWalletRef.current = false;
          }, 200);
        }
      });

      crash.socket.emit("game-data");

      crash.socket.on("game-user-list", (data) => {
        const list = Object.keys(data);
        list.map((player: string) => {
          setPlayers((prev) => ({
            ...prev,
            [data[player].playerID]: data[player],
          }));
        });
      });

      crash.socket.on("game-starting", () => {
        setPlayers({});
        setCrash((prevState) => ({
          ...prevState,
          players: {},
        }));
        setGameState("before");
        setCheckTick(0);
      });

      crash.socket.on("game-start", () => {
        setCrash((prevState) => ({
          ...prevState,
          gameStartTime: new Date(),
        }));
        setGameState("gaming");
        setCrTick({ prev: 1, cur: 1 });
      });

      crash.socket.on("game-end", (data: any) => {
        if (crash.socket) {
          crash.socket.emit("get-history");
        }
        setGameState("end");
        setLastCashout(data.game.crashPoint);
      });

      crash.socket.on("auth-error", async (data) => {
        removeAllTokens();
        setApp((prevState) => ({ ...prevState, user: null }));
        await ConnectionController.disconnect();

        return toast.error(data, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      });

      crash.socket.on("expire-error", async (data) => {
        removeAllTokens();
        setApp((prevState) => ({ ...prevState, user: null }));
        await ConnectionController.disconnect();

        return toast.error(data, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      });

      crash.socket.on("game-bets", (data: IPlayer[]) => {
        data.map((player) => {
          setPlayers((prev) => ({ ...prev, [player.playerID]: player }));
        });
      });

      crash.socket.on("game-tick", (tick: { e: number; p: number }) => {
        setCrTick((prev) => ({
          prev: prev.cur,
          cur: tick.p,
        }));
        setCurrentCashout(tick.p);
        setCheckTick(tick.p);
        setGameState("gaming");
      });

      crash.socket.on(
        "cashout-bet",
        (data: {
          playerID: string;
          status: number;
          stoppedAt: number;
          winningAmount: number;
        }) => {
          if (currentCashoutUser.current !== data.playerID) {
            currentCashoutUser.current = data.playerID;
            setPlayers((prev) => ({
              ...prev,
              [data.playerID]: {
                ...prev[data.playerID],
                status: data.status,
                stoppedAt: data.stoppedAt,
                winningAmount: data.winningAmount,
              },
            }));

            setPlayerId(data.playerID);
          }
        }
      );
    }
  }, [crash.socket, app]);

  useEffect(() => {
    if (crash.socket) {
      crash.socket.emit("current-state");
    }
  }, [crash.socket]);

  useEffect(() => {
    if (gameState === "before") {
      if (crash.nextRound) {
        setCrash((prevState) => ({
          ...prevState,
          betState: true,
          nextRound: false,
        }));
      }

      if (crash.getCoin) {
        setCrash((prevState) => ({
          ...prevState,
          getCoin: false,
        }));
      }
    }
  }, [gameState]);

  return (
    <div className={S.body}>
      <CrashGame ref={phaserRef} currentActiveScene={currentScene} />
      <div className={S.header}>
        <span>Network Status</span>
        <div className={S.histories}>
          {histories.map((history, index) => (
            <DropBox $filter="2px" className={S.history} key={index}>
              x{(history.crashPoint / 100).toFixed(2)}
            </DropBox>
          ))}
        </div>
        <div className={S.btnGroup}>
          <DropButton $filter="2px" className={S.btn}>
            <Icon name="Audio" width={20} height={20} />
          </DropButton>
          <DropButton $filter="2px" className={S.btn}>
            <HiOutlineCalendar size={20} />
            <p>History</p>
          </DropButton>
        </div>
      </div>
    </div>
  );
};
