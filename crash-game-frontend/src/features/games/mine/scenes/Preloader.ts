import { Scene } from "phaser";
import star from "@assets/img/mine/star.webp";
import bomb from "@assets/img/mine/bomb.webp";
import box from "@assets/img/mine/box.webp";
import boom from "@assets/img/boom.webp";

export class Preloader extends Scene {
  constructor() {
    super("Preloader");
  }

  preload() {
    this.load.image("star", star);
    this.load.image("bomb", bomb);
    this.load.image("box", box);
    this.load.image("boom", boom);
  }

  create() {
    this.scene.start("MineGame");
  }
}
