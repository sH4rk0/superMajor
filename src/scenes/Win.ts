import { GameData } from '../GameData'
import { leaderboard } from '../Game'

export default class Win extends Phaser.Scene {
  private map: Phaser.Tilemaps.Tilemap
  private tileset: Phaser.Tilemaps.Tileset
  private levels: Array<LevelConfig> = GameData.levels
  private layer: Phaser.Tilemaps.DynamicTilemapLayer
  private container1: Phaser.GameObjects.Container
  private btn1: Phaser.GameObjects.Image
  private text1: Phaser.GameObjects.Text

  private currentLevel: number
  private currentPlayer: string
  private score: number
  private textScore: Phaser.GameObjects.Text

  private music: Phaser.Sound.BaseSound
  constructor() {
    super({
      key: 'Win'
    })
  }

  create() {
    const sky: Phaser.GameObjects.TileSprite = this.add
      .tileSprite(640, 600, 1280, 720, 'sky')
      .setScale(1)
      .setScrollFactor(0)
    this.cameras.main.setBackgroundColor('#69d3f9')
    this.map = this.make.tilemap({ key: 'win' })

    this.tileset = this.map.addTilesetImage('SuperMarioBros-World1-1', 'tiles')
    this.layer = this.map.createDynamicLayer('world', this.tileset, 0, 0)
    this.layer.setScale(3)

    this.currentLevel = this.registry.get('level')
    this.currentPlayer = this.registry.get('player')
    this.score = parseInt(this.registry.get('score'))

    /* this.currentLevel = 8
    this.currentPlayer = 'siniscalco'
    this.score = 10000
*/
    leaderboard.insertScore({
      name: this.currentPlayer,
      score: this.score,
      level: this.currentLevel,
      levelName: this.levels[this.currentLevel - 1].name
    })

    //console.log(this.currentLevel, this.currentPlayer, this.score)

    let _score = {
      font: '50px',
      fill: '#ffffff',
      stroke: '#000000',
      strokeThickness: 10,
      wordWrap: true,
      wordWrapWidth: 1000
    }
    this.textScore = this.add
      .text(640, 100, ` CONGRATULATION!\n\nYour score: ${this.score}`, _score)
      .setFontFamily('"Press Start 2P"')
      .setAlpha(1)
      .setOrigin(0.5)

    this.music = this.sound.add('win')
    this.music.play(undefined, {
      loop: true
    })

    //@ts-ignore

    this.btn1 = this.add
      .image(0, 0, 'btn-green')
      .setInteractive()
      .setScale(2)

    let _config1 = {
      font: '25px',
      fill: '#ffffff',
      stroke: '#000000',
      strokeThickness: 0,
      wordWrap: true,
      wordWrapWidth: 1000
    }
    this.text1 = this.add
      .text(0, 0, 'MAINMENU', _config1)
      .setFontFamily('"Press Start 2P"')
      .setAlpha(1)
      .setOrigin(0.5)

    this.container1 = this.add.container(640, 650, [this.btn1, this.text1]).setAlpha(0)

    this.btn1.on('pointerover', () => {
      this.btn1.setTint(0xf0f0f0)
      this.container1.setAngle(Phaser.Math.RND.integerInRange(2, 10))
    })

    this.btn1.on('pointerout', () => {
      this.btn1.clearTint()
      this.container1.setAngle(0)
    })

    this.btn1.once(
      'pointerup',
      () => {
        let sound: Phaser.Types.Sound.AudioSpriteSound = this.sound.addAudioSprite('sfx')
        this.cameras.main.fadeOut(250, 255, 255, 255)
        //@ts-ignore
        sound.on('complete', (sound: AudioSpriteSound) => {
          this.music.stop()
          this.scene.start('Menu')
          this.scene.stop('GameOver')
          this.scene.stop('Hud')
          this.scene.bringToTop('Menu')
          if (this.sys.game.device.input.touch) {
            this.scene.bringToTop('Joy')
          }
        })
        //@ts-ignore
        sound.play('smb_coin')
      },
      this
    )

    this.add.tween({
      targets: [this.container1],
      alpha: 1,
      duration: 500,
      ease: 'Sine.easeIn'
    })

    let _config = {
      font: '80px',
      fill: '#ffffff',
      stroke: '#000000',
      strokeThickness: 15,
      wordWrap: true,
      wordWrapWidth: 1000
    }
    let _T = this.add
      .text(0, 0, 'T', _config)
      .setFontFamily('"Press Start 2P"')
      .setAlpha(0)
    let _H = this.add
      .text(0, 0, 'H', _config)
      .setFontFamily('"Press Start 2P"')
      .setAlpha(0)
    let _E = this.add
      .text(0, 0, 'E', _config)
      .setFontFamily('"Press Start 2P"')
      .setAlpha(0)
    let _space = this.add
      .text(0, 0, '', _config)
      .setFontFamily('"Press Start 2P"')
      .setAlpha(0)
    let _e = this.add
      .text(0, 0, 'E', _config)
      .setFontFamily('"Press Start 2P"')
      .setAlpha(0)
    let _N = this.add
      .text(0, 0, 'N', _config)
      .setFontFamily('"Press Start 2P"')
      .setAlpha(0)
    let _D = this.add
      .text(0, 0, 'D', _config)
      .setFontFamily('"Press Start 2P"')
      .setAlpha(0)

    Phaser.Actions.GridAlign([_T, _H, _E, _space, _e, _N, _D], {
      width: 200,
      cellWidth: 100,

      x: 350,
      y: 280
    })

    this.add.tween({
      targets: [_T, _H, _E, _space, _e, _N, _D],

      y: 455,
      alpha: {
        getEnd: (target: any, key: any, value: any) => {
          return 1
        },

        getStart: (target: any, key: any, value: any) => {
          return 0.5
        }
      },
      duration: 500,
      ease: 'Sine.easeIn',
      yoyo: true,
      repeat: -1,
      delay: (i: number, total: number, target: any) => {
        return i * 100
      }
    })
  }

  start() {
    this.cameras.main.fadeOut(
      300,
      255,
      255,
      255,

      () => {
        this.time.addEvent({
          delay: 300,
          callback: () => {
            this.registry.set('player', this.currentPlayer)
            this.registry.set('time', 0)
            this.registry.set('level', 1)
            this.registry.set('score', 0)
            this.registry.set('lives', 3)

            this.scene.start('Level')
            this.scene.stop('GameOver')
            this.scene.bringToTop('Level')
            this.music.stop()
          }
        })
      },
      this
    )
  }
}
