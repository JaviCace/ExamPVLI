import Item from './Item.js';

export default class Hammer extends Item {
  constructor(scene, x, y, texture = 'hammer', owner) {
    super(scene, x, y, texture);

    this.owner = owner;
    this.originalScale = { x: this.scaleX, y: this.scaleY };
    this.originalPosition = { x: this.x, y: this.y };

    this.isActing = false;
    this.flipX = true;

    // Guardar tamaño original del body
    this.originalBodySize = {
      width: this.body.width,
      height: this.body.height,
    };
  }

  accion() {
    if (this.isActing) return;

    this.isActing = true;

    const { x, y } = this;
    const dir = this.owner.sprite.flipX ? 1 : -1;

    // Escalar visualmente
    this.setScale(this.originalScale.x * 1.5, this.originalScale.y * 1.5);
    this.refreshBody();

    // Aumentar tamaño del body
    this.body.setSize(
      this.originalBodySize.width * 1.5,
      this.originalBodySize.height * 1.5,
      true
    );

    // Mover posición según dirección
    this.x += dir === 1 ? 30 : 8;

    this.scene.time.delayedCall(300, () => {
      // Restaurar escala
      this.setScale(this.originalScale.x, this.originalScale.y);
      this.setPosition(x, y);

      // Restaurar tamaño original del body
      this.body.setSize(
        this.originalBodySize.width,
        this.originalBodySize.height,
        true
      );

      this.refreshBody();
      this.isActing = false;
    });
  }
}
