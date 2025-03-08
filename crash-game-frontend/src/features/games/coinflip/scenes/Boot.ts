import { EventBus } from "@features/games/EventBus";
import { Scene, Structs } from "phaser";

export interface CustomScene extends Scene {
  parent: Structs.Size;
  sizer: Structs.Size;
  width: number;
  height: number;
  sceneStopped: boolean;
}

export class Boot extends Scene implements CustomScene {
  parent: Structs.Size;
  sizer: Structs.Size;
  width: number;
  height: number;
  sceneStopped: boolean = false;

  gameScene: Scene | null = null;
  sceneRunning: string | null = null;

  constructor() {
    super("Boot");
    this.parent = new Structs.Size();
    this.sizer = new Structs.Size();
    this.width = 0;
    this.height = 0;
  }

  create() {
    this.width = Number(this.sys.game.config.width);
    this.height = Number(this.sys.game.config.height);

    this.cameras.main.setBackgroundColor("rgba(0,0,0,0)");
    this.launchScene("Preloader");
    EventBus.emit("current-scene-ready", this);
  }

  launchScene(scene: string) {
    this.scene.launch(scene);
    this.gameScene = this.scene.get(scene);
  }

  updateResize(scene: CustomScene) {
    scene.scale.on("resize", this.resize, scene);

    const scaleWidth = scene.scale.gameSize.width;
    const scaleHeight = scene.scale.gameSize.height;

    scene.parent = new Phaser.Structs.Size(scaleWidth, scaleHeight);
    scene.sizer = new Phaser.Structs.Size(
      scene.width,
      scene.height,
      Phaser.Structs.Size.FIT,
      scene.parent
    );

    scene.parent.setSize(scaleWidth, scaleHeight);
    scene.sizer.setSize(scaleWidth, scaleHeight);

    this.updateCamera(scene);
  }

  resize() {
    if (!this.sceneStopped) {
      const width = this.scale.gameSize.width;
      const height = this.scale.gameSize.height;

      this.parent.setSize(width, height);
      this.sizer.setSize(width, height);

      const camera = this.cameras.main;

      if (camera) {
        const scaleX = this.sizer.width / 554;
        const scaleY = this.sizer.height / 236;

        camera.setZoom(Math.max(scaleX, scaleY));
        camera.centerOn(554 / 2, 236 / 2);
      }
    }
  }

  updateCamera(scene: CustomScene) {
    const camera = scene.cameras.main;

    const scaleX = scene.sizer.width / 554;
    const scaleY = scene.sizer.height / 236;

    camera.setZoom(Math.max(scaleX, scaleY));
    camera.centerOn(554 / 2, 236 / 2);
  }
}
