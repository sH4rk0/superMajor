export default class Joy extends Phaser.Scene {
  public stick: any
  public jump: any
  constructor() {
    super({
      key: 'Joy'
    })
  }

  preload() {
    this.load.atlas('arcade', 'assets/skins/arcade-joystick.png', 'assets/skins/arcade-joystick.json')
    this.load.scenePlugin(
      'VirtualJoystickPlugin',
      'assets/js/VirtualJoystickPlugin.min.js',
      'VirtualJoystickPlugin',
      'pad'
    )
  }

  create(): void {
    this.input.addPointer(2)

    //@ts-ignore
    this.stick = this.pad.addStick(150, 620, 100, 'arcade').setScale(0.75)
    //@ts-ignore
    this.stick.setMotionLock(VirtualJoystickPlugin.HORIZONTAL)
    //this.stick.alignBottomLeft()
    //@ts-ignore
    this.jump = this.pad.addButton(1160, 630, 'arcade', 'button1-up', 'button1-down')
    //this.jump.alignBottomRight()
  }

  show(): void {}
  hide(): void {}
}
