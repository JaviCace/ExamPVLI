export default class Fireball extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, texture = 'fire') {
    super(scene, x, y, texture, 0);
    this.scene = scene;
    this.speed = 100;
    this.direction = 1;
    this.isDying = false;
    // Agregar a escena y sistema de físicas
    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.setBounce(0);
    this.setCollideWorldBounds(true);
    this.setGravityY(0);
    this.setScale(2, 3);
    this.refreshBody();

    this.animator();
  }

  moveLeft() {
    this.setVelocityX(-this.speed);
    this.playAnimation('walkF');
    this.flipX = false;
  }

  moveRight() {
    this.setVelocityX(this.speed);
    this.playAnimation('walkF');
    this.flipX = true;
  }

  cambiarDireccion()
  {
    this.direction = - this.direction
  }

  animator() {
    this.scene.anims.create({
      key: 'walkF',
      frames: this.scene.anims.generateFrameNumbers('fire', { start: 0, end: 1 }),
      frameRate: 10,
      repeat: -1
    });
     this.scene.anims.create({
      key: 'iceB',
     frames: [{ key: 'fire', frame: 2}],
      frameRate: 10,
      repeat: 0,
    });
  }

  playAnimation(key) {
    if (this.anims.getName() !== key) {
      this.anims.play(key, true);
    }
  }

  update() {
    if (this.isDying) return;
    if (this.direction === -1) {
      this.moveLeft();
    } else {
      this.moveRight();
    }
  }

      Die() {
       if (this.isDying) return;
  this.setVelocity(0);
   this.play('iceB', true);
    this.destroy();

  }
}
