import { GameObjects, Physics, Scene, Structs } from "phaser";
import { Boot, CustomScene } from "./Boot";
import { EventBus } from "@features/games/EventBus";

export class CoinflipGame extends Scene implements CustomScene {
  parent: Phaser.Structs.Size;
  sizer: Phaser.Structs.Size;
  width: number;
  height: number;
  sceneStopped: boolean = false;

  bootScene: Boot | null = null;
  coinAmount: number = 1;
  head: number = 1;
  type: boolean = true;
  platforms: Physics.Arcade.StaticGroup | null = null;
  imgGroup: GameObjects.Group | null = null;

  constructor() {
    super("CoinflipGame");
    this.parent = new Structs.Size();
    this.sizer = new Structs.Size();
    this.width = 0;
    this.height = 0;
  }

  create() {
    this.width = Number(this.sys.game.config.width);
    this.height = Number(this.sys.game.config.height);

    this.bootScene = this.scene.get("Boot") as Boot;
    this.bootScene.sceneRunning = "play";
    this.bootScene.cameras.main.setBackgroundColor("rgba(0,0,0,0)");
    this.bootScene.updateResize(this);

    this.imgGroup = this.add.group();

    for (let row = 0; row < this.coinAmount; row++) {
      const x = 55 + (this.width / 5) * (row % 5);
      const y = 60 + (this.height / 2) * Math.floor(row / 5);

      const image = this.add.image(x, y, "head").setScale(0.4);
      this.imgGroup.add(image);
    }

    EventBus.emit("current-scene-ready", this);
  }

  updateImage() {
    if (this.imgGroup) {
      this.imgGroup.clear(true, true);
    }

    for (let row = 0; row < this.coinAmount; row++) {
      const x = 55 + (this.width / 5) * (row % 5);
      const y = 60 + (this.height / 2) * Math.floor(row / 5);

      let img;
      if (row < this.head) {
        if (this.type) {
          img = this.add.image(x, y, "head").setScale(0.4);
        } else {
          img = this.add.image(x, y, "tail").setScale(0.4);
        }
      } else {
        if (this.type) {
          img = this.add.image(x, y, "tail").setScale(0.4);
        } else {
          img = this.add.image(x, y, "head").setScale(0.4);
        }
      }
      this.imgGroup?.add(img);
    }
  }

  setCoinNumber(amount: number, head: number, type: boolean) {
    this.coinAmount = amount;
    this.head = head;
    this.type = type;
    this.updateImage();
  }
}
