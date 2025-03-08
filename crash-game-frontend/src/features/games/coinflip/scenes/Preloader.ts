import { Scene, Structs } from "phaser";
import head from "@assets/img/coinflip/head.webp";
import tail from "@assets/img/coinflip/tail.webp";
import { Boot, CustomScene } from "./Boot";

export class Preloader extends Scene implements CustomScene {
  parent: Structs.Size;
  sizer: Structs.Size;
  width: number;
  height: number;
  sceneStopped: boolean = false;

  gameScene: Scene | null = null;
  canvasWidth: number | null = null;
  canvasHeight: number | null = null;
  bootScene: Boot | null = null;

  constructor() {
    super("Preloader");
    this.parent = new Structs.Size();
    this.sizer = new Structs.Size();
    this.width = 0;
    this.height = 0;
  }

  preload() {
    this.load.image("head", head);
    this.load.image("tail", tail);

    this.canvasWidth = this.sys.game.canvas.width;
    this.canvasHeight = this.sys.game.canvas.height;

    this.width = Number(this.sys.game.config.width);
    this.height = Number(this.sys.game.config.height);

    this.bootScene = this.scene.get("Boot") as Boot;
    this.bootScene.sceneRunning = "preloader";
    this.sceneStopped = false;

    this.load.on("complete", () => {
      this.time.addEvent({
        delay: 100,
        callback: () => {
          this.sceneStopped = true;
          this.scene.stop("Preloader");
          if (this.bootScene) {
            this.bootScene.cameras.main.setBackgroundColor("rgba(0,0,0,0)");
            this.bootScene.launchScene("CoinflipGame");
          }
        },
        loop: false,
      });
    });
  }

  create() {
    if (this.bootScene) {
      this.bootScene.cameras.main.setBackgroundColor("rgba(0,0,0,0)");
      this.bootScene.updateResize(this);
    }
  }
}
