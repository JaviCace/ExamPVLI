import Player from "./Player.js";
import Flor from './Flor.js';
import Fireball from "./Fireball.js";
import Boo from "./Boo.js";
import Koopa from "./Koopa.js";
import Kong from "./Kong.js";
import Rose from "./Rose.js";
import { FlowerSpawner, HammerSpawner } from "./Spawner.js";

class LevelScene1 extends Phaser.Scene {
  constructor() {
    super('LevelScene1');
  }

  create() {
    this.flores = this.physics.add.staticGroup();
    this.flores.add(new Flor(this, this.scale.width / 2 - 100, this.scale.height - 64, 'flor', 18, 3).sprite);
    this.flores.add(new Flor(this, this.scale.width / 2 + 100, this.scale.height - 164, 'flor', 18, 2).sprite);
    this.flores.add(new Flor(this, this.scale.width / 2 , this.scale.height - 264, 'flor', 15, 2).sprite);
    this.flores.add(new Flor(this, this.scale.width / 2  - 500 , this.scale.height - 264, 'flor', 4, 2).sprite);
    this.flores.add(new Flor(this, this.scale.width / 2 + 100, this.scale.height - 364, 'flor', 15, 2).sprite);
    this.flores.add(new Flor(this, this.scale.width / 2 - 100, this.scale.height - 464, 'flor', 18, 2).sprite);


    this.roses = this.physics.add.group();
    this.roses.add(new Rose(this,this.scale.width / 2 - 300,this.scale.height - 194, 'rosa'));
    this.roses.add(new Rose(this,this.scale.width ,this.scale.height - 194,'rosa'));
    this.roses.add(new Rose(this,this.scale.width/2 + 300 ,this.scale.height - 494,'rosa'));
    this.roses.add(new Rose(this,this.scale.width/2 - 250 ,this.scale.height - 394,'rosa'));
    this.roses.add(new Rose(this,this.scale.width/2 + 350 ,this.scale.height - 294,'rosa'));
    this.roses.add(new Rose(this,this.scale.width/2 + 450 ,this.scale.height - 394,'rosa'));
    this.roses.add(new Rose(this,this.scale.width/2 - 360 ,this.scale.height - 294,'rosa'));


    this.Spawners = this.physics.add.group();
   this.Spawners.add(new FlowerSpawner(this,this.scale.width / 2 + 300,this.scale.height - 124, 'spawner'));
   this.Spawners.add(new HammerSpawner(this,this.scale.width / 2 - 460,this.scale.height - 304, 'spawner'));



     this.barrelGroup = this.physics.add.group();
     this.ThrowingGroup = this.physics.add.group();
      this.itemGroup = this.physics.add.group({
  allowGravity: false,  
  runChildUpdate: true  
});
this.SnowballGroup = this.physics.add.group({
  allowGravity: false,
  runChildUpdate: true  
});
      this.kongs = [new Kong(this, this.scale.width / 2 - 300, this.scale.height - 564,'kong',this.barrelGroup,this.ThrowingGroup),];



    
    this.player = new Player(this, 100, this.scale.height - 94, 'player');

    this.fireballes = [new Fireball(this,this.scale.width / 2 - 100,this.scale.height - 294,'fire'),new Fireball(this,this.scale.width / 2 - 100,this.scale.height - 394,'fire'),new Fireball(this,this.scale.width / 2 - 100,this.scale.height - 194,'fire')];
    this.Koopas = [];
    this.Boos = [new Boo(this,400,100,'boo'),new Boo(this,500,200,'boo'),new Boo(this,100,300,'boo')];

    // Colisiones
    this.physics.add.collider(this.player, this.flores);
    this.physics.add.collider(this.roses, this.flores);
    this.physics.add.collider(this.barrelGroup, this.flores);
    this.kongs.forEach(f => this.physics.add.collider(f, this.flores));
    this.fireballes.forEach(f => this.physics.add.collider(f, this.flores));
    this.Koopas.forEach(k => this.physics.add.collider(k, this.flores));
    this.physics.add.collider(this.Spawners, this.flores);

    // HUD
    this.counter = 120;
    this.puntos = 0;
    this.gameOver = false;

    this.contadorTexto = this.add.text(20, 20, 'Tiempo: 120', { fontSize: '24px', color: '#ffffff' });
    this.puntosTexto = this.add.text(20, 60, 'Puntos: 0', { fontSize: '24px', color: '#ffffff' });
    this.vidasTexto = this.add.text(500, 20, 'Vidas: 3', { fontSize: '24px', color: '#ffffff' });

    this.time.addEvent({
      delay: 1000,
      callback: this.actualizarContador,
      callbackScope: this,
      loop: true
    });

    // Música
    this.music = this.sound.add('nivel', { loop: true, volume: 0.5 });
    this.music.play();

    this.music2 = this.sound.add('MarioMuere', { loop: false, volume: 1 });
    this.music3 = this.sound.add('DonkeyMuere', { loop: false, volume: 1 });

    // Teclado
    this.keys = this.input.keyboard.addKeys({
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D,
      space: Phaser.Input.Keyboard.KeyCodes.SPACE,
      use: Phaser.Input.Keyboard.KeyCodes.E,
    });
  }

  update(time, delta) {
    if (this.gameOver) return;

    if (this.counter <= 0 || this.player.lifes <= 0 || this.player.getMuerto()) {
      this.gameOver = true;
      this.puntos += this.counter * 10;
      this.music.stop();
      this.music2.play();

      this.player.forceDeathState();

      this.time.delayedCall(2000, () => {
        if (this.music2.isPlaying) this.music2.stop();
        this.scene.start('LoseScene', { puntos: this.puntos });
      });

      return;
    }

    this.colisiones();

    this.player.update(this.keys);
    this.fireballes.forEach(f => f.update());
    this.kongs.forEach(kong => kong.update());
    this.Koopas.forEach(k => k.update());
    this.Boos.forEach(b => b.update(this.player));
    this.Spawners.children.iterate(spawner => {
 spawner.update(time,delta);
});

this.SnowballGroup.children.iterate(iceball => {
  if (iceball && iceball.update) {
    iceball.update();
  }
});


    this.puntosTexto.setText('Puntos: ' + this.puntos);
    this.vidasTexto.setText('Vidas: ' + this.player.lifes);
  }

  colisiones() {
    //fireballs
    this.fireballes.forEach(fireball => {
      this.roses.children.iterate(rose => {
        if (this.physics.overlap(fireball, rose)) {
          fireball.cambiarDireccion();
        }
      });

      if (this.physics.overlap(fireball, this.player) && !this.player.golpeado) {
        this.player.hurt();
      }
    });
//koopas
    this.Koopas.forEach(koopa => {
      this.roses.children.iterate(rose => {
        if (this.physics.overlap(koopa, rose)) {
          koopa.cambiarDireccion();
        }
      });

      if (this.physics.overlap(koopa, this.player) && !this.player.golpeado) {
        this.player.hurt();
      }
    });
//boos
    this.Boos.forEach(boo => {
      if (this.physics.overlap(boo, this.player) && !this.player.golpeado) {
        this.player.hurt();
      }
    });
//barriles
    this.barrelGroup.children.iterate(barril => {
      this.roses.children.iterate(rose => {
        if (this.physics.overlap(barril, rose)) {
          barril.changeDirection();
        }
      });

      if (this.physics.overlap(barril, this.player) && !this.player.golpeado) {
        this.player.hurt();
      }
    });

//snowball
this.SnowballGroup.children.iterate(iceball => {
  this.Koopas.forEach(koopa => {
    if (this.physics.overlap(iceball, koopa)) {
      console.log('Iceball tocó a Koopa');
      iceball.destroy(); 
koopa.Iced(); 
this.Koopas = this.Koopas.filter(k => k !== koopa);
this.puntos += 200;

    }
  });

  this.Boos.forEach(boo => {
    if (this.physics.overlap(iceball, boo)) {
      console.log('Iceball tocó a Boo');
      iceball.destroy();
      boo.Iced();
      this.Boos = this.Boos.filter(k => k !== boo);
       this.puntos += 200;
    }
  });

  this.fireballes.forEach(fireball => {
    if (this.physics.overlap(iceball, fireball)) {
      console.log('Iceball tocó a Kong');
      iceball.destroy();
     
    }
  });
});
//items
this.itemGroup.children.iterate(item => {
  this.Koopas.forEach(koopa => {
    if (this.physics.overlap(item, koopa)) {
      console.log('Iceball tocó a Koopa');
koopa.Iced(); 
this.Koopas = this.Koopas.filter(k => k !== koopa);
this.puntos += 200;

    }
  });

  this.fireballes.forEach(fireball => {
    if (this.physics.overlap(item, fireball)) {
      console.log('Iceball tocó a Kong');
      fireball.Die(); 
     this.fireballes = this.fireballes.filter(k => k !== fireball);
     
    }
  });
});



    this.ThrowingGroup.children.iterate(barril => {
      if (this.physics.overlap(barril, this.flores)) {
        barril.cambiarDirection(Phaser.Math.Between(-15, 15));
      }

      if (this.physics.overlap(barril, this.player) && !this.player.golpeado) {
        this.player.hurt();
      }
    });

  

    

this.Spawners.children.iterate(spawner => {
  if (this.physics.overlap(spawner, this.player) && spawner.getCreado()) {
    console.log("tocado");
    console.log(spawner.getItem());
    this.player.addItem(spawner.getItem());
  }
});


    this.kongs.forEach(kong => {
      if (this.physics.overlap(kong, this.player)) {
        kong.Die();
        this.gameOver = true;
        this.puntos += this.counter * 10;
        this.music.stop();
        this.music3.play();

        this.player.forceDeathState();

        this.time.delayedCall(2000, () => {
          if (this.music3.isPlaying) this.music3.stop();
          this.scene.start('NextScene', { puntos: this.puntos , nivel: 1 });
           this.scene.stop();
        });
      }
    });
  }

  actualizarContador() {
    this.counter--;
    this.contadorTexto.setText('Tiempo: ' + this.counter);
  }

}

export { LevelScene1 }; 


















class LevelScene2 extends Phaser.Scene {
  constructor() {
    super('LevelScene2');
  }

  init(data) {
    this.number = data;
  }
  create() {

    this.add.image(this.cameras.main.width / 2,this.cameras.main.height / 2,'jungle');
this.flores = this.physics.add.staticGroup();


this.flores.add(new Flor(this, this.scale.width / 2 - 100, this.scale.height - 10, 'flor2', 18, 1.5).sprite);
this.flores.add(new Flor(this, this.scale.width / 2 - 300, this.scale.height - 134, 'flor2', 7, 1.5).sprite);
this.flores.add(new Flor(this, this.scale.width / 2 + 400, this.scale.height - 154, 'flor2', 3, 1.5).sprite);
this.flores.add(new Flor(this, this.scale.width / 2 + 200, this.scale.height - 104, 'flor2', 7, 1.5).sprite);
this.flores.add(new Flor(this, this.scale.width / 2, this.scale.height - 264, 'flor2', 15, 2).sprite);
this.flores.add(new Flor(this, this.scale.width / 2 - 500, this.scale.height  - 194, 'flor2', 4, 1.5).sprite);
this.flores.add(new Flor(this, this.scale.width / 2 + 100, this.scale.height - 364, 'flor2', 15, 1.5).sprite);
this.flores.add(new Flor(this, this.scale.width / 2 - 100, this.scale.height - 464, 'flor2', 17, 1.5).sprite);
this.flores.add(new Flor(this, this.scale.width / 2 - 300, this.scale.height - 564, 'flor2', 8, 1.5).sprite);

   this.Spawners = this.physics.add.group();
   this.Spawners.add(new FlowerSpawner(this,this.scale.width / 2,274,'spawner',));
  this.Spawners.add(new FlowerSpawner(this,this.scale.width /2 + 400,this.scale.height - 194,'spawner',));


 

     this.barrelGroup = this.physics.add.group();
     this.ThrowingGroup = this.physics.add.group();
      this.itemGroup = this.physics.add.group({
  allowGravity: false,  
  runChildUpdate: true  
});
this.SnowballGroup = this.physics.add.group({
  allowGravity: false,
  runChildUpdate: true  
});
      this.kongs = [new Kong(this, 100, this.scale.height - 654,'kong',this.barrelGroup,this.ThrowingGroup),];


this.roses = this.physics.add.group();

this.roses.add(new Rose(this, this.scale.width / 2 - 400, this.scale.height - 364, 'rosa'));
this.roses.add(new Rose(this, this.scale.width / 2 + 435, this.scale.height - 364, 'rosa'));
this.roses.add(new Rose(this, this.scale.width / 2 - 100, this.scale.height - 264, 'rosa'));
this.roses.add(new Rose(this, 10, this.scale.height - 204, 'rosa'));
this.roses.add(new Rose(this, this.scale.width / 2 , this.scale.height - 154, 'rosa'));
this.roses.add(new Rose(this, this.scale.width / 2 + 400, this.scale.height - 154, 'rosa'));
this.roses.add(new Rose(this, this.scale.width / 2 + 475, this.scale.height - 464, 'rosa'));
this.roses.add(new Rose(this, this.scale.width / 2 - 350, this.scale.height - 464, 'rosa'));
this.roses.add(new Rose(this, this.scale.width - 100, this.scale.height - 564, 'rosa'));
this.roses.add(new Rose(this, 40, this.scale.height - 564, 'rosa'));



    this.player = new Player(this, 100, this.scale.height - 94, 'player');

    this.fireballes = [];
    this.Koopas = [];
this.Koopas.push(new Koopa(this, this.scale.width / 2 - 290, this.scale.height - 204, 'koopa'));
this.Koopas.push(new Koopa(this, this.scale.width / 2 + 310, this.scale.height - 164, 'koopa'));
this.Koopas.push(new Koopa(this, this.scale.width / 2 , this.scale.height - 364, 'koopa'));
this.Koopas.push(new Koopa(this, this.scale.width / 2 , this.scale.height - 464, 'koopa'));
this.Koopas.push(new Koopa(this, this.scale.width / 2 , this.scale.height - 564, 'koopa'));

this.Boos = [];

this.Boos.push(new Boo(this, 684, 534, 'boo'));
this.Boos.push(new Boo(this, 406, 152, 'boo'));
this.Boos.push(new Boo(this, 105, 424, 'boo'));
this.Boos.push(new Boo(this, 336, 1074, 'boo'));


    // Colisiones
    this.physics.add.collider(this.player, this.flores);
    this.physics.add.collider(this.roses, this.flores);
    this.physics.add.collider(this.barrelGroup, this.flores);
 this.kongs.forEach(f => this.physics.add.collider(f, this.flores));
    this.fireballes.forEach(f => this.physics.add.collider(f, this.flores));
    this.Koopas.forEach(k => this.physics.add.collider(k, this.flores));
    this.physics.add.collider(this.Spawners, this.flores);

    // HUD
    this.counter = 120;
    this.puntos = 0;
    this.gameOver = false;

    this.contadorTexto = this.add.text(20, 20, 'Tiempo: 120', { fontSize: '24px', color: '#ffffff' });
    this.puntosTexto = this.add.text(20, 60, 'Puntos: 0', { fontSize: '24px', color: '#ffffff' });
    this.vidasTexto = this.add.text(500, 20, 'Vidas: 3', { fontSize: '24px', color: '#ffffff' });

    this.time.addEvent({
      delay: 1000,
      callback: this.actualizarContador,
      callbackScope: this,
      loop: true
    });

    // Música
    this.music = this.sound.add('nivel', { loop: true, volume: 0.5 });
    this.music.play();

    this.music2 = this.sound.add('MarioMuere', { loop: false, volume: 1 });
    this.music3 = this.sound.add('DonkeyMuere', { loop: false, volume: 1 });

    // Teclado
    this.keys = this.input.keyboard.addKeys({
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D,
      space: Phaser.Input.Keyboard.KeyCodes.SPACE,
      use: Phaser.Input.Keyboard.KeyCodes.E,
    });
  }

  update(time, delta) {
    if (this.gameOver) return;

    if (this.counter <= 0 || this.player.lifes <= 0 || this.player.getMuerto()) {
      this.gameOver = true;
      this.puntos += this.counter * 10;
      this.music.stop();
      this.music2.play();

      this.player.forceDeathState();

      this.time.delayedCall(2000, () => {
        if (this.music2.isPlaying) this.music2.stop();
        this.scene.start('LoseScene', { puntos: this.puntos });
      });

      return;
    }

    this.colisiones();

    this.player.update(this.keys);
    this.fireballes.forEach(f => f.update());
    this.kongs.forEach(kong => kong.update());
    this.Koopas.forEach(k => k.update());
    this.Boos.forEach(b => b.update(this.player));
    this.Spawners.children.iterate(spawner => {
 spawner.update(time,delta);
});

this.SnowballGroup.children.iterate(iceball => {
  if (iceball && iceball.update) {
    iceball.update();
  }
});


    this.puntosTexto.setText('Puntos: ' + this.puntos);
    this.vidasTexto.setText('Vidas: ' + this.player.lifes);
  }

  colisiones() {
    //fireballs
    this.fireballes.forEach(fireball => {
      this.roses.children.iterate(rose => {
        if (this.physics.overlap(fireball, rose)) {
          fireball.cambiarDireccion();
        }
      });

      if (this.physics.overlap(fireball, this.player) && !this.player.golpeado) {
        this.player.hurt();
      }
    });
//koopas
    this.Koopas.forEach(koopa => {
      this.roses.children.iterate(rose => {
        if (this.physics.overlap(koopa, rose)) {
          koopa.cambiarDireccion();
        }
      });

      if (this.physics.overlap(koopa, this.player) && !this.player.golpeado) {
        this.player.hurt();
      }
    });
//boos
    this.Boos.forEach(boo => {
      if (this.physics.overlap(boo, this.player) && !this.player.golpeado) {
        this.player.hurt();
      }
    });
//barriles
    this.barrelGroup.children.iterate(barril => {
      this.roses.children.iterate(rose => {
        if (this.physics.overlap(barril, rose)) {
          barril.changeDirection();
        }
      });

      if (this.physics.overlap(barril, this.player) && !this.player.golpeado) {
        this.player.hurt();
      }
    });

//snowball
this.SnowballGroup.children.iterate(iceball => {
  this.Koopas.forEach(koopa => {
    if (this.physics.overlap(iceball, koopa)) {
      console.log('Iceball tocó a Koopa');
      iceball.destroy(); 
koopa.Iced(); 
this.Koopas = this.Koopas.filter(k => k !== koopa);
this.puntos += 200;

    }
  });

  this.Boos.forEach(boo => {
    if (this.physics.overlap(iceball, boo)) {
      console.log('Iceball tocó a Boo');
      iceball.destroy();
      boo.Iced();
      this.Boos = this.Boos.filter(k => k !== boo);
       this.puntos += 200;
    }
  });

  this.fireballes.forEach(fireball => {
    if (this.physics.overlap(iceball, fireball)) {
      console.log('Iceball tocó a Kong');
      iceball.destroy();
     
    }
  });
});

this.itemGroup.children.iterate(item => {
  this.Koopas.forEach(koopa => {
    if (this.physics.overlap(item, koopa)) {
      console.log('Iceball tocó a Koopa');
koopa.Iced(); 
this.Koopas = this.Koopas.filter(k => k !== koopa);
this.puntos += 200;

    }
  });

  this.fireballes.forEach(fireball => {
    if (this.physics.overlap(item, fireball)) {
      console.log('Iceball tocó a Kong');
      fireball.Die(); 
     this.fireballes = this.fireballes.filter(k => k !== fireball);
     
    }
  });
});



    this.ThrowingGroup.children.iterate(barril => {
      if (this.physics.overlap(barril, this.flores)) {
        barril.cambiarDirection(Phaser.Math.Between(-15, 15));
      }

      if (this.physics.overlap(barril, this.player) && !this.player.golpeado) {
        this.player.hurt();
      }
    });

  

    

this.Spawners.children.iterate(spawner => {
  if (this.physics.overlap(spawner, this.player) && spawner.getCreado()) {
    console.log("tocado");
    console.log(spawner.getItem());
    this.player.addItem(spawner.getItem());
  }
});


    this.kongs.forEach(kong => {
      if (this.physics.overlap(kong, this.player)) {
        kong.Die();
        this.gameOver = true;
        this.puntos += this.counter * 10;
        this.music.stop();
        this.music3.play();

        this.player.forceDeathState();

        this.time.delayedCall(2000, () => {
          if (this.music3.isPlaying) this.music3.stop();
          this.scene.start('NextScene', { puntos: this.puntos , nivel: 2 });
           this.scene.stop();
        });
      }
    });
  }

  actualizarContador() {
    this.counter--;
    this.contadorTexto.setText('Tiempo: ' + this.counter);
  }

}

export { LevelScene2 };






















class LevelScene3 extends Phaser.Scene {
  constructor() {
    super('LevelScene3');
  }

  create() {

   this.background = this.add.tileSprite(
  0,                          
  0,                           
  this.scale.width,           
  this.scale.height * 3,     
  'castle'               
).setOrigin(0, 0);
this.flores = this.physics.add.staticGroup();

this.flores.add(new Flor(this, this.scale.width/2, this.scale.height - 50, 'flor', 18, 1.5).sprite);
this.flores.add(new Flor(this, 470, this.scale.height - 150, 'flor', 7, 1.5).sprite);
this.flores.add(new Flor(this, 670, this.scale.height - 230, 'flor', 7, 1.5).sprite);
this.flores.add(new Flor(this, 270, this.scale.height - 320, 'flor', 9, 1.5).sprite);
this.flores.add(new Flor(this, 520, this.scale.height - 390, 'flor', 6, 1.5).sprite);
this.flores.add(new Flor(this, 670, this.scale.height - 480, 'flor', 5, 1.5).sprite);
this.flores.add(new Flor(this, 220, this.scale.height - 540, 'flor', 7, 1.5).sprite);
this.flores.add(new Flor(this, 420, this.scale.height - 630, 'flor', 7, 1.5).sprite);
this.flores.add(new Flor(this, 620, this.scale.height - 695, 'flor', 6, 1.5).sprite);
this.flores.add(new Flor(this, 320, this.scale.height - 770, 'flor', 7, 1.5).sprite);
this.flores.add(new Flor(this, 520, this.scale.height - 860, 'flor', 5, 1.5).sprite);
this.flores.add(new Flor(this, 270, this.scale.height - 920, 'flor', 9, 1.5).sprite);
this.flores.add(new Flor(this, 470, this.scale.height - 990, 'flor', 7, 1.5).sprite);
this.flores.add(new Flor(this, 670, this.scale.height - 1060, 'flor', 6, 1.5).sprite);

this.roses = this.physics.add.group();
const addRosesAtEnds = (florX, florY, tileCount, scale = 1.5) => {
  const tileWidth = 32 * scale;
  const halfWidth = (tileCount * tileWidth) / 2;

  this.roses.add(new Rose(this, florX - halfWidth + 16, florY - 20, 'rosa')); // izquierda
  this.roses.add(new Rose(this, florX + halfWidth - 16, florY - 20, 'rosa')); // derecha
};

// Y ahora para cada plataforma:
addRosesAtEnds(this.scale.width/2, this.scale.height - 50, 18);
addRosesAtEnds(470, this.scale.height - 150, 7);
addRosesAtEnds(670, this.scale.height - 230, 7);

addRosesAtEnds(270, this.scale.height - 320, 9);
addRosesAtEnds(520, this.scale.height - 390, 6);
addRosesAtEnds(670, this.scale.height - 480, 5);

addRosesAtEnds(220, this.scale.height - 540, 7);
addRosesAtEnds(420, this.scale.height - 630, 7);
addRosesAtEnds(620, this.scale.height - 695, 6);

addRosesAtEnds(320, this.scale.height - 770, 7);
addRosesAtEnds(520, this.scale.height - 860, 5);

addRosesAtEnds(270, this.scale.height - 920, 9);
addRosesAtEnds(470, this.scale.height - 990, 7);
addRosesAtEnds(670, this.scale.height - 1060, 6);


this.Spawners = this.physics.add.group();

this.Spawners.add(new FlowerSpawner(this, 300,500, 'spawner'));
this.Spawners.add(new HammerSpawner(this, 470, 330, 'spawner'));
this.Spawners.add(new FlowerSpawner(this, 870,500, 'spawner'));
this.Spawners.add(new HammerSpawner(this, 620,  900, 'spawner'));

    this.barrelGroup = this.physics.add.group();
    this.ThrowingGroup = this.physics.add.group();
    this.itemGroup = this.physics.add.group({
      allowGravity: false,
      runChildUpdate: true
    });
    this.SnowballGroup = this.physics.add.group({
      allowGravity: false,
      runChildUpdate: true
    });

    this.kongs = [new Kong(this, 670, this.scale.height - 1200, 'kong', this.barrelGroup, this.ThrowingGroup)];


    this.player = new Player(this, 100, this.scale.height - 94, 'player');

    this.playerInitialY = this.player.y;
this.fireballes = [];

this.fireballes.push(new Fireball(this, this.scale.width / 2, this.scale.height - 100, 'fire'));
this.fireballes.push(new Fireball(this, 470, this.scale.height - 200, 'fire'));
this.fireballes.push(new Fireball(this, 670, this.scale.height - 280, 'fire'));
this.fireballes.push(new Fireball(this, 270, this.scale.height - 370, 'fire'));
this.fireballes.push(new Fireball(this, 520, this.scale.height - 440, 'fire'));
this.fireballes.push(new Fireball(this, 670, this.scale.height - 530, 'fire'));
this.fireballes.push(new Fireball(this, 220, this.scale.height - 590, 'fire'));
this.fireballes.push(new Fireball(this, 420, this.scale.height - 680, 'fire'));
this.fireballes.push(new Fireball(this, 620, this.scale.height - 745, 'fire'));
this.fireballes.push(new Fireball(this, 320, this.scale.height - 820, 'fire'));
this.fireballes.push(new Fireball(this, 520, this.scale.height - 910, 'fire'));
this.fireballes.push(new Fireball(this, 270, this.scale.height - 970, 'fire'));
this.fireballes.push(new Fireball(this, 470, this.scale.height - 1040, 'fire'));
this.fireballes.push(new Fireball(this, 670, this.scale.height - 1110, 'fire'));

this.Koopas = [];

this.Koopas.push(new Koopa(this, this.scale.width / 2, this.scale.height - 80, 'koopa'));
this.Koopas.push(new Koopa(this, 470, this.scale.height - 180, 'koopa'));
this.Koopas.push(new Koopa(this, 670, this.scale.height - 260, 'koopa'));
this.Koopas.push(new Koopa(this, 270, this.scale.height - 350, 'koopa'));
this.Koopas.push(new Koopa(this, 520, this.scale.height - 420, 'koopa'));
this.Koopas.push(new Koopa(this, 670, this.scale.height - 510, 'koopa'));
this.Koopas.push(new Koopa(this, 220, this.scale.height - 570, 'koopa'));
this.Koopas.push(new Koopa(this, 420, this.scale.height - 660, 'koopa'));
this.Koopas.push(new Koopa(this, 620, this.scale.height - 725, 'koopa'));
this.Koopas.push(new Koopa(this, 320, this.scale.height - 800, 'koopa'));
this.Koopas.push(new Koopa(this, 520, this.scale.height - 890, 'koopa'));
this.Koopas.push(new Koopa(this, 270, this.scale.height - 950, 'koopa'));
this.Koopas.push(new Koopa(this, 470, this.scale.height - 1020, 'koopa'));
this.Koopas.push(new Koopa(this, 670, this.scale.height - 1090, 'koopa'));

this.Boos = [];

this.Boos.push(new Boo(this, 684, 534, 'boo'));
this.Boos.push(new Boo(this, 406, 152, 'boo'));
this.Boos.push(new Boo(this, 105, 424, 'boo'));
this.Boos.push(new Boo(this, 336, 1074, 'boo'));
this.Boos.push(new Boo(this, 203, 718, 'boo'));

    const worldHeight = 2000;
    this.worldTopLimit = -400;

    this.physics.world.setBounds(0, this.worldTopLimit, this.scale.width, worldHeight - this.worldTopLimit);
    this.cameras.main.setBounds(0, this.worldTopLimit, this.scale.width, worldHeight - this.worldTopLimit);

    this.physics.add.collider(this.player, this.flores);
    this.physics.add.collider(this.roses, this.flores);
    this.physics.add.collider(this.barrelGroup, this.flores);
    this.kongs.forEach(f => this.physics.add.collider(f, this.flores));
    this.fireballes.forEach(f => this.physics.add.collider(f, this.flores));
    this.Koopas.forEach(k => this.physics.add.collider(k, this.flores));
    this.physics.add.collider(this.Spawners, this.flores);

    // HUD
    this.counter = 120;
    this.puntos = 0;
    this.gameOver = false;
// HUD
this.counter = 120;
this.puntos = 0;
this.gameOver = false;

this.contadorTexto = this.add.text(20, 20, 'Tiempo: 120', { fontSize: '24px', color: '#ffffff' });
this.contadorTexto.setScrollFactor(0);

this.puntosTexto = this.add.text(20, 60, 'Puntos: 0', { fontSize: '24px', color: '#ffffff' });
this.puntosTexto.setScrollFactor(0);

this.vidasTexto = this.add.text(500, 20, 'Vidas: 3', { fontSize: '24px', color: '#ffffff' });
this.vidasTexto.setScrollFactor(0);


    this.time.addEvent({
      delay: 1000,
      callback: this.actualizarContador,
      callbackScope: this,
      loop: true
    });

    this.music = this.sound.add('nivel', { loop: true, volume: 0.5 });
    this.music.play();

    this.music2 = this.sound.add('MarioMuere', { loop: false, volume: 1 });
    this.music3 = this.sound.add('DonkeyMuere', { loop: false, volume: 1 });

    this.keys = this.input.keyboard.addKeys({
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D,
      space: Phaser.Input.Keyboard.KeyCodes.SPACE,
      use: Phaser.Input.Keyboard.KeyCodes.E,
    });

    this.cameras.main.setDeadzone(100, 100);
  }

  update(time, delta) {
    if (this.gameOver) return;

    if (this.counter <= 0 || this.player.lifes <= 0 || this.player.getMuerto()) {
      this.gameOver = true;
      this.puntos += this.counter * 10;
      this.music.stop();
      this.music2.play();

      this.player.forceDeathState();

      this.time.delayedCall(2000, () => {
        if (this.music2.isPlaying) this.music2.stop();
        this.scene.start('LoseScene', { puntos: this.puntos });
      });

      return;
    }

    this.colisiones();

    this.player.update(this.keys);
    this.fireballes.forEach(f => f.update());
    this.kongs.forEach(kong => kong.update());
    this.Koopas.forEach(k => k.update());
    this.Boos.forEach(b => b.update(this.player));
    this.Spawners.children.iterate(spawner => {
      spawner.update(time, delta);
    });

    this.SnowballGroup.children.iterate(iceball => {
      if (iceball && iceball.update) {
        iceball.update();
      }
    });

    this.puntosTexto.setText('Puntos: ' + this.puntos);
    this.vidasTexto.setText('Vidas: ' + this.player.lifes);

    this.cameras.main.scrollX = this.player.x - this.scale.width / 2;

    // Control vertical de la cámara permitiendo que suba hasta worldTopLimit
    const targetY = this.player.y - this.scale.height / 2;

    if (targetY < this.cameras.main.scrollY) {
      // Suaviza la subida
      this.cameras.main.scrollY = Phaser.Math.Interpolation.Linear(
        [this.cameras.main.scrollY, targetY], 0.1);
    } else {
      // No dejar bajar la cámara demasiado abajo ni más abajo que targetY
      this.cameras.main.scrollY = Math.min(this.cameras.main.scrollY, targetY);
      this.cameras.main.scrollY = Math.max(this.cameras.main.scrollY, this.worldTopLimit);
    }
  }

 colisiones() {
    //fireballs
    this.fireballes.forEach(fireball => {
      this.roses.children.iterate(rose => {
        if (this.physics.overlap(fireball, rose)) {
          fireball.cambiarDireccion();
        }
      });

      if (this.physics.overlap(fireball, this.player) && !this.player.golpeado) {
        this.player.hurt();
      }
    });
//koopas
    this.Koopas.forEach(koopa => {
      this.roses.children.iterate(rose => {
        if (this.physics.overlap(koopa, rose)) {
          koopa.cambiarDireccion();
        }
      });

      if (this.physics.overlap(koopa, this.player) && !this.player.golpeado) {
        this.player.hurt();
      }
    });
//boos
    this.Boos.forEach(boo => {
      if (this.physics.overlap(boo, this.player) && !this.player.golpeado) {
        this.player.hurt();
      }
    });
//barriles
    this.barrelGroup.children.iterate(barril => {
      this.roses.children.iterate(rose => {
        if (this.physics.overlap(barril, rose)) {
          barril.changeDirection();
        }
      });

      if (this.physics.overlap(barril, this.player) && !this.player.golpeado) {
        this.player.hurt();
      }
    });

//snowball
this.SnowballGroup.children.iterate(iceball => {
  this.Koopas.forEach(koopa => {
    if (this.physics.overlap(iceball, koopa)) {
      console.log('Iceball tocó a Koopa');
      iceball.destroy(); 
koopa.Iced(); 
this.Koopas = this.Koopas.filter(k => k !== koopa);
this.puntos += 200;

    }
  });

  this.Boos.forEach(boo => {
    if (this.physics.overlap(iceball, boo)) {
      console.log('Iceball tocó a Boo');
      iceball.destroy();
      boo.Iced();
      this.Boos = this.Boos.filter(k => k !== boo);
       this.puntos += 200;
    }
  });

  this.fireballes.forEach(fireball => {
    if (this.physics.overlap(iceball, fireball)) {
      console.log('Iceball tocó a Kong');
      iceball.destroy();
     
    }
  });
});

this.itemGroup.children.iterate(item => {
  this.Koopas.forEach(koopa => {
    if (this.physics.overlap(item, koopa)) {
      console.log('Iceball tocó a Koopa');
koopa.Iced(); 
this.Koopas = this.Koopas.filter(k => k !== koopa);
this.puntos += 200;

    }
  });

  this.fireballes.forEach(fireball => {
    if (this.physics.overlap(item, fireball)) {
      console.log('Iceball tocó a Kong');
      fireball.Die(); 
     this.fireballes = this.fireballes.filter(k => k !== fireball);
     
    }
  });
});



    this.ThrowingGroup.children.iterate(barril => {
      if (this.physics.overlap(barril, this.flores)) {
        barril.cambiarDirection(Phaser.Math.Between(-15, 15));
      }

      if (this.physics.overlap(barril, this.player) && !this.player.golpeado) {
        this.player.hurt();
      }
    });

  

    

this.Spawners.children.iterate(spawner => {
  if (this.physics.overlap(spawner, this.player) && spawner.getCreado()) {
    console.log("tocado");
    console.log(spawner.getItem());
    this.player.addItem(spawner.getItem());
  }
});


    this.kongs.forEach(kong => {
      if (this.physics.overlap(kong, this.player)) {
        kong.Die();
        this.gameOver = true;
        this.puntos += this.counter * 10;
        this.music.stop();
        this.music3.play();

        this.player.forceDeathState();

        this.time.delayedCall(2000, () => {
          if (this.music3.isPlaying) this.music3.stop();
          this.scene.start('WinScene', { puntos: this.puntos , nivel: 2 });
           this.scene.stop();
        });
      }
    });
  }

  actualizarContador() {
    this.counter--;
    this.contadorTexto.setText('Tiempo: ' + this.counter);
  }

}


export { LevelScene3 };




