/**
 * @author       Francesco Raimondo <francesco.raimondo@gmail.com>
 * @copyright    2019 zero89
 * @description  Run4Mayor
 * @license      zero89
 */

import { Player } from '../components/Player'
import { BrickTile } from '../components/BrickTile'
import { Enemy } from '../components/enemies/Enemy'
import { Major } from '../components/enemies/Enemy.Mayor'
import { Boss } from '../components/enemies/Boss'
import { Deluca } from '../components/Deluca'
import { Bomb } from '../components/Bomb'
import { Bonus } from '../components/bonus/Bonus'
import { Bonus1Up } from '../components/bonus/Bonus1Up'
import { Platform } from '../components/obstacles/Platform'
import { GameData } from '../GameData'
import { Explosion } from '../components/Explosion'

export default class GamePlay extends Phaser.Scene {
  private player: Player
  private map: Phaser.Tilemaps.Tilemap
  private tileset: Phaser.Tilemaps.Tileset
  public layer: Phaser.Tilemaps.DynamicTilemapLayer
  public currentPlayer: Player
  private bg: Phaser.GameObjects.TileSprite
  private delucaHolo: Boss
  private deluca: Deluca

  private clouds: Array<Phaser.GameObjects.TileSprite> = []
  private mapScaleFactor: number = 3
  private groupEnemy: Phaser.GameObjects.Group
  private groupBonus: Phaser.GameObjects.Group
  private groupPlatform: Phaser.GameObjects.Group

  private isGameOver: boolean = false
  private level: LevelConfig
  private brickTile: BrickTile
  private music: Phaser.Sound.BaseSound
  private blockEmitter: Phaser.GameObjects.Particles.ParticleEmitter
  private questionTileBonus: number
  private delucaHits: number = 0
  public delucaMaxHits: number = 10

  constructor() {
    super({
      key: 'GamePlay'
    })
  }

  preload() {
    // this.load.scenePlugin('animatedTiles', 'assets/js/AnimatedTiles.min.js', 'animatedTiles', 'animatedTiles')
  }

  create() {
    this.clouds = []

    this.level = GameData.levels[this.registry.get('level') - 1]

    this.delucaHits = 0
    //this.registry.set('player', 'galdi')
    //this.level = GameData.levels[7]

    //console.log(this.level)

    this.questionTileBonus = Phaser.Math.RND.integerInRange(0, 2)

    const hud = this.scene.get('Hud')
    hud.events.off('timeEnded', this.playerTimeDie, this)
    hud.events.off('hurryUp', this.hurryUp, this)

    hud.events.on('timeEnded', this.playerTimeDie, this)
    hud.events.on('hurryUp', this.hurryUp, this)

    this.isGameOver = false
    this.cameras.main.setBackgroundColor('#69d3f9')

    const sky: Phaser.GameObjects.TileSprite = this.add
      .tileSprite(640, 600, 1280, 720, 'sky')
      .setScale(1)
      .setScrollFactor(0)

    if (this.level.clouds != null) {
      this.level.clouds.forEach(cloud => {
        this.clouds.push(
          this.add
            .tileSprite(cloud.x, cloud.y, cloud.w, cloud.h, cloud.key)
            .setScale(1)
            .setScrollFactor(0)
        )
      })
    }

    if (this.level.bg != null) {
      this.bg = this.add
        .tileSprite(this.level.bg.x, this.level.bg.y, 1280, 1000, 'level-1-bg')
        .setScale(1)
        .setOrigin(0)
        .setScrollFactor(0)
    }

    this.registry.values.time = this.level.time
    this.setUpLevel()

    this.events.emit('startTimer')

    this.cameras.main.fadeIn()

    this.music = this.sound.add('game')
    this.music.play(undefined, {
      loop: true
    })
  }

  update(time: number, delta: number): void {
    if (!this.isGameOver) {
      this.player.update(time, delta)

      //@ts-ignore
      if (this.player.body != null)
        if (this.level.bg != null) {
          //@ts-ignore

          this.bg.tilePositionX += this.player.body.velocity.x / 600
        }

      if (this.level.clouds != null && this.clouds.length > 0) {
        this.clouds.forEach((cloud: Phaser.GameObjects.TileSprite, index: number) => {
          cloud.tilePositionX += this.level.clouds[index].speed
        })
      }
    }
  }

  setUpLevel(): void {
    this.map = this.make.tilemap({ key: this.level.map })
    this.tileset = this.map.addTilesetImage('SuperMarioBros-World1-1', 'tiles')
    this.layer = this.map.createDynamicLayer('world', this.tileset, 0, 0)
    this.layer.setScale(this.mapScaleFactor)
    this.layer.setCollisionByProperty({ collide: true })

    this.cameras.main.setBounds(
      0,
      0,
      this.map.widthInPixels * this.mapScaleFactor,
      this.map.heightInPixels * this.mapScaleFactor
    )
    this.physics.world.setBounds(
      0,
      0,
      this.map.widthInPixels * this.mapScaleFactor,
      this.map.heightInPixels * this.mapScaleFactor
    )

    //@ts-ignore
    this.blockEmitter = this.add.particles('brick')

    //@ts-ignore
    this.blockEmitter.createEmitter({
      gravityY: 1600,
      lifespan: 2000,
      speed: 400,
      scale: 3,
      angle: {
        min: -90 - 25,
        max: -45 - 25
      },
      frequency: -1
    })

    this.registry.values.time = this.level.time

    this.brickTile = new BrickTile({
      scene: this
    })

    //setup player

    const playerObject = this.map.getObjectLayer('player').objects as any[]
    const playerName = this.registry.get('player')

    playerObject.forEach((player: playerMap) => {
      switch (player.name) {
        case 'player':
          this.player = new Player({
            key: `player-${playerName}`,
            x: player.x * this.mapScaleFactor,
            y: player.y * this.mapScaleFactor,
            name: playerName,
            scene: this,
            physic: true,
            commands: true,
            inGame: true
          }).setScale(2)

          this.cameras.main.startFollow(this.player)
          this.physics.add.collider(this.player, this.layer, this.playerTilesCollide, undefined, this)

          break
      }
    })
    //setup platforms
    //---------------------------------------------------------------------
    this.groupPlatform = this.add.group({ runChildUpdate: true })

    const platformsObject = this.map.getObjectLayer('platforms').objects as any[]

    platformsObject.forEach((platform: platformMap) => {
      let _values: Array<string> = platform.type.split(',')
      let _direction: number = 0

      switch (platform.name) {
        case 'platform-lr':
          _direction = 2
          break

        case 'platform-rl':
          _direction = 3
          break

        case 'platform-ud':
          _direction = 0
          break

        case 'platform-du':
          _direction = 1
          break
      }

      this.groupPlatform.add(
        new Platform({
          scene: this,
          x: platform.x * this.mapScaleFactor,
          y: platform.y * this.mapScaleFactor,
          key: `platform`,
          range: parseInt(_values[0]),
          velocity: parseInt(_values[1]),
          direction: _direction
        })
      )
    })

    this.physics.add.collider(this.player, this.groupPlatform, undefined, undefined, this)

    //setup bonuses
    //---------------------------------------------------------------------
    this.groupBonus = this.add.group()
    const bonusesObject = this.map.getObjectLayer('bonus').objects as any[]
    bonusesObject.forEach((bonus: bonusMap) => {
      let _bonus: Bonus
      switch (bonus.name) {
        case '100':
        case '200':
        case '300':
        case '400':
        case '500':
          _bonus = new Bonus({
            scene: this,
            x: bonus.x * this.mapScaleFactor,
            y: bonus.y * this.mapScaleFactor,
            key: `bonus-coin`,
            frame: null,
            score: parseInt(bonus.name)
          })

          this.groupBonus.add(_bonus)
          break

        case '1000':
          break
      }
    })
    this.physics.add.collider(this.groupBonus, this.layer)
    this.physics.add.overlap(this.player, this.groupBonus, this.bonusCollide, undefined, this)

    //setup enemies
    //---------------------------------------------------------------------
    this.groupEnemy = this.add.group({ runChildUpdate: true })
    const enemiesObject = this.map.getObjectLayer('enemies').objects as any[]

    let _arrEnemy: Array<string> = []
    let _majors: Array<string> = ['galdi', 'moscatiello', 'valiante', 'siniscalco']

    _majors.forEach((element: string) => {
      if (element != playerName) _arrEnemy.push(element)
    })

    enemiesObject.forEach((enemy: enemyMap) => {
      switch (enemy.name) {
        case 'major':
          this.groupEnemy.add(
            new Major({
              scene: this,
              x: enemy.x * this.mapScaleFactor,
              y: enemy.y * this.mapScaleFactor,
              key: `player-${_arrEnemy[Phaser.Math.RND.integerInRange(0, _arrEnemy.length - 1)]}`,
              frame: null
            })
          )
          break

        case 'deluca':
          this.delucaHolo = new Boss({
            scene: this,
            x: enemy.x * this.mapScaleFactor,
            y: enemy.y * this.mapScaleFactor,
            key: `boss`,
            frame: null
          })
          this.groupEnemy.add(this.delucaHolo)

          this.deluca = new Deluca({
            scene: this,
            x: 1250,
            y: 680,
            key: `player-galdi`
          })

          break
      }
    })

    if (this.level.name == 'City Hall') {
      this.physics.add.overlap(this.player, this.groupEnemy, this.bossCollide, undefined, this)
      this.physics.add.overlap(this.player, this.deluca, this.bossCollide, undefined, this)
    } else {
      this.physics.add.collider(this.groupEnemy, this.layer)
      this.physics.add.collider(this.player, this.groupEnemy, this.enemyCollide, undefined, this)
    }
  }

  restartLevel() {
    //console.log('restart level')
    this.registry.set('time', this.level.time)
    this.layer.destroy()
    this.map.destroy()
    this.groupEnemy.clear(true, true)
    this.groupBonus.clear(true, true)
    this.groupPlatform.clear(true, true)
    if (this.delucaHolo != null) this.delucaHolo.destroy()
    if (this.delucaHolo != null) this.deluca.destroy()
    this.setUpLevel()
    this.delucaHits = 0
    this.events.emit('restartTimer')
  }

  gameOver() {
    this.music.stop()
    this.player.die()
    let sound: Phaser.Types.Sound.AudioSpriteSound = this.sound.addAudioSprite('sfx')
    //@ts-ignore
    sound.on('complete', (sound: AudioSpriteSound) => {
      //@ts-ignore
      this.music.seek = 0
      this.music.resume()
      //@ts-ignore
      sound.destroy()
      this.isGameOver = true
      this.player.gameOver()
      this.groupEnemy.clear(true, true)

      this.scene.stop('GamePlay')
      this.scene.stop('Hud')

      this.scene.start('GameOver')
      this.scene.bringToTop('GameOver')
    })
    //@ts-ignore
    sound.play('smb_mariodie')
  }

  playerTilesCollide(_obj1: any, _obj2: any): void {
    const _player: Player = <Player>_obj1
    const _tile: Phaser.Tilemaps.Tile = <Phaser.Tilemaps.Tile>_obj2

    //@ts-ignore
    if (_tile.properties.callback) {
      //@ts-ignore
      switch (_tile.properties.callback) {
        case 'breakable':
          //@ts-ignore
          if (_player.body.blocked.up) {
            if (_tile.properties.bonus == 0) {
              //console.log('crash')
              this.map.removeTileAt(_tile.x, _tile.y, true, true, this.layer)
              this.sound.playAudioSprite('sfx', 'smb_breakblock')
              this.blockEmitter.emitParticle(
                6,
                _tile.x * 16 * this.mapScaleFactor + 35,
                _tile.y * 16 * this.mapScaleFactor + 35
              )
            } else {
              _tile.properties.bonus -= 1
              //@ts-ignore

              this.brickTile.restart(_tile, 'BrickTile')
              this.sound.playAudioSprite('sfx', 'smb_bump')
            }
          }

          break

        case 'questionMark':
          if (_player.body.blocked.up) {
            if (_tile.properties.value == this.questionTileBonus && this.delucaHits < this.delucaMaxHits) {
              this.questionTileBonus = Phaser.Math.RND.integerInRange(0, 2)

              this.delucaHits++
              this.groupEnemy.add(new Bomb({ scene: this, x: 1200, y: 0, key: '', hit: this.delucaHits }))
            } else {
              this.groupBonus.add(
                new Bonus({
                  scene: this,
                  x: _tile.x * 16 * this.mapScaleFactor + 16,
                  y: _tile.y * 16 * this.mapScaleFactor - 48,
                  key: `1up`,
                  frame: null,
                  score: 10,
                  allowGravity: true
                })
              )
            }
            this.brickTile.restart(_tile, 'QuestionTile')
            this.sound.playAudioSprite('sfx', 'smb_bump')
          }

          break

        case 'bonusable':
          //@ts-ignore
          if (_player.body.blocked.up) {
            if (_tile.properties.bonus == 0) {
              this.groupBonus.add(
                new Bonus1Up({
                  scene: this,
                  x: _tile.x * 16 * this.mapScaleFactor + 16,
                  y: _tile.y * 16 * this.mapScaleFactor - 48,
                  key: `1up`,
                  frame: null,
                  score: 0
                })
              )

              this.map.removeTileAt(_tile.x, _tile.y, true, true, this.layer)
              this.sound.playAudioSprite('sfx', 'smb_breakblock')
              this.blockEmitter.emitParticle(
                6,
                _tile.x * 16 * this.mapScaleFactor + 35,
                _tile.y * 16 * this.mapScaleFactor + 35
              )
            } else {
              _tile.properties.bonus -= 1
              //@ts-ignore

              this.brickTile.restart(_tile, 'BrickTile')
              this.sound.playAudioSprite('sfx', 'smb_bump')
            }
          }
          break

        case 'killPlayer':
          //@ts-ignore

          this.decLives()

          break

        case 'exit':
          this.sound.stopAll()
          this.registry.values.level++
          this.scene.pause('GamePlay')
          this.scene.pause('Hud')
          this.scene.start('Level')
          this.scene.bringToTop('Level')

          break

        case 'win':
          this.sound.stopAll()
          this.scene.stop('GamePlay')
          this.scene.stop('Hud')
          this.scene.start('Win')
          this.scene.bringToTop('Win')

          break
      }
    }
  }

  bonusCollide(_obj1: any, _obj2: any): void {
    const _player: Player = <Player>_obj1
    const _bonus: Bonus = <Bonus>_obj2

    _bonus.getBonus()
  }

  bossCollide(_obj1: any, _obj2: any): void {
    const _player: Player = <Player>_obj1
    const _enemy: Boss = <Boss>_obj2

    this.decLives()
    //console.log('boss collide')
  }

  win(): void {
    new Explosion({ scene: this, x: this.delucaHolo.x, y: this.delucaHolo.y, key: '' })

    this.groupBonus.addMultiple([
      new Bonus({
        scene: this,
        x: this.delucaHolo.x,
        y: this.delucaHolo.y,
        key: `bonus-coin`,
        frame: null,
        score: 1000,
        allowGravity: true
      }),
      new Bonus({
        scene: this,
        x: this.deluca.x,
        y: this.deluca.y,
        key: `bonus-coin`,
        frame: null,
        score: 10000,
        allowGravity: true
      })
    ])

    this.delucaHolo.destroy()
    this.deluca.destroy()
  }

  enemyCollide(_obj1: any, _obj2: any): void {
    const _player: Player = <Player>_obj1
    const _enemy: Major = <Major>_obj2

    if (
      !_player.isDied() &&
      //@ts-ignore
      (_player.body.touching.left || _player.body.touching.right || _player.body.touching.up) &&
      //@ts-ignore
      (_enemy.body.touching.left || _enemy.body.touching.right || _enemy.body.touching.down)
    ) {
      this.decLives()
      // console.log('dead')
    }

    if (
      !_player.isDied() &&
      _player.body != undefined &&
      //@ts-ignore
      _player.body.touching.down &&
      //@ts-ignore
      _enemy != null &&
      //@ts-ignore
      _enemy.body.touching.up
    ) {
      _player.jumpOverEnemy()
      this.sound.playAudioSprite('sfx', 'smb_stomp')
      _enemy.gotHitOnHead()
    }
  }

  playerTimeDie(): void {
    this.decLives()
  }

  decLives() {
    this.registry.values.lives -= 1
    this.events.emit('livesChanged')
    if (this.registry.get('lives') > 0) {
      this.playerDie()
    } else {
      this.gameOver()
    }
  }

  hurryUp(): void {
    this.music.pause()
    let sound: Phaser.Types.Sound.AudioSpriteSound = this.sound.addAudioSprite('sfx')
    //@ts-ignore
    sound.on('complete', (sound: Phaser.Types.Sound.AudioSpriteSound) => {
      this.music.resume()
      //@ts-ignore
      sound.destroy()
    })
    //@ts-ignore
    sound.play('smb_warning')
  }

  getPlayerX(): number {
    return this.player.x
  }
  getPlayerY(): number {
    return this.player.y
  }

  playerDie(): void {
    this.player.die()
    this.music.pause()

    let sound: Phaser.Types.Sound.AudioSpriteSound = this.sound.addAudioSprite('sfx')
    //@ts-ignore
    sound.on('complete', (sound: Phaser.Types.Sound.AudioSpriteSound) => {
      //@ts-ignore
      this.music.seek = 0
      this.music.resume()
      //@ts-ignore
      sound.destroy()

      this.restartLevel()
    })
    //@ts-ignore
    sound.play('smb_mariodie')
  }
}
