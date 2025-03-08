import { GameObjects, Scene, Structs, Tweens } from "phaser";
import { EventBus } from "../../EventBus";
import { Boot, CustomScene } from "./Boot";

export class Prepare extends Scene implements CustomScene {
  rocketGroup: GameObjects.Container | null = null;
  beforeRocket: GameObjects.Image | null = null;
  rocket: GameObjects.Container | null = null;
  rocketBody: GameObjects.Image | null = null;
  fire: GameObjects.Image | null = null;
  crashOut: GameObjects.Text | null = null;
  logoTween: Tweens.Tween | null = null;
  duration: number = 360;
  retime: number = 0;
  startedAt: Date | null = null;

  startFlag: boolean = false;

  bootScene: Boot | null = null;
  sceneStopped: boolean = false;

  parent: Structs.Size;
  sizer: Structs.Size;
  width: number;
  height: number;

  constructor() {
    super("Prepare");
    this.parent = new Structs.Size();
    this.sizer = new Structs.Size();
    this.width = 0;
    this.height = 0;
  }

  create() {
    this.width = Number(this.sys.game.config.width);
    this.height = Number(this.sys.game.config.height);

    this.add
      .sprite(0, this.height, "groundAtlas", "1.jpg")
      .setOrigin(0, 1)
      .setScale(1.045, 1);

    this.bootScene = this.scene.get("Boot") as Boot;
    this.bootScene.sceneRunning = "prepare";

    // this.bootScene.updateResize(this);

    this.rocketGroup = this.add.container();
    this.rocket = this.add.container();

    this.fire = this.add.image(0, 0, "fire").setOrigin(1, 0.5).setAlpha(0.8);

    this.rocketBody = this.add.image(0, 0, "rocket").setOrigin(0, 0.5);

    this.rocket
      .add(this.fire)
      .add(this.rocketBody)
      .setScale(0.3)
      .setPosition(110, -30);

    this.beforeRocket = this.add.image(0, 0, "preRocket").setOrigin(0, 0.95);

    this.rocketGroup
      .add(this.rocket)
      .add(this.beforeRocket)
      .setPosition(-200, this.height);

    this.crashOut = this.add
      .text(this.width / 2, this.height / 2, `10:00`, {
        font: "bold 48px Manrope",
        color: "black",
        align: "center",
        stroke: "#fff",
        strokeThickness: 2,
      })
      .setOrigin(0.5)
      .setDepth(10);

    this.startAnim();
    EventBus.emit("current-scene-ready", this);
  }

  update() {
    if (this.retime > 0) {
      this.retime -= 1;
      const second = Math.floor(this.retime / 60).toFixed(0);
      const ms = ((this.retime % 60) * 60) / 60;
      let msText;
      if (ms < 10) {
        msText = "0" + ms;
      } else {
        msText = ms;
      }
      this.crashOut?.setText(second + ":" + msText);
    }
  }

  changeScene() {
    this.scene.stop("Prepare");
    if (this.bootScene) {
      this.bootScene.launchScene("Play", 0);
    }
  }

  setSceneData(data: number) {
    this.scene.stop("Prepare");
    if (this.bootScene) {
      this.bootScene.launchScene("Play", data * 100);
    }
  }

  setEndScene() {
    const data = {
      bombX: 400,
      bombY: 250,
    };
    this.scene.stop("Prepare");
    if (this.bootScene) {
      this.bootScene.launchScene("End", data);
    }
  }

  startAnim() {
    this.retime = this.duration;

    this.tweens.add({
      targets: this.fire,
      duration: 60,
      scaleX: 0.7,
      repeat: -1,
      yoyo: true,
    });

    this.tweens.add({
      targets: this.rocket,
      x: 250,
      duration: 800,
      delay: 4700,
      repeat: 0,
    });

    this.tweens.add({
      targets: this.rocketGroup,
      x: -200,
      duration: 800,
      delay: 4700,
      repeat: 0,
    });

    this.tweens.add({
      targets: this.rocketGroup,
      x: -100,
      duration: 1000,
      delay: 3000,
      repeat: 0,
    });

    this.tweens.add({
      targets: this.rocketGroup,
      angle: -5,
      duration: 400,
      delay: 4300,
      ease: "Power1",
      repeat: 0,
      yoyo: true,
    });

    this.tweens.add({
      targets: this.rocketGroup,
      x: 50,
      duration: 2000,
      repeat: 0,
    });
  }
}
