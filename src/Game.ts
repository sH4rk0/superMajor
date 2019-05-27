/**
 * @author       Francesco Raimondo <francesco.raimondo@gmail.com>
 * @copyright    2019 zero89
 * @description  Run4Mayor
 * @license      zero89
 */

import 'phaser'
import Boot from './scenes/Boot'
import Preloader from './scenes/Preloader'
import Menu from './scenes/Menu'
import Level from './scenes/Level'
import GamePlay from './scenes/GamePlay'
import Hud from './scenes/Hud'
import Joy from './scenes/Joy'
import GameOver from './scenes/GameOver'
import Win from './scenes/Win'
import Leaderboard from './Leaderboard'

export let leaderboard: Leaderboard

const WebFontConfig = {
  active: () => {},
  google: {
    families: ['Press Start 2P']
  }
}
const DEFAULT_WIDTH: number = 1280
const DEFAULT_HEIGHT: number = 720

window.addEventListener('load', () => {
  leaderboard = new Leaderboard()
  const config: any = {
    type: Phaser.WEBGL,
    backgroundColor: '#50459b',
    parent: 'my-game',
    input: {
      activePointers: 2,
      keyboard: true
    },
    scale: {
      mode: Phaser.Scale.FIT,
      width: DEFAULT_WIDTH,
      height: DEFAULT_HEIGHT
    },
    scene: [Boot, Preloader, Menu, Level, GamePlay, Hud, Joy, GameOver, Win],
    physics: {
      default: 'arcade',
      arcade: {
        debug: false,
        gravity: { y: 1600 }
      }
    },

    render: { pixelArt: true, antialias: false }
  }

  const game = new Phaser.Game(config)
})
