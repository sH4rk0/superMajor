import { GameData } from '../GameData'

export default class Level extends Phaser.Scene {
  private lines: Phaser.GameObjects.TileSprite
  private levels: Array<LevelConfig> = GameData.levels
  private currentLevel: number
  private currentPlayer: number
  private score: number
  private textLevel: Phaser.GameObjects.BitmapText
  private textLevel2: Phaser.GameObjects.BitmapText
  private blockOffsetX: number = 10

  constructor() {
    super({
      key: 'Level'
    })
  }

  create() {
    this.currentLevel = this.registry.get('level')
    this.currentPlayer = this.registry.get('player')
    this.score = this.registry.get('score')

    //currentLevel = 1
    //currentPlayer = 'galdi'

    this.lines = this.add
      .tileSprite(0, 0, 1280, 720, 'lines')
      .setScale(3)
      .setOrigin(0)
      .setScrollFactor(0)
    this.lines.tilePositionY = -20

    this.levels.forEach((level: LevelConfig, index: number) => {
      let levelBlock: Phaser.GameObjects.Image = this.add
        .image(level.block.x + this.blockOffsetX, level.block.y, level.block.key)
        .setScale(level.block.scale)
      if (index > this.currentLevel - 1) levelBlock.setTint(0x333333)
      if (index < this.currentLevel - 1) {
        this.add.image(level.block.x + this.blockOffsetX, level.block.y - 20, 'done')
      }
      if (index < this.levels.length - 1) {
        this.add.image(level.block.x + this.blockOffsetX + 60, level.block.y, 'dots')
      }
    })

    const face = this.add
      .image(
        this.levels[this.currentLevel - 1].block.x +
          this.blockOffsetX +
          this.levels[this.currentLevel - 1].block.offsetX,
        this.levels[this.currentLevel - 1].block.y + this.levels[this.currentLevel - 1].block.offsetY,
        `face-${this.currentPlayer}`
      )
      .setScale(3)
      .setOrigin(0.5)
      .setScrollFactor(0)

    this.add.tween({
      targets: face,
      y: face.y - 50,
      duration: 500,
      ease: 'Power2',
      yoyo: true,
      repeat: -1,
      delay: 0
    })

    this.textLevel = this.add
      .bitmapText(this.game.canvas.width / 2, 100 - 50, 'commodore', `LEVEL ${this.currentLevel}`, 80)
      .setOrigin(0.5)
      .setAlpha(0)

    this.add.tween({
      targets: this.textLevel,
      y: this.textLevel.y + 50,
      alpha: 1,
      duration: 500,
      ease: 'Power2',
      repeat: 0,
      delay: 200
    })

    this.textLevel2 = this.add
      .bitmapText(this.game.canvas.width / 2, 600 + 50, 'commodore', this.levels[this.currentLevel - 1].name, 80)
      .setOrigin(0.5)
      .setAlpha(0)

    this.add.tween({
      targets: this.textLevel2,
      y: this.textLevel2.y - 50,
      alpha: 1,
      duration: 500,
      ease: 'Power2',
      repeat: 0,
      delay: 300
    })

    this.time.addEvent({
      delay: 500,
      callback: () => {
        this.scene.stop('Level')
        this.scene.start('Hud')
        this.scene.start('GamePlay')
        this.scene.bringToTop('GamePlay')
        this.scene.bringToTop('Hud')
        if (this.sys.game.device.input.touch) {
          this.scene.bringToTop('Joy')
        }
      }
    })

    /*
    let sound: Phaser.Types.Sound.AudioSpriteSound = this.sound.addAudioSprite('sfx')
    //@ts-ignore
    sound.on('complete', (sound: AudioSpriteSound) => {
      this.scene.start('Hud')
      this.scene.start('GamePlay')
      this.scene.stop('Level')
      this.scene.bringToTop('GamePlay')
      this.scene.bringToTop('Hud')
      if (this.sys.game.device.input.touch) {
        this.scene.bringToTop('Joy')
      }
    })
 
    //@ts-ignore
    sound.play('smb_stage_clear')
       */
  }

  update(time: number, delta: number) {
    this.lines.tilePositionX += 30
  }
}
