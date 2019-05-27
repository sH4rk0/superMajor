/**
 * @author       Francesco Raimondo <francesco.raimondo@gmail.com>
 * @copyright    2019 zero89
 * @description  Run4Mayor
 * @license      zero89
 */

import { Player } from '../components/Player'
import { StartKey } from '../components/StartKey'
//import {AnimatedTiles} from '../../node_modules/phaser-animated-tiles/dist/AnimatedTiles.min.js'

export default class Menu extends Phaser.Scene {
  private players: Array<Player> = []
  private playersCollide: Array<Player> = []
  private map: Phaser.Tilemaps.Tilemap
  private tileset: Phaser.Tilemaps.Tileset
  public layer: Phaser.Tilemaps.DynamicTilemapLayer
  public currentPlayer: Player | null
  private playersCollider: Phaser.Physics.Arcade.Collider
  private keyCollider: Phaser.Physics.Arcade.Collider
  private lands: Phaser.GameObjects.TileSprite
  private cloud1: Phaser.GameObjects.TileSprite
  private cloud2: Phaser.GameObjects.TileSprite
  private light: Phaser.GameObjects.Image
  private light2: Phaser.GameObjects.Image
  private text: Phaser.GameObjects.BitmapText
  private playerName: Phaser.GameObjects.BitmapText
  private music: Phaser.Sound.BaseSound
  private startKey: StartKey
  private baronissi: Phaser.GameObjects.Text
  private electionDay: Phaser.GameObjects.Text
  private started: boolean

  constructor() {
    super({
      key: 'Menu'
    })
  }

  create() {
    this.started = false
    this.input.addPointer(2)
    this.players = []
    if (this.currentPlayer != null) {
      this.currentPlayer.destroy()
      this.currentPlayer = null
    }

    const sky: Phaser.GameObjects.TileSprite = this.add
      .tileSprite(640, 640, 1280, 720, 'sky')
      .setScale(1)
      .setScrollFactor(0)

    this.cloud1 = this.add
      .tileSprite(640, 250, 1280, 300, 'cloud1')
      .setScale(1)
      .setScrollFactor(0)

    this.cloud2 = this.add
      .tileSprite(640, 150, 1280, 300, 'cloud2')
      .setScale(1)
      .setScrollFactor(0)

    this.lands = this.add
      .tileSprite(0, 220, 1280, 316, '4lands')
      .setOrigin(0)
      .setScrollFactor(0)

    this.light = this.add
      .image(this.game.canvas.width / 2, 150, 'light')
      .setOrigin(0.5, 0.5)
      .setScale(0.8)

    this.light2 = this.add
      .image(this.game.canvas.width / 2, 150, 'light')
      .setOrigin(0.5, 0.5)
      .setScale(0.8)

    const logo: Phaser.GameObjects.Image = this.add
      .image(this.game.canvas.width / 2, 150, 'logo')
      .setOrigin(0.5, 0.5)
      .setScale(1)
      .setAlpha(1)

    this.startKey = new StartKey(this, this.game.canvas.width / 2, 250, 'key')

    //@ts-ignore

    this.cameras.main.setBackgroundColor('#69d3f9')
    this.cameras.main.fadeIn()

    this.map = this.make.tilemap({ key: 'intro' })

    this.tileset = this.map.addTilesetImage('SuperMarioBros-World1-1', 'tiles')

    this.layer = this.map.createDynamicLayer('world', this.tileset, 0, 0)
    this.layer.setScale(3)

    this.physics.world.bounds.width = this.layer.width
    this.layer.setCollisionByProperty({ collide: true })

    let loadingScreen = document.getElementById('loading-screen')
    if (loadingScreen) {
      loadingScreen.classList.add('transparent')
      this.time.addEvent({
        delay: 1000,
        callback: () => {
          // @ts-ignore
          loadingScreen.remove()
        }
      })
    }

    this.initGlobalDataManager()

    const _playerGaldi: Player = new Player({
      key: 'player-galdi',
      x: 440,
      y: 300,
      name: 'galdi',
      scene: this,
      physic: true,
      commands: false,
      inGame: false
    }).setScale(2)
    _playerGaldi.play('player-galdi-idle')
    this.players.push(_playerGaldi)

    const _playerMoscatiello: Player = new Player({
      key: 'player-moscatiello',
      x: 200,
      y: 300,
      name: 'moscatiello',
      scene: this,
      physic: true,
      commands: false,
      inGame: false
    }).setScale(2)
    _playerMoscatiello.play('player-moscatiello-idle')
    this.players.push(_playerMoscatiello)

    const _playerValiante: Player = new Player({
      key: 'player-valiante',
      x: 840,
      y: 300,
      name: 'valiante',
      scene: this,
      physic: true,
      commands: false,
      inGame: false
    }).setScale(2)
    _playerValiante.play('player-valiante-idle')
    _playerValiante.flipX = true
    this.players.push(_playerValiante)

    let _playerSiniscalco: Player = new Player({
      key: 'player-siniscalco',
      x: 1080,
      y: 300,
      name: 'siniscalco',
      scene: this,
      physic: true,
      commands: false,
      inGame: false
    }).setScale(2)
    _playerSiniscalco.play('player-siniscalco-idle')
    _playerSiniscalco.flipX = true
    this.players.push(_playerSiniscalco)

    this.players.forEach((_player: Player) => {
      this.physics.add.collider(_player, this.layer)
    })

    this.text = this.add.bitmapText(this.game.canvas.width / 2, 650, 'commodore', 'Select your player', 20)
    this.playerName = this.add
      .bitmapText(this.game.canvas.width / 2, 610, 'commodore', 'welcome', 20)
      .setAlpha(0)
      .setOrigin(0.5)
    this.text.setOrigin(0.5).setAlpha(0.5)
    this.add.tween({
      targets: this.text,
      alpha: 1,
      duration: 1000,
      ease: 'Linear',
      yoyo: true,
      repeat: -1
    })

    this.music = this.sound.add('intro')
    this.music.play(undefined, {
      loop: true
    })

    //@ts-ignore
    WebFont.load({
      google: {
        families: ['Press Start 2P']
      },
      active: () => {
        const _config = {
          font: '35px',
          fill: '#ffffff',
          stroke: '#000000',
          strokeThickness: 4,
          wordWrap: true,
          wordWrapWidth: 1000
        }

        this.baronissi = this.add
          .text(400, 250, 'Baronissi', _config)
          .setStroke('#000000', 10)
          .setAlpha(0)
          .setOrigin(0.5)
          .setFontFamily('"Press Start 2P"')

        this.electionDay = this.add
          .text(800, 250, 'ElectionDay', _config)
          .setStroke('#000000', 10)
          .setAlpha(0)
          .setOrigin(0.5)
          .setFontFamily('"Press Start 2P"')

        this.tweens.add({
          targets: this.baronissi,
          alpha: 1,
          x: 440,
          ease: 'Power1',
          delay: 500,
          duration: 500
        })

        this.tweens.add({
          targets: this.electionDay,
          alpha: 1,
          x: 880,
          ease: 'Power1',
          delay: 1000,
          duration: 500
        })
      }
    })
  }

  setPlayerName(playerName: string): string {
    let _name: string = 'Welcome '
    switch (playerName) {
      case 'galdi':
        _name += 'Luca Boldi'
        break
      case 'moscatiello':
        _name += 'Giovanni Toscaniello'
        break
      case 'valiante':
        _name += 'Gianfranco Paliante'
        break
      case 'siniscalco':
        _name += 'Tony Miniscalpo'
        break
    }

    return _name
  }

  setupPlayers(playerName: string): void {
    this.playerName.setAlpha(1)
    this.playerName.setText(this.setPlayerName(playerName))
    if (this.currentPlayer == null) {
      this.text.setText('  Use arrow keys to move\n\nClick/get the key to start!').setY(675)
      this.startKey.startTween()
    }

    this.playersCollide = []
    this.registry.set('player', playerName)
    this.players.forEach((player: Player) => {
      if (player.name == playerName) {
        player.setCommands(true)
        player.setMovable()
        player.setTint(0xffffff)
        this.currentPlayer = player
        this.registry.set('player', playerName)
        this.sound.playAudioSprite('sfx', 'smb_1-up')
      } else {
        player.setCommands(false)
        player.setImmovable()
        player.setTint(0x333333)
        player.body.setSize(20, 38)
        //@ts-ignore
        player.body.setOffset(15, 30)
        this.playersCollide.push(player)
      }
    })

    if (this.currentPlayer != null && this.playersCollide != null) {
      if (this.playersCollider != null) this.playersCollider.destroy()
      this.playersCollider = this.physics.add.collider(this.currentPlayer, this.playersCollide)
    }

    if (this.currentPlayer != null) {
      if (this.keyCollider != null) this.keyCollider.destroy()
      this.keyCollider = this.physics.add.collider(this.currentPlayer, this.startKey, () => {
        if (!this.started) this.start()
        this.started = true
      })
    }
  }

  start() {
    //console.log('start')
    if (this.currentPlayer == null) return
    this.sound.playAudioSprite('sfx', 'smb_coin')
    this.currentPlayer.setImmovable()
    this.add.tween({
      targets: [this.currentPlayer, this.startKey],
      alpha: 0,
      duration: 150,
      ease: 'Linear'
    })

    this.cameras.main.fadeOut(
      300,
      255,
      255,
      255,

      () => {
        this.time.addEvent({
          delay: 300,
          callback: () => {
            this.scene.start('Level')
            this.scene.stop('Menu')
            this.scene.bringToTop('Level')
            this.music.stop()
          }
        })
      },
      this
    )
  }

  update(time: number, delta: number) {
    this.players.forEach((_player: Player) => {
      _player.update(time, delta)
    })

    this.light.setAngle((this.light.angle += 0.5))
    this.light2.setAngle((this.light2.angle += 0.25))
    this.cloud1.tilePositionX += 0.7
    this.cloud2.tilePositionX += 0.5
  }

  private initGlobalDataManager(): void {
    this.registry.set('time', 0)
    this.registry.set('level', 8)
    this.registry.set('score', 0)
    this.registry.set('lives', 3)
    this.registry.set('player', '')
  }
}
