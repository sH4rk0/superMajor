/**
 * @author       Francesco Raimondo <francesco.raimondo@gmail.com>
 * @copyright    2019 zero89
 * @description  Run4Mayor
 * @license      zero89
 */

import { GameData } from '../GameData'

export default class Preloader extends Phaser.Scene {
  body: HTMLElement
  loading: Phaser.GameObjects.BitmapText
  progress: Phaser.GameObjects.Graphics
  logo: Phaser.GameObjects.Image
  constructor() {
    super({
      key: 'Preloader'
    })
  }

  preload() {
    //console.log('Preloader:preload')
    this.progress = this.add.graphics()
    this.loadAssets()
  }

  init() {
    this.body = document.getElementsByTagName('body')[0]
    this.logo = this.add.image(this.game.canvas.width / 2, this.game.canvas.height / 2 - 50, 'thelucasart').setAlpha(0)
    this.loading = this.add.bitmapText(this.game.canvas.width / 2, 620, 'commodore', 'Loading...').setOrigin(0.5)
  }

  create() {
    //this.scene.start('Menu')
  }

  loadAssets(): void {
    this.body.className = 'loading'

    this.load.on('start', () => {
      //progress.destroy();
      //console.log('load start')
    })

    this.load.on('fileprogress', (file: any, value: any) => {
      //console.log(file, value)
    })

    this.load.on('progress', (value: any) => {
      this.progress.clear()
      this.progress.fillStyle(0xffffff, 1)
      this.progress.fillRect(0, 680, 1280 * value, 40)

      this.logo.setAlpha(value)

      this.loading.setText('Loading...' + Math.round(value * 100) + '%')
    })

    this.load.on('complete', () => {
      this.loading.setText('Tap/click to start')
      this.body.className = ''
      this.progress.clear()
      this.input.once('pointerdown', () => {
        this.scene.stop('Preloader')
        this.scene.start('Menu')
        //
        /*this.registry.set('time', 0)
        this.registry.set('level', 8)
        this.registry.set('score', 0)
        this.registry.set('lives', 3)
        this.registry.set('player', '')
        this.scene.start('GamePlay')
        this.scene.start('Hud')
        this.scene.bringToTop('GamePlay')
        this.scene.bringToTop('Hud')
        */
        //
        if (this.sys.game.device.input.touch) {
          this.scene.start('Joy')
          this.scene.bringToTop('Joy')

          //@ts-ignore
          if (swEnabled) modal.classList.add('show')
        }
      })

      //console.log('load assetts complete')
    })

    //Assets Load
    //--------------------------

    //SCRIPT
    GameData.script.forEach((element: ScriptAsset) => {
      this.load.script(element.key, element.path)
      //@ts-ignore
    })

    // IMAGES
    GameData.images.forEach((element: ImageAsset) => {
      this.load.image(element.name, element.path)
    })

    // TILEMAPS
    GameData.tilemaps.forEach((element: TileMapsAsset) => {
      this.load.tilemapTiledJSON(element.key, element.path)
    })

    // SPRITESHEETS
    GameData.spritesheets.forEach((element: SpritesheetsAsset) => {
      this.load.spritesheet(element.name, element.path, {
        frameWidth: element.width,
        frameHeight: element.height,
        endFrame: element.frames
      })
    })

    //bitmap fonts
    GameData.bitmapfont.forEach((element: BitmapfontAsset) => {
      this.load.bitmapFont(element.name, element.imgpath, element.xmlpath)
    })

    // SOUNDS
    GameData.sounds.forEach((element: SoundAsset) => {
      this.load.audio(element.name, element.paths)
    })

    // Audio
    GameData.audio.forEach((element: AudioSpriteAsset) => {
      this.load.audioSprite(element.name, element.jsonpath, element.paths, element.instance)
    })
  }
}
