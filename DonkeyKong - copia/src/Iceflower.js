import Item from './Item.js';
import IceBall from './Iceball.js';

export default class IceFlower extends Item {
  constructor(scene, x, y, texture = 'flower', shooter) {
    super(scene, x, y, texture);
    this.shooter = shooter; 
  }

  accion() {
  const direction = this.shooter.sprite.flipX ? 1 : -1;
  const x = this.shooter.x + direction * 20;
  const y = this.shooter.y;

  const iceball = new IceBall(this.scene, x, y, direction, 'iceball');

  this.scene.add.existing(iceball);
  this.scene.physics.add.existing(iceball);

  // AÑADIR AL GRUPO SnowballGroup
  if (!this.scene.SnowballGroup) {
    this.scene.SnowballGroup = this.scene.physics.add.group();
  }

  this.scene.SnowballGroup.add(iceball);

  // También lo puedes seguir guardando si quieres mantener una lista
  if (!this.scene.iceballs) this.scene.iceballs = [];
  this.scene.iceballs.push(iceball);
}

}
