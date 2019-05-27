export class Deluca extends Phaser.Physics.Arcade.Sprite {
  // variables
  protected currentScene: Phaser.Scene
  private score: number

  constructor(params: genericConfig) {
    super(params.scene, params.x, params.y, params.key)

    // variables

    this.currentScene = params.scene
    this.name = 'deluca'
    this.initSprite()
    this.currentScene.add.existing(this)
  }

  protected initSprite() {
    this.currentScene.physics.world.enable(this)
    //@ts-ignore
    this.body.setAllowGravity(false)
    //@ts-ignore
    this.body.setImmovable(true)

    this.setDepth(1900)
    this.setOrigin(1)
      .setScale(2)
      .setFlipX(true)
    let _idleConfig: Phaser.Types.Animations.Animation = {
      key: 'deluca-idle',

      frames: this.currentScene.anims.generateFrameNumbers('deluca', {
        frames: [0, 1, 2, 3]
      }),
      frameRate: 6,
      yoyo: false,
      repeat: -1
    }
    this.currentScene.anims.create(_idleConfig)
    this.play('deluca-idle')
  }
}
