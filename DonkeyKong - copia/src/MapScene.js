class MapScene extends Phaser.Scene {
    constructor() {
        super('MapScene');

        // Propiedades que usaremos en varios métodos
        this.level = 1;
        this.posX1 = 470;
        this.posX2 = 690;
        this.posX3 = 480;
        this.posY1 = 530;
        this.posY2 = 390;
        this.posY3 = 190;
    }

    preload()
    {
       
    }

    create() {
        this.add.image(this.cameras.main.width / 2,this.cameras.main.height / 2,'mapa');
        this.level1 = this.add.image(this.posX1, this.posY1, 'nivel');
        this.level2 = this.add.image(this.posX2, this.posY2, 'nivel');
        this.level3 = this.add.image(this.posX3, this.posY3, 'nivel');

        this.player = this.add.sprite(this.posX1, this.posY1 - 20, 'player', 3);

        const title = this.add.text(365, 600, 'Main Menu', { fontFamily: 'arcade_classic', fontSize: '32px', color: '#FFA500' });
        title.setInteractive();
        title.on('pointerdown', () => {
            this.music.stop();
            this.scene.start('MainScene');
        });

        this.keys = this.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.W,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            space: Phaser.Input.Keyboard.KeyCodes.SPACE,
        });

        this.music = this.sound.add('Mapa', { loop: true, volume: 0.5 });
        this.music.play();
    }

 update() {
    if (Phaser.Input.Keyboard.JustDown(this.keys.up)) 
        {
        if (this.level === 1) {
            this.player.setPosition(this.posX2, this.posY2 -20);
            console.log('Mover a nivel 2');
            this.level++;
        } else if (this.level === 2) {
            this.player.setPosition(this.posX3, this.posY3-20);
            console.log('Mover a nivel 3');
            this.level++;
        }
        } 
    else if (Phaser.Input.Keyboard.JustDown(this.keys.down)) 
        {
        if (this.level === 3) {
            this.level--;
            this.player.setPosition(this.posX2, this.posY2-20);
            console.log('Volver a nivel 2');
        } else if (this.level === 2) {
            this.player.setPosition(this.posX1, this.posY1-20);
            console.log('Volver a nivel 1');
            this.level--;
        }
        }
    else if (Phaser.Input.Keyboard.JustDown(this.keys.space))
        {
             this.music.stop();
            if (this.level == 1) 
                {
                    this.scene.start('LevelScene1');
                    this.scene.stop();
                }
           else if (this.level == 2) 
                {
                    this.scene.start('LevelScene2');
                     this.scene.stop();
                }
                else 
                 {
                    this.scene.start('LevelScene3');
                     this.scene.stop();
                }
        }
}

}

export { MapScene };