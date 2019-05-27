/**
 * @author       Francesco Raimondo <francesco.raimondo@gmail.com>
 * @copyright    2019 zero89
 * @description  Run4Mayor
 * @license      zero89
 */

import { Scene } from 'phaser'

import Menu from '../scenes/Menu'

export class StartKey extends Phaser.GameObjects.Sprite {
  private currentScene: Phaser.Scene
  constructor(scene: Scene, x: number, y: number, key: string) {
    super(scene, x, y + 50, key)

    this.currentScene = scene
    this.setOrigin(0.5, 0.5)
      .setScale(4)
      .setInteractive()

    scene.physics.world.enable(this)
    //@ts-ignore
    this.body.setImmovable(true)
    //@ts-ignore
    this.body.setAllowGravity(false)
    scene.add.existing(this)
    this.setAlpha(0).setTint(0x909090)

    this.currentScene.add.tween({
      targets: this,
      alpha: 1,
      y: this.y - 50,
      duration: 500,
      delay: 750,
      ease: 'Power2',
      yoyo: false,
      repeat: 0
    })

    this.on(
      'pointerdown',
      () => {
        let _Menu: Menu = <Menu>this.currentScene
        _Menu.sound.playAudioSprite('sfx', 'smb_coin')
        if (_Menu.currentPlayer != null) _Menu.start()

        /*let sound: Phaser.Types.Sound.AudioSpriteSound = _Menu.sound.addAudioSprite('sfx')
        //@ts-ignore
        sound.on('complete', (sound: AudioSpriteSound) => {
         
        })
        //@ts-ignore
        sound.play('smb_coin')*/
      },
      this
    )
  }

  startTween() {
    this.setAlpha(1).setTint(0xffffff)
    this.currentScene.add.tween({
      targets: this,

      scaleX: 5,
      scaleY: 5,
      duration: 500,
      ease: 'Power2',
      yoyo: true,
      repeat: -1
    })
  }
}
