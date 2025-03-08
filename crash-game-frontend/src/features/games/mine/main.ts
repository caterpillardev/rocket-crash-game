import { AUTO, Game, Scale, Types } from "phaser";
import { MainGame, Preloader } from "./scenes";

const config: Types.Core.GameConfig = {
  width: 614,
  height: 500,
  type: AUTO,
  scale: {
    mode: Scale.FIT,
    autoCenter: Scale.CENTER_BOTH,
  },
  scene: [Preloader, MainGame],
  transparent: true,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { x: 0, y: 300 },
      debug: false,
    },
  },
};

const StartGame = (parent: string) => {
  return new Game({ ...config, parent });
};

export default StartGame;
