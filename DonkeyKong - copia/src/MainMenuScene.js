class MainMenuScene extends Phaser.Scene 
{
    constructor() 
    {
        super('MainScene'); 
        
    }

    preload() 
    {   
      
    }

    create() 
    {
       this.add.image(this.cameras.main.width / 2,this.cameras.main.height / 2,'Background');
        var title = this.add.text(80, 100, 'MONKEY KONG', {fontFamily: 'arcade_classic',fontSize: '78px',color: '#FFA500' });
       var play = this.add.text(350, 400, 'JUGAR', {fontFamily: 'arcade_classic',fontSize: '56px',color: '#F19100' });
       play.setInteractive();

        play.on('pointerdown', () => {
            this.music.stop();
            this.scene.start('MapScene');
            this.scene.stop();
        });

        this.music = this.sound.add('Menu', { loop: true, volume: 0.5 });
        this.music.play();
    }

    update(time, delta) 
    {
        
    }
}
export {MainMenuScene}