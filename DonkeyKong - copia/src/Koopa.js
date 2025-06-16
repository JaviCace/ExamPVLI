export default class Koopa extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, texture = 'koopa') {
    super(scene, x, y, texture, 0);
    this.scene = scene;
    this.speed = 100;
    this.direction = -1;
   this.isDying = false;
    // Añadir a escena y físicas
    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.setBounce(0);
    this.setCollideWorldBounds(true);
    this.setScale(1.5);
    this.refreshBody();

    this.animator();
  }

  moveLeft() {
    this.setVelocityX(-this.speed);
    this.playAnimation('walkK');
    this.flipX = false;
  }

  moveRight() {
    this.setVelocityX(this.speed);
    this.playAnimation('walkK');
    this.flipX = true;
  }

  animator() {
    if (!this.scene.anims.exists('walkK')) {
      this.scene.anims.create({
        key: 'walkK',
        frames: this.scene.anims.generateFrameNumbers('koopa', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
      });
    }

    if (!this.scene.anims.exists('dieK')) {
      this.scene.anims.create({
        key: 'dieK',
        frames: [{ key: 'koopa', frame: 4 }],
        frameRate: 10,
        repeat: -1
      });
    }
 if (!this.scene.anims.exists('reviveK')) {
      this.scene.anims.create({
        key: 'reviveK',
       frames: this.scene.anims.generateFrameNumbers('koopa', { start: 4, end: 6 }),
        frameRate: 10,
        repeat: -1
      });
    }
    if (!this.scene.anims.exists('iceK')) {
      this.scene.anims.create({
        key: 'iceK',
        frames: [{ key: 'koopa', frame: 7 }],
        frameRate: 10,
        repeat:-1
      });
    }

    if (!this.scene.anims.exists('idle')) {
      this.scene.anims.create({
        key: 'idle',
        frames: [{ key: 'koopa', frame: 3 }],
        frameRate: 10,
        repeat: -1
      });
    }
  }

  playAnimation(key) {
    if (this.anims.getName() !== key) {
      this.anims.play(key, true);
    }
  }
    cambiarDireccion()
  {
    this.direction = - this.direction
  }

  update() {
    if (this.isDying) return;
    // Movimiento automático
    if (this.direction === -1) {
      this.moveLeft();
    } else {
      this.moveRight();
    }

    // Cambiar dirección al chocar
    if (this.body.blocked.left) {
      this.direction = 1;
    } else if (this.body.blocked.right) {
      this.direction = -1;
    }
  }
    Die()
    {

   return false;
      
    }
    Revive()
    {
return false;
    }

  Iced() {
     if (this.isDying) return;
  this.setVelocity(0);
  this.play('iceK', true)
    this.destroy();
}

  
}
