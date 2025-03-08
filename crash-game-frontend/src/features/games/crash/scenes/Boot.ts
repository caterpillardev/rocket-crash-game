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
  sceneRunning: string | null = null;
  gameScene: Scene | null = null;

  constructor() {
    super("Boot");
    this.parent = new Structs.Size();
    this.sizer = new Structs.Size();
    this.width = 0;
    this.height = 0;
  }

  preload() {
    this.load.multiatlas({
      key: "groundAtlas",
      atlasURL: "ground/ground.json",
      path: "ground/",
    });
  }

  create() {
    this.launchScene("Preloader", 0);
  }

  launchScene(scene: string, data: any) {
    this.scene.launch(scene, { current: data });
    this.gameScene = this.scene.get(scene);
  }

  // updateResize(scene: CustomScene) {
  //   scene.scale.on("resize", this.resize, scene);

  //   const scaleWidth = scene.scale.gameSize.width;
  //   const scaleHeight = scene.scale.gameSize.height;

  //   scene.parent = new Phaser.Structs.Size(scaleWidth, scaleHeight);
  //   scene.sizer = new Phaser.Structs.Size(
  //     scene.width,
  //     scene.height,
  //     Phaser.Structs.Size.FIT,
  //     scene.parent
  //   );

  //   scene.parent.setSize(scaleWidth, scaleHeight);
  //   scene.sizer.setSize(scaleWidth, scaleHeight);

  //   this.updateCamera(scene);
  // }

  // resize() {
  //   if (!this.sceneStopped) {
  //     const width = this.scale.gameSize.width;
  //     const height = this.scale.gameSize.height;

  //     this.parent.setSize(width, height);
  //     this.sizer.setSize(width, height);

  //     const camera = this.cameras.main;

  //     if (camera) {
  //       const scaleX = this.sizer.width / 850;
  //       const scaleY = this.sizer.height / 415;

  //       camera.setZoom(Math.max(scaleX, scaleY));
  //       camera.centerOn(850 / 2, 415 / 2);
  //     }
  //   }
  // }

  // updateCamera(scene: CustomScene) {
  //   const camera = scene.cameras.main;

  //   const scaleX = scene.sizer.width / 850;
  //   const scaleY = scene.sizer.height / 415;

  //   camera.setZoom(Math.max(scaleX, scaleY));
  //   camera.centerOn(850 / 2, 415 / 2);
  // }
}
