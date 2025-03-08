import { Game, Scene } from "phaser";
import { forwardRef, useEffect, useLayoutEffect, useRef } from "react";
import StartGame from "./main";
import { EventBus } from "../EventBus";

export interface IRefCoinGame {
  game: Game | null;
  scene: Scene | null;
}

interface IProps {
  currentActiveScene?: (scene_instance: Scene) => void;
}

export const CoinFlipGame = forwardRef<IRefCoinGame, IProps>(function CoinGame(
  { currentActiveScene },
  ref
) {
  const game = useRef<Game | null>(null);

  useLayoutEffect(() => {
    if (game.current === null) {
      game.current = StartGame("coin-container");

      if (typeof ref === "function") {
        ref({ game: game.current, scene: null });
      } else if (ref) {
        ref.current = { game: game.current, scene: null };
      }
    }

    return () => {
      if (game.current) {
        game.current.destroy(true);

        if (game.current !== null) {
          game.current = null;
        }
      }
    };
  }, [ref]);

  useEffect(() => {
    EventBus.on("current-scene-ready", (scene_instance: Scene) => {
      if (currentActiveScene && typeof currentActiveScene === "function") {
        currentActiveScene(scene_instance);
      }

      if (typeof ref === "function") {
        ref({ game: game.current, scene: scene_instance });
      } else if (ref) {
        ref.current = { game: game.current, scene: scene_instance };
      }
    });
  }, [ref, currentActiveScene]);

  return <div id="coin-container" style={{ backgroundColor: "transparent" }} />;
});
