// import socket from "@utils/socketUtils/mineSocketUtil";
import { EventBus } from "@features/games/EventBus";
import { mineSocket } from "@utils/socketUtils";
import { GameObjects, Physics, Scene } from "phaser";

export class MainGame extends Scene {
  platforms: Physics.Arcade.StaticGroup | null = null;
  mineGameActor: any;
  step: number = 0;
  starGroup: GameObjects.Group | null = null;
  imageX: number = 0;
  imageY: number = 0;
  count: number = 0;
  height: number = 0;
  width: number = 0;
  gameState: boolean = false;

  constructor() {
    super("MineGame");
    // socket.on("connect", () => {
    //   console.log("Connet socket in main game");
    // });
  }

  create() {
    this.width = Number(this.sys.game.config.width);
    this.height = Number(this.sys.game.config.height);

    this.platforms = this.physics.add.staticGroup();
    this.starGroup = this.add.group();

    for (let row = 0; row < 5; row++) {
      for (let col = 0; col < 5; col++) {
        const x = 60 + (col * this.width) / 5;
        const y = this.height - (row * this.height) / 5 - 30;

        const box = this.platforms
          .create(x, y, "box")
          .setOrigin(0.5)
          .setInteractive();

        box.on("pointerover", function (this: GameObjects.Image) {
          this.scene.tweens.add({
            targets: this,
            scale: 1.1,
            duration: 200,
            ease: "Power1",
          });
          this.scene.input.manager.canvas.style.cursor = "pointer";
        });

        box.on("pointerout", function (this: Phaser.GameObjects.Image) {
          this.scene.tweens.add({
            targets: this,
            scale: 1,
            duration: 200,
            ease: "Power1",
          });
          this.scene.input.manager.canvas.style.cursor = "default";
        });

        box.on("pointerdown", async function (this: Phaser.GameObjects.Image) {
          // @ts-ignore
          if (this.scene.gameState) {
            // @ts-ignore
            this.scene.step++;
            // @ts-ignore
            const step = this.scene.step;
            // @ts-ignore
            this.scene.imageX = this.x;
            // @ts-ignore
            this.scene.imageY = this.y;
            // @ts-ignore
            this.scene.count = row * 5 + col;
            if (mineSocket) {
              mineSocket.emit("open-box", row * 5 + col, step);
            }
          }
        });
      }
    }

    EventBus.emit("current-scene-ready", this);
  }

  startedGame() {
    this.gameState = true;

    if (this.starGroup) {
      // @ts-ignore
      this.starGroup!.children.each((child: any) => {
        child.destroy();
      });
    }
  }

  showStar(state: number) {
    if (state) {
      const star = this.add
        .image(this.imageX, this.imageY - 35, "star")
        .setAlpha(0);
      this.tweens.add({
        targets: star,
        alpha: 1,
        duration: 200,
        ease: "Power1",
      });
      if (this.starGroup) {
        this.starGroup.add(star);
      }
    } else {
      const bomb = this.add.image(this.imageX, this.imageY - 35, "bomb");
      this.tweens.add({
        targets: bomb,
        scale: 1.1,
        duration: 200,
        ease: "ease",
        repeat: 5,
        yoyo: true,
      });

      let boom: GameObjects.Image | null = null;

      setTimeout(() => {
        bomb.destroy();

        boom = this.add
          .image(this.imageX, this.imageY - 35, "boom")
          .setScale(0.05);
        this.tweens.add({
          targets: boom,
          scale: 0.2,
          alpha: 0.1,
          ease: "Power1",
          duration: 1000,
          repeat: 0,
          yoyo: false,
        });
      }, 1000);

      setTimeout(() => {
        if (boom) {
          boom.destroy();
          boom = null;
        }
      }, 2000);
    }
  }

  endGame(data: number[]) {
    this.gameState = false;
    this.step = 0;
    if (this.starGroup) {
      setTimeout(() => {
        // @ts-ignore
        this.starGroup!.children.each((child: any) => {
          child.destroy();
        });

        for (let row = 0; row < 5; row++) {
          for (let col = 0; col < 5; col++) {
            const x = 60 + (col * this.width) / 5;
            const y = this.height - (row * this.height) / 5 - 30;

            if (data[row * 5 + col] === 1) {
              const star = this.add.image(x, y - 35, "star");
              if (this.starGroup) this.starGroup.add(star);
            } else if (data[row * 5 + col] === 0) {
              const bomb = this.add.image(x, y - 35, "bomb");
              if (this.starGroup) this.starGroup.add(bomb);
            }
          }
        }
      }, 2500);
    }
  }
}
