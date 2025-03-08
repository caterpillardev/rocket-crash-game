import { AUTO, Game } from "phaser";
import { Boot, End, Play, Preloader, Prepare } from "./scenes";

const config: Phaser.Types.Core.GameConfig = {
  type: AUTO,
  // scale: {
  //   mode: Phaser.Scale.RESIZE,
  //   // autoCenter: Phaser.Scale.ZOOM_2X,
  // },
  width: 940,
  height: 451,
  parent: "game-container",
  backgroundColor: "#000",
  scene: [Boot, Preloader, Prepare, Play, End],
};

const StartGame = (parent: string) => {
  return new Game({ ...config, parent });
};

export default StartGame;
