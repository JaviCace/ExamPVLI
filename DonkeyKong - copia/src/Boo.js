export default class Boo extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, texture = 'boo') {
    super(scene, x, y, texture, 0);
    this.scene = scene;
    this.speed = 30;
    this.isDying = false;
    // Añadir a escena y sistema de físicas
    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.setScale(2, 2);
    this.refreshBody();
    this.setCollideWorldBounds(true);
    this.setBounce(0);
    this.setGravity(0);
    this.body.allowGravity = false;

    this.animator();
  }

  animator() {
    this.scene.anims.create({
      key: 'fly',
      frames: this.scene.anims.generateFrameNumbers('boo', { start: 0, end: 1 }),
      frameRate: 10,
      repeat: -1,
    });
    this.scene.anims.create({
      key: 'iceB',
     frames: [{ key: 'boo', frame: 2}],
      frameRate: 10,
      repeat: 0,
    });
  }

  playAnimation(key) {
    if (this.anims.getName() !== key) {
      this.anims.play(key, true);
    }
  }

  followPlayer(player) {
    const diffX = player.x - this.x;
    const diffY = player.y - this.y;

    const dirX = diffX > 0 ? 1 : -1;
    const dirY = diffY > 0 ? 1 : -1;

    this.setVelocityX(dirX * this.speed);
    this.setVelocityY(dirY * this.speed);

    this.playAnimation('fly');
    this.flipX = dirX < 0;
  }

  update(player) {
     if (this.isDying) return;
    this.followPlayer(player);
  }

    Iced() {
       if (this.isDying) return;
  this.setVelocity(0);
  this.play('iceB', true);
    this.destroy();

 
}
}
