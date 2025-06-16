export default class ThrowingBarrel extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, texture = 'barril', directionRadians) {
    super(scene, x, y, texture, 0);

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.direction = directionRadians;
    this.speed = 200;
    this.puedecambiar = true;
    this.setBounce(0);
    this.setGravityY(0);
    this.setScale(2);
    this.refreshBody();
    this.scene = scene;
    this.isDestroyed = false;

    const vx = Math.cos(this.direction) * this.speed;
    const vy = Math.sin(this.direction) * this.speed;
    this.body.setVelocity(vx, vy);
  }

  update() {
    if (this.isDestroyed) return;

    const vx = Math.cos(this.direction) * this.speed;
    const vy = Math.sin(this.direction) * this.speed;
    this.body.setVelocity(vx, vy);

    const bounds = this.scene.physics.world.bounds;

  }

  cambiarDirection(offset) {
    if (this.puedecambiar) {
      this.puedecambiar = false;
      this.direction += Phaser.Math.DegToRad(offset);
      this.scene.time.delayedCall(750, () => {
        this.puedecambiar = true;
      });
    }
  }

}
