export class Bonus1Up extends Phaser.GameObjects.Sprite {
  // variables
  protected currentScene: Phaser.Scene
  private score: number

  constructor(params: BonusConfig) {
    super(params.scene, params.x, params.y, params.key)

    // variables
    this.score = params.score
    this.currentScene = params.scene
    this.name = 'bonus1up'
    this.initSprite()
    this.currentScene.add.existing(this)
  }

  protected initSprite() {
    this.setOrigin(0.5)
    // variables

    this.currentScene.physics.world.enable(this)
    //@ts-ignore
    //this.body.setImmovable(true)
    //@ts-ignore
    this.body.setAllowGravity(true)
  }

  getBonus(): void {
    this.destroy()
    this.currentScene.sound.playAudioSprite('sfx', 'smb_coin')
    this.currentScene.registry.values.lives += 1
    this.currentScene.events.emit('livesChanged')
  }
}
