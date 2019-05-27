export class BrickTile extends Phaser.GameObjects.Sprite {
  private tile: Phaser.Tilemaps.Tile
  scene: Phaser.Scene
  constructor(config: any) {
    super(config.scene, -100, 0, '')
    config.scene.add.existing(this)
    this.scene = config.scene
    this.alpha = 0

    config.scene.physics.world.enable(this)
    //@ts-ignore
    this.body.allowGravity = false
    this.setScale(3).setDepth(this.y)
  }

  update() {
    /*
    this.scene.enemyGroup.children.entries.forEach(enemy => {
      this.scene.physics.world.overlap(this, enemy, () => {
        enemy.starKilled()
      })
    })
    */
  }

  restart(tile: Phaser.Tilemaps.Tile, texture: string) {
    this.setTexture(texture)
    this.tile = tile
    this.tile.alpha = 0

    this.alpha = 1
    this.x = (this.tile.x * 16 + 8) * 3
    this.y = (this.tile.y * 16 + 8) * 3
    this.scene.tweens.add({
      targets: this,
      y: this.y - 8,
      yoyo: true,
      duration: 100,
      onUpdate: () => this.update(),
      onComplete: () => {
        this.tile.alpha = 1
        this.x = -100
        this.alpha = 0
      }
    })
  }
}
