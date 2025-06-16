export default class Spawner extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, texture = 'spawner') {
    super(scene, x, y, texture, 0);

    this.scene = scene;
    this.creado = false;
    this.item = null;

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.setImmovable(true);
    this.setScale(2);
    this.refreshBody();

    this.spawnCooldown = 5000; 
    this.activeTime = 10000;   
    this.timer = 0;
  }

  update(time, delta) {
    this.timer += delta;
 console.log(this.creado);
    if (!this.creado && this.timer >= this.spawnCooldown) {
      this.creado = true;
      console.log(this.creado);
      this.timer = 0;
    } else if (this.creado && this.timer >= this.activeTime) {
      this.creado = false;
      console.log(this.creado);
      this.timer = 0;
    }
  }

  getItem() {
    this.creado = false;
    this.timer = 0;
    return this.item;
  }

  getCreado() {
    return this.creado;
  }
}




export class FlowerSpawner extends Spawner {
  constructor(scene, x, y, texture = 'spawner') {
    super(scene, x, y, texture);
    this.item = 1;

    this.createAnimations();
    this.play(this.creado ? 'Sflawner' : 'idleSF');

    this.scene.time.addEvent({
      delay: 100,
      loop: true,
      callback: () => {
        if (this.creado && this.anims.currentAnim.key !== 'Sflawner') {
          this.play('Sflawner');
        } else if (!this.creado && this.anims.currentAnim.key !== 'idleSF') {
          this.play('idleSF');
        }
      }
    });
  }

  createAnimations() {
    if (!this.scene.anims.exists('idleSF')) {
      this.scene.anims.create({
        key: 'idleSF',
        frames: this.scene.anims.generateFrameNumbers('spawner', { start: 0, end: 1 }),
        frameRate: 10,
        repeat: -1
      });
    }

    if (!this.scene.anims.exists('Sflawner')) {
      this.scene.anims.create({
        key: 'Sflawner',
        frames: this.scene.anims.generateFrameNumbers('spawner', { start: 4, end: 5 }),
        frameRate: 10,
        repeat: -1
      });
    }
  }
}





export class HammerSpawner extends Spawner {
  constructor(scene, x, y, texture = 'spawner') {
    super(scene, x, y, texture);
    this.item = 0;

    this.createAnimations();
    this.play(this.creado ? 'Spammer' : 'idleSH');

    this.scene.time.addEvent({
      delay: 100,
      loop: true,
      callback: () => {
        if (this.creado && this.anims.currentAnim.key !== 'Spammer') {
          this.play('Spammer');
        } else if (!this.creado && this.anims.currentAnim.key !== 'idleSH') {
          this.play('idleSH');
        }
      }
    });
  }

  createAnimations() {
    if (!this.scene.anims.exists('idleSH')) {
      this.scene.anims.create({
        key: 'idleSH',
        frames: this.scene.anims.generateFrameNumbers('spawner', { start: 0, end: 1 }),
        frameRate: 10,
        repeat: -1
      });
    }

    if (!this.scene.anims.exists('Spammer')) {
      this.scene.anims.create({
        key: 'Spammer',
        frames: this.scene.anims.generateFrameNumbers('spawner', { start: 2, end: 3 }),
        frameRate: 10,
        repeat: -1
      });
    }
  }
}
