export class Explosion extends Phaser.Physics.Arcade.Sprite {
  // variables
  protected currentScene: Phaser.Scene
  private score: number

  constructor(params: ExplosionConfig) {
    super(params.scene, params.x, params.y, params.key)

    // variables

    this.currentScene = params.scene
    this.name = 'explosion'
    this.initSprite()
    this.currentScene.add.existing(this)
  }

  protected initSprite() {
    this.setDepth(1999)
    this.setScale(2).setOrigin(0.5)
    let _explosion: Phaser.Types.Animations.Animation = {
      key: 'explosion',

      frames: this.currentScene.anims.generateFrameNumbers('explosion', {
        frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27]
      }),
      frameRate: 20,
      yoyo: false,
      repeat: 0
    }
    this.currentScene.anims.create(_explosion)
    this.play('explosion')
    this.on(
      'animationcomplete',
      () => {
        this.destroy()
      },
      this
    )

    this.setOrigin(0.5)
    // variables
  }
}
