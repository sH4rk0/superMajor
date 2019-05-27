export class Enemy extends Phaser.GameObjects.Sprite {
  // variables
  protected currentScene: Phaser.Scene
  protected isActivated: boolean
  protected isDying: boolean
  protected speed: number
  protected dyingScoreValue: number

  constructor(params: EnemyConfig) {
    super(params.scene, params.x, params.y, params.key)

    // variables
    this.currentScene = params.scene
    this.initSprite()
    this.currentScene.add.existing(this)
  }

  protected initSprite() {
    // variables
    this.isActivated = false
    this.isDying = false
    this.currentScene.physics.world.enable(this)
    //@ts-ignore
  }

  protected showAndAddScore(): void {
    this.currentScene.registry.values.score += this.dyingScoreValue
    this.currentScene.events.emit('scoreChanged')

    let scoreText = this.currentScene.add
      .dynamicBitmapText(this.x, this.y, 'commodore', this.dyingScoreValue.toString(), 30)
      .setOrigin(0.5, 0.5)
      .setDepth(1000)

    this.currentScene.add.tween({
      targets: scoreText,
      props: { y: scoreText.y - 40, alpha: 0 },
      duration: 500,
      ease: 'Power2',
      yoyo: false,
      onComplete: function() {
        scoreText.destroy()
      }
    })
  }
}
