export default class Flor {
  constructor(scene, x, y, texture , sizeX = 1, sizeY = 1) {
    this.scene = scene;

    this.sprite = scene.physics.add.staticImage(x, y, texture);

    this.sprite.setScale(sizeX, sizeY);
    this.sprite.refreshBody();
  }
}
