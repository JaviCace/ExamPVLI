export default class Item extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, texture = 'item') {
    super(scene, x, y, texture);

    this.scene = scene;

    // Agregar a escena y activar física
    scene.add.existing(this);
    scene.physics.add.existing(this);

    // No gravedad ni movimiento
    this.body.setAllowGravity(false);
    this.setImmovable(true);
    this.setScale(1.5);

    // Asignar tecla V
    this.keyV = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);

    // Autodestrucción a los 10 segundos
    this.scene.time.delayedCall(10000, () => {
      this.destroy(); // Elimina el sprite de la escena
      console.log('Item eliminado tras 10 segundos');
    });
  }

  accion() {
    console.log('¡Acción del item ejecutada!');
    // Aquí va la lógica que quieras al activar el item
  }

  update() {
    if (Phaser.Input.Keyboard.JustDown(this.keyV)) {
      this.accion();
    }
  }
}
