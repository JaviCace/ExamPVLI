export default class Rose extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, texture) {
    super(scene, x, y, texture);

    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.setScale(1, 1);
    this.refreshBody();
    this.setImmovable(true);       // No se mueve al chocar
    this.setGravityY(300);         // Aplica gravedad
    this.setCollideWorldBounds(true); // Para que no salga de los límites
  }
}
