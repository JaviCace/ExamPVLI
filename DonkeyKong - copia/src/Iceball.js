export default class IceBall extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, direction = 1, texture = 'iceball') {
    super(scene, x, y, texture, 0);

    this.scene = scene;
    this.direction = direction;
    this.speed = 200;
    this.isDying = false;

    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.body.setAllowGravity(false);

    this.setScale(1.5);
    this.refreshBody();
    this.setVelocityX(this.speed * this.direction);
    this.setFlipX(this.direction < 0);

    this.play('iceball_fly', true);


  }

  animator() {
    this.anims.create({
      key: 'iceball_fly',
      frames: this.anims.generateFrameNumbers('iceball', { start: 0, end: 1 }),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: 'iceball_explode',
      frames: [{ key: 'iceball', frame: 2 }],
      frameRate: 15,
      repeat: 0
    });
  }

  update() {
    if (this.isDying) return;

    this.setVelocityX(this.speed * this.direction);
  }

  die() {
    if (this.isDying) return;
    this.isDying = true;

    this.setVelocity(0);
    this.play('iceball_explode', true);

    this.once('animationcomplete', () => {
      this.destroy();
    });
  }
}
