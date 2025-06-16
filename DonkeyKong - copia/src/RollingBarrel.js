export default class RollingBarrel extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, texture = 'barril') {
    super(scene, x, y, texture, 1);
    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.setBounce(0.1);
    this.setGravityY(300);
    this.setScale(2);
 this.refreshBody();
    this.speed = 250;

    this.scene = scene;
    this.isDestroyed = false;
  }

  update() {
    if (this.isDestroyed) return;

    this.setVelocityX(this.speed);

    const bounds = this.scene.physics.world.bounds;


  }

  changeDirection() {
    const newTarget = -this.speed;

    this.scene.tweens.add({
      targets: this,
      speed: newTarget,
      duration: 600,
      ease: 'Sine.easeInOut',
    });
  }

}
