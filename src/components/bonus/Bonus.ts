export class Bonus extends Phaser.Physics.Arcade.Sprite {
  // variables
  protected currentScene: Phaser.Scene
  private score: number
  private allowGravity: boolean

  constructor(params: BonusConfig) {
    super(params.scene, params.x, params.y, params.key)

    // variables
    this.score = params.score
    if (params.allowGravity != undefined) {
      this.allowGravity = params.allowGravity
    }

    this.currentScene = params.scene
    this.name = 'bonus'
    this.initSprite()
    this.currentScene.add.existing(this)
  }

  protected initSprite() {
    let _coin: Phaser.Types.Animations.Animation = {
      key: 'coin-spin',

      frames: this.currentScene.anims.generateFrameNumbers('bonus-coin', {
        frames: [0, 1, 2, 3, 4, 5, 6, 7]
      }),
      frameRate: 10,
      yoyo: false,
      repeat: -1
    }
    this.currentScene.anims.create(_coin)
    this.play('coin-spin')
    this.setOrigin(0.5)
    // variables

    this.currentScene.physics.world.enable(this)
    this.setBounce(0.4)

    if (this.allowGravity) {
      //@ts-ignore
      this.body.setAllowGravity(true)
      //@ts-ignore
      this.body.setVelocityY(-400)
      //@ts-ignore
      this.body.setVelocityX(Phaser.Math.RND.integerInRange(-50, 50))
    } else {
      //@ts-ignore
      this.body.setAllowGravity(false)
    }

    //@ts-ignore
    //this.body.setImmovable(true)
  }

  getBonus(): void {
    this.disableBody(true, true)
    this.destroy()
    this.currentScene.sound.playAudioSprite('sfx', 'smb_coin')
    this.currentScene.registry.values.score += this.score
    this.currentScene.events.emit('scoreChanged')

    let scoreText = this.currentScene.add
      .dynamicBitmapText(this.x, this.y - 50, 'commodore', this.score.toString(), 30)
      .setOrigin(0.5)
      .setDepth(1000)

    this.currentScene.add.tween({
      targets: scoreText,
      props: { y: scoreText.y - 50, alpha: 0 },
      duration: 500,
      ease: 'Power2',
      yoyo: false,
      onComplete: () => {
        scoreText.destroy()
      }
    })
  }
}
