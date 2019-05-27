/**
 * @author       Francesco Raimondo <francesco.raimondo@gmail.com>
 * @copyright    2019 zero89
 * @description  Run4Mayor
 * @license      zero89
 */

export default class Boot extends Phaser.Scene {
  constructor() {
    super({
      key: 'Boot'
    })
  }

  preload() {
    if (
      this.game.device.input.touch &&
      (this.game.device.os.iOS || this.game.device.os.android || this.game.device.os.windowsPhone)
    ) {
      //setDevice(true);
    } else {
      //setDevice(false);
    }

    this.load.image('thelucasart', 'assets/images/game/thelucasart.png')
    this.load.bitmapFont('commodore', 'assets/fonts/carrier_command.png', 'assets/fonts/carrier_command.xml')
  }

  create() {
    //console.log('Boot:create!')
    this.scene.start('Preloader')
  }
}
