export class Boss extends Phaser.GameObjects.Container {
  // variables
  protected currentScene: Phaser.Scene
  protected isActivated: boolean
  protected isDying: boolean
  protected speed: number
  protected dyingScoreValue: number
  protected step: number
  protected startX: number
  protected startY: number
  protected bossTween: Phaser.Tweens.Tween
  protected positionIndex: number
  protected positions: Array<{ x: number; y: number }>
  protected cycle: Array<number> = [1, 2, 1, 0]
  protected deluca: Phaser.GameObjects.Sprite

  constructor(params: EnemyConfig) {
    super(params.scene, params.x, params.y)

    this.startX = params.x
    this.startY = params.y
    // variables
    this.step = 0
    this.positionIndex = 0
    this.positions = [
      { x: 700, y: 100 },
      { x: 800, y: 100 },
      { x: 900, y: 100 },
      { x: 1000, y: 100 },
      { x: 700, y: 200 },
      { x: 800, y: 200 },
      { x: 900, y: 200 },
      { x: 1000, y: 200 },
      { x: 700, y: 300 },
      { x: 800, y: 300 },
      { x: 900, y: 300 },
      { x: 1000, y: 300 },
      { x: 700, y: 400 },
      { x: 800, y: 400 },
      { x: 900, y: 400 },
      { x: 1000, y: 400 }
    ]
    this.currentScene = params.scene
    this.width = 180
    this.height = 200
    this.initSprite()
    this.currentScene.add.existing(this)
  }

  protected initSprite() {
    // variables
    this.setDepth(2000)
    this.deluca = this.currentScene.add
      .sprite(0, 0, 'boss')
      .setOrigin(0.5)
      .setTint(0x00ff00)
    this.add(this.deluca)

    let _holo: Phaser.Types.Animations.Animation = {
      key: 'holo',
      frames: this.currentScene.anims.generateFrameNumbers('boss', {
        frames: [0, 1]
      }),
      frameRate: 10,
      yoyo: false,
      repeat: -1
    }
    this.currentScene.anims.create(_holo)
    this.deluca.play('holo')

    this.currentScene.physics.world.enable(this)
    //@ts-ignore
    this.body.setAllowGravity(false)
    //@ts-ignore
    this.body.setImmovable(true)

    this.setAlpha(0.75)

    this.currentScene.tweens.add({
      targets: this,
      duration: 100,
      alpha: 0.9,
      yoyo: true,
      repeat: -1
    })

    this.currentScene.time.addEvent({
      delay: 2000,
      callback: () => {
        this.nextMove()
      }
    })
  }

  moveRandom(): void {
    // console.log('moveRandom')
    this.bossTween = this.currentScene.tweens.add({
      targets: this,
      props: {
        y: {
          value: () => {
            return this.positions[this.positionIndex].y
          },
          ease: 'Power1'
        },
        x: {
          value: () => {
            return this.positions[this.positionIndex].x
          },
          ease: 'Power1'
        }
      },
      duration: () => {
        return Phaser.Math.RND.integerInRange(1000, 2000)
      },
      yoyo: false,
      repeat: 0,
      delay: 1000,
      onComplete: () => {
        //console.log('completed to random')
        this.nextMove()
      }
    })
  }

  moveHome(): void {
    //  console.log('moveHome')
    this.bossTween = this.currentScene.tweens.add({
      targets: this,
      x: this.startX,
      y: this.startY,
      yoyo: false,
      repeat: 0,
      delay: 1000,
      onComplete: () => {
        // console.log('completed to home')
        this.nextMove()
      }
    })
  }

  move2Player(): void {
    //   console.log('move2Player')

    this.deluca.setTint(0xff0000)
    this.bossTween = this.currentScene.tweens.add({
      targets: this,
      props: {
        y: {
          value: () => {
            //@ts-ignore
            return this.currentScene.getPlayerY()
          },
          ease: 'Power1'
        },
        x: {
          value: () => {
            //@ts-ignore
            return this.currentScene.getPlayerX()
          },
          ease: 'Power1'
        }
      },
      duration: () => {
        return Phaser.Math.RND.integerInRange(700, 1200)
      },
      yoyo: false,
      delay: 1000,
      repeat: 0,
      onStart: () => {
        this.currentScene.time.addEvent({
          delay: 50,
          callback: () => {
            this.deluca.setTint(0xfffff)
          }
        })
      },
      onComplete: () => {
        // console.log('completed to player')

        this.nextMove()
      }
    })
  }

  nextMove(): void {
    this.positionIndex = Phaser.Math.RND.integerInRange(0, this.positions.length - 1)
    this.step++

    if (this.step >= this.cycle.length) this.step = 0

    switch (this.cycle[this.step]) {
      case 0:
        this.moveHome()
        break
      case 1:
        this.moveRandom()
        break
      case 2:
        this.move2Player()
        break
      case 3:
        break
    }
  }
}
