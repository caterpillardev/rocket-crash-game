import { GameObjects, Scene, Structs } from "phaser";
import { EventBus } from "../../EventBus";
import { Boot, CustomScene } from "./Boot";

export class End extends Scene implements CustomScene {
  background: GameObjects.Image | null = null;
  boom: GameObjects.Image | null = null;
  x: number = 0;
  y: number = 0;
  crashOut: GameObjects.Text | null = null;
  xAxis: GameObjects.Graphics | null = null;
  yAxis: GameObjects.Graphics | null = null;
  y1: GameObjects.Text | null = null;
  y2: GameObjects.Text | null = null;
  y3: GameObjects.Text | null = null;
  y4: GameObjects.Text | null = null;
  y5: GameObjects.Text | null = null;
  frameIndex: number = 1;

  parent: Structs.Size;
  sizer: Structs.Size;
  width: number;
  height: number;
  canvasWidth: number | null = null;
  canvasHeight: number | null = null;
  bootScene: Boot | null = null;
  sceneStopped: boolean = false;

  constructor() {
    super("End");
    this.parent = new Structs.Size();
    this.sizer = new Structs.Size();
    this.width = 0;
    this.height = 0;
  }

  init(data: any) {
    this.setEndPosition(data.current.bombX, data.current.bombY);
    this.frameIndex = data.current.index;
  }

  create() {
    this.width = Number(this.sys.game.config.width);
    this.height = Number(this.sys.game.config.height);

    this.add
      .sprite(0, this.height, "groundAtlas", `${this.frameIndex}.jpg`)
      .setOrigin(0, 1)
      .setScale(1.045, 1);

    this.bootScene = this.scene.get("Boot") as Boot;
    this.bootScene.sceneRunning = "end";

    // this.bootScene.updateResize(this);

    this.boom = this.add
      .image(this.x, this.y, "bomb")
      .setOrigin(0.5)
      .setScale(0.1)
      .setAlpha(1);

    this.tweens.add({
      targets: this.boom,
      scale: 0.4,
      alpha: 0,
      yoyo: false,
      duration: 800,
    });

    this.crashOut = this.add
      .text(100, 100, ``, {
        font: "bold 48px Manrope",
        color: "black",
        align: "center",
        stroke: "#fff",
        strokeThickness: 2,
      })
      .setOrigin(0, 0.5)
      .setDepth(10);

    this.xAxis = this.add
      .graphics()
      .lineStyle(1, 0x000, 1)
      .moveTo(60, this.height - 28)
      .lineTo(900, this.height - 28)
      .strokePath();

    this.yAxis = this.add
      .graphics()
      .lineStyle(1, 0x000, 1)
      .moveTo(60, 30)
      .lineTo(60, this.height - 28)
      .strokePath();

    this.y1 = this.add
      .text(55, 50, "2.6x", {
        font: "bold 12px Manrope",
        color: "black",
        align: "center",
      })
      .setOrigin(1, 0.5);

    this.y2 = this.add
      .text(55, 50 + (this.height - 95) / 4, "2.2x", {
        font: "bold 12px Manrope",
        color: "black",
        align: "center",
      })
      .setOrigin(1, 0.5);

    this.y3 = this.add
      .text(55, 50 + ((this.height - 95) / 4) * 2, "1.8x", {
        font: "bold 12px Manrope",
        color: "black",
        align: "center",
      })
      .setOrigin(1, 0.5);

    this.y4 = this.add
      .text(55, 50 + ((this.height - 95) / 4) * 3, "1.4x", {
        font: "bold 12px Manrope",
        color: "black",
        align: "center",
      })
      .setOrigin(1, 0.5);

    this.y5 = this.add
      .text(55, this.height - 45, "1.00x", {
        font: "bold 12px Manrope",
        color: "black",
        align: "center",
      })
      .setOrigin(1, 0.5);

    EventBus.emit("current-scene-ready", this);
  }

  update() {
    this.boom?.setPosition(this.x, this.y);
  }

  setEndPosition(bombX: number, bombY: number) {
    this.x = bombX;
    this.y = bombY;
  }

  growthFunc = (ms: number) =>
    Math.floor(100 * Math.pow(Math.E, 0.00000000001 * ms));

  changeScene() {
    this.scene.stop("End");
    if (this.bootScene) {
      this.bootScene.launchScene("Prepare", 0);
    }
  }

  drawCrashout(crashout: number) {
    this.crashOut?.setText(`${crashout.toFixed(2)}x`);

    if (crashout >= 2.4) {
      this.y1?.setText((crashout + 0.2).toFixed(2) + "x");
      this.y2?.setText((((crashout + 0.2 - 1) / 4) * 3 + 1).toFixed(2) + "x");
      this.y3?.setText(((crashout + 0.2 - 1) / 2 + 1).toFixed(2) + "x");
      this.y4?.setText(((crashout + 0.2 - 1) / 4 + 1).toFixed(2) + "x");
    }
  }

  drawBomb() {
    this.boom?.setPosition(80, 80);
  }
}
