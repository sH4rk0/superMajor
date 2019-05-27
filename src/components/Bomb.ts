import { Explosion } from '../components/Explosion'
import GamePlay from '../scenes/GamePlay'

export class Bomb extends Phaser.Physics.Arcade.Sprite {
  // variables
  protected currentScene: Phaser.Scene
  private hits: number

  constructor(params: BombConfig) {
    super(params.scene, params.x, params.y, params.key)

    // variables
    this.hits = params.hit
    this.currentScene = <GamePlay>params.scene
    this.name = 'bomb'
    this.initSprite()
    this.currentScene.add.existing(this)
  }

  protected initSprite() {
    this.setDepth(1999)
    this.setOrigin(0.5).setScale(3)
    let _bomb: Phaser.Types.Animations.Animation = {
      key: 'bomb',

      frames: this.currentScene.anims.generateFrameNumbers('bomb', {
        frames: [0, 1]
      }),
      frameRate: 20,
      yoyo: false,
      repeat: -1
    }
    this.currentScene.anims.create(_bomb)
    this.play('bomb')
    this.setOrigin(0.5)
    // variables

    this.currentScene.tweens.add({
      targets: this,
      y: 650,
      duration: 500,
      onComplete: () => {
        //@ts-ignore
        if (this.hits == this.currentScene.delucaMaxHits) {
          //@ts-ignore
          this.currentScene.win()
        }

        new Explosion({ scene: this.currentScene, x: this.x, y: this.y, key: '' })
        this.destroy()

        this.currentScene.cameras.main.shake(200, 0.01, true)
      }
    })
  }
}
