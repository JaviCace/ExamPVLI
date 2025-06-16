export default class Vine extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, texture = 'vine') {
    super(scene, x, y, texture);

    this.scene = scene;
    this.fuerza = 0;

    // Añadir a escena y activar física
    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.body.setAllowGravity(false);
    this.setImmovable(true);
    this.setOrigin(0.5, 0); // Balanceo desde la parte superior

    this.setAngle(0);
    this.angularVelocity = 0;

    // Teclas de control
    this.keyA = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.keyD = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
  }

  update() {
    const torque = 0.3;

    if (this.keyA.isDown) {
      this.angularVelocity -= torque;
    }
    if (this.keyD.isDown) {
      this.angularVelocity += torque;
    }

    // Amortiguación (como resistencia del aire)
    this.angularVelocity *= 0.98;

    // Aplicar rotación con límites
    this.angle += this.angularVelocity;

    if (this.angle > 60) {
      this.angle = 60;
      this.angularVelocity = -Math.abs(this.angularVelocity);
    }
    if (this.angle < -60) {
      this.angle = -60;
      this.angularVelocity = Math.abs(this.angularVelocity);
    }

    // Fuerza proporcional al ángulo (máximo 2.5)
    this.fuerza = Math.abs(this.angle / 60) * 2.5;
  }
}
