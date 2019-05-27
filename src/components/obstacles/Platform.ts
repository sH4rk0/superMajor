export class Platform extends Phaser.GameObjects.Sprite {
  // variables
  protected currentScene: Phaser.Scene

  private startPosition: number
  private endPosition: number
  private velocity: number
  private direction: number

  constructor(params: PlatformConfig) {
    super(params.scene, params.x, params.y, params.key)

    // variables
    this.currentScene = params.scene

    this.velocity = params.velocity
    this.direction = params.direction

    //console.log(this.direction)

    this.currentScene.physics.world.enable(this)
    //@ts-ignore
    this.body.setImmovable(true)
    //@ts-ignore
    this.body.setAllowGravity(false)

    if (this.direction == 0) {
      this.startPosition = params.y
      this.endPosition = params.y - params.range
      //@ts-ignore
      this.body.setVelocityY(this.velocity * -1)
    } else if (this.direction == 1) {
      this.startPosition = params.y
      this.endPosition = params.y + params.range
      //@ts-ignore
      this.body.setVelocityY(this.velocity)
    } else if (this.direction == 2) {
      this.startPosition = params.x
      this.endPosition = params.x + params.range
      //@ts-ignore
      this.body.setVelocityX(this.velocity)
    } else if (this.direction == 3) {
      this.startPosition = params.x
      this.endPosition = params.x - params.range
      //@ts-ignore
      this.body.setVelocityX(this.velocity * -1)
    }

    this.setOrigin(0.5)
    // variables
    this.currentScene.add.existing(this)

    //console.log(this.direction, this.startPosition, this.endPosition)
  }

  update() {
    //updown
    if (this.direction == 0) {
      if (this.y >= this.startPosition) {
        //@ts-ignore
        this.body.setVelocityY(this.velocity * -1)
      } else if (this.y <= this.endPosition) {
        //@ts-ignore
        this.body.setVelocityY(this.velocity)
      }
    }
    //downup
    else if (this.direction == 1) {
      if (this.y >= this.endPosition) {
        //@ts-ignore
        this.body.setVelocityY(this.velocity * -1)
      } else if (this.y <= this.startPosition) {
        //@ts-ignore
        this.body.setVelocityY(this.velocity)
      }
    }

    //leftright
    else if (this.direction == 2) {
      if (this.x >= this.endPosition) {
        //@ts-ignore
        this.body.setVelocityX(this.velocity * -1)
      } else if (this.x <= this.startPosition) {
        //@ts-ignore
        this.body.setVelocityX(this.velocity)
      }
    }

    //rightleft
    else if (this.direction == 3) {
      if (this.x >= this.startPosition) {
        //@ts-ignore
        this.body.setVelocityX(this.velocity * -1)
      } else if (this.x <= this.endPosition) {
        //@ts-ignore
        this.body.setVelocityX(this.velocity)
      }
    }
  }
}
