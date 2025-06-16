export class PreloadScene extends Phaser.Scene 
{
  preload() 
  {
    this.load.image('mapa','./assets/sprites/mapa.png');
    this.load.image('nivel', './assets/sprites/platform.png');
    this.load.spritesheet('player', './assets/sprites/mario.png', { frameWidth: 16, frameHeight: 24 });
    this.load.spritesheet('fire','./assets/sprites/fire.png', { frameWidth: 16, frameHeight: 12 });
    this.load.spritesheet('boo','./assets/sprites/boo.png', { frameWidth: 16, frameHeight: 12 });
    this.load.spritesheet('koopa','./assets/sprites/Koopa.png', { frameWidth: 16, frameHeight: 24 });
    this.load.spritesheet('kong','./assets/sprites/Kong.png', { frameWidth: 32, frameHeight: 32 });
    this.load.spritesheet('barril','./assets/sprites/barril.png', { frameWidth: 16, frameHeight: 10 });
    this.load.spritesheet('spawner','./assets/sprites/Spawner.png', { frameWidth: 32, frameHeight: 32 });
    this.load.spritesheet('iceball','./assets/sprites/Iceball.png', { frameWidth: 16, frameHeight: 12 });
    this.load.image('Background', './assets/sprites/MainMenu.jpg');
    this.load.image('flor', './assets/sprites/Floor.png');
    this.load.image('flor2', './assets/sprites/flor2.png');
    this.load.image('rosa', './assets/sprites/Rosa.png');
    this.load.image('vine', './assets/sprites/Vine.png');
    this.load.image('flower', './assets/sprites/iceflower.png');
    this.load.image('hammer', './assets/sprites/hammer.png');
    this.load.image('Next', './assets/sprites/NextLevel.jpg');
    this.load.image('Win', './assets/sprites/WinWin.jpg');
    this.load.image('Lose', './assets/sprites/LoseLose.jpg');
    this.load.image('jungle', './assets/sprites/jungle.png');
    this.load.image('castle', './assets/sprites/castle.png');


    //audios
    this.load.audio('Menu','./assets/sounds/intro1.mp3');
    this.load.audio('Mapa','./assets/sounds/Mapa.mp3');
    this.load.audio('nivel','./assets/sounds/nivel.mp3');
    this.load.audio('MarioMuere','./assets/sounds/marioMuere.mp3');
    this.load.audio('DonkeyMuere','./assets/sounds/donkeyMuere.mp3');
    this.load.audio('Lose','./assets/sounds/failure.mp3');
    this.load.audio('Win','./assets/sounds/ganar.mp3');
    this.load.audio('Puntos','./assets/sounds/score.wav');
  }

  create() 
  {
    this.scene.start('MainScene');
  }
}