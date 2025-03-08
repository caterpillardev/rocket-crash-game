import { Scene, Structs } from "phaser";
import rocket from "@assets/img/rocket.webp";
import bomb from "@assets/img/boom.webp";
import fire from "@assets/img/fire.webp";
import beforeRocket from "@assets/img/beforeRocket.png";
import path from "@assets/img/path.webp";
import { Boot, CustomScene } from "./Boot";
import { EventBus } from "@features/games/EventBus";

export class Preloader extends Scene implements CustomScene {
  parent: Structs.Size;
  sizer: Structs.Size;
  width: number;
  height: number;
  canvasWidth: number | null = null;
  canvasHeight: number | null = null;
  bootScene: Boot | null = null;
  sceneStopped: boolean = false;

  constructor() {
    super("Preloader");
    this.parent = new Structs.Size();
    this.sizer = new Structs.Size();
    this.width = 0;
    this.height = 0;
  }

  preload() {
    this.load.image("rocket", rocket);
    this.load.image("bomb", bomb);
    this.load.image("fire", fire);
    this.load.image("preRocket", beforeRocket);
    this.load.image("path", path);

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

          EventBus.emit("current-scene-ready", this);
          if (this.bootScene) {
            this.bootScene.cameras.main.setBackgroundColor("#020079");
            this.bootScene.launchScene("Prepare", 0);
          }
        },
        loop: false,
      });
    });
  }

  create() {}

  changeScene(data?: any) {
    if (data) {
      this.scene.stop("Prepare");
      if (this.bootScene) {
        this.bootScene.launchScene("Play", data);
      }
    } else {
      if (this.bootScene) {
        this.bootScene.launchScene("Prepare", 0);
      }
    }
  }
}
