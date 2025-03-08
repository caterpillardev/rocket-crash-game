import { AUTO, Game, Scale, Types } from "phaser";
import { Boot, CoinflipGame, Preloader } from "./scenes";

const MAX_SIZE_WIDTH_SCREEN = 1920;
const MAX_SIZE_HEIGHT_SCREEN = 1080;
const MIN_SIZE_WIDTH_SCREEN = 320;
const MIN_SIZE_HEIGHT_SCREEN = 150;
const SIZE_WIDTH_SCREEN = 554;
const SIZE_HEIGHT_SCREEN = 236;

const config: Types.Core.GameConfig = {
  type: AUTO,
  scale: {
    mode: Scale.RESIZE,
    width: SIZE_WIDTH_SCREEN,
    height: SIZE_HEIGHT_SCREEN,
    min: {
      width: MIN_SIZE_WIDTH_SCREEN,
      height: MIN_SIZE_HEIGHT_SCREEN,
    },
    max: {
      width: MAX_SIZE_WIDTH_SCREEN,
      height: MAX_SIZE_HEIGHT_SCREEN,
    },
  },
  dom: {
    createContainer: true,
  },
  scene: [Boot, Preloader, CoinflipGame],
  transparent: true,
};

const StartGame = (parent: string) => {
  return new Game({ ...config, parent });
};

export default StartGame;
