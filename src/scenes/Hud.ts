export default class HUD extends Phaser.Scene {
  //@ts-ignore
  private textElements: Map<string, Phaser.GameObjects.BitmapText>
  private timer: Phaser.Time.TimerEvent
  private livesGroup: Phaser.GameObjects.Group
  private hurryupText: Phaser.GameObjects.BitmapText
  private pauseTimer: boolean = false
  private _scoreChanged: Phaser.Events.EventEmitter
  private _livesChanged: Phaser.Events.EventEmitter
  private _restartTimer: Phaser.Events.EventEmitter
  private _startTimer: Phaser.Events.EventEmitter

  constructor() {
    super({
      key: 'Hud'
    })
  }

  create(): void {
    // console.log('create hud')
    // @ts-ignore
    this.textElements = new Map([
      ['SCORE', this.addText(800, 45, `${this.registry.get('score')}`)],
      ['TIME', this.addText(1100, 45, `${this.registry.get('time')}`)]
    ])

    this.hurryupText = this.add
      .bitmapText(0, 360, 'commodore', 'HURRY UP!!!!', 60)
      .setAlpha(0)
      .setOrigin(0.5)

    this.livesGroup = this.add.group()
    this.updateLives()
    this.pauseTimer = false
    this.add.image(750, 60, 'coin').setScale(2)
    this.add.image(1050, 60, 'time').setScale(2)

    // create events

    const level = this.scene.get('GamePlay')

    level.events.off('scoreChanged', this.updateScore, this)
    level.events.off('livesChanged', this.updateLives, this)
    level.events.off('restartTimer', this.restartTimer, this)
    level.events.off('startTimer', this.startTimer, this)

    this._scoreChanged = level.events.on('scoreChanged', this.updateScore, this)
    this._livesChanged = level.events.on('livesChanged', this.updateLives, this)
    this._restartTimer = level.events.on('restartTimer', this.restartTimer, this)
    this._startTimer = level.events.on('startTimer', this.startTimer, this)
  }

  startTimer(): void {
    //console.log('start timer')
    this.timer = this.time.addEvent({
      delay: 1000,
      callback: this.updateTime,
      callbackScope: this,
      loop: true
    })
  }

  private addText(x: number, y: number, value: string): Phaser.GameObjects.BitmapText {
    return this.add.bitmapText(x, y, 'commodore', value, 30)
  }

  private updateTime(): void {
    if (!this.pauseTimer) {
      //console.log('updateTime')
      this.registry.values.time -= 1
      if (this.registry.values.time == 10) {
        this.hurryup()
      }

      if (this.registry.values.time == 0) {
        this.pauseTimer = true
        this.events.emit('timeEnded')
        this.timer.destroy()
      }
      //@ts-ignore
      this.textElements.get('TIME').setText(`${this.registry.get('time')}`)
    }
  }

  private hurryup() {
    this.events.emit('hurryUp')

    this.tweens.add({
      targets: this.hurryupText,
      alpha: 1,
      x: 640,
      ease: 'Power1',
      duration: 1000,
      completeDelay: 1000,
      onComplete: () => {
        this.tweens.add({
          targets: this.hurryupText,
          alpha: 0,
          x: 1280,
          ease: 'Power1',
          duration: 1000,

          onComplete: () => {
            this.hurryupText.setX(0)
          }
        })
      }
    })
  }

  private restartTimer(): void {
    //console.log('restartTimer')
    this.timer.destroy()
    this.pauseTimer = false
    //@ts-ignore
    this.textElements.get('TIME').setText(`${this.registry.get('time')}`)
    this.startTimer()
  }

  private updateScore(): void {
    //@ts-ignore
    this.textElements.get('SCORE').setText(`${this.registry.get('score')}`)
  }

  private updateLives(): void {
    this.pauseTimer = true
    this.livesGroup.clear(true, true)
    for (let lives = 0; lives < this.registry.get('lives'); lives++) {
      this.livesGroup.add(this.add.image(70 + 80 * lives, 60, 'heart').setScale(2))
    }
  }
}
