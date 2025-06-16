class LoseScene extends Phaser.Scene 
{
    constructor() 
    {
        super('LoseScene'); 
        
    }
     init(data) 
    {
        this.punto = data.puntos;
    }


    preload() 
    {   
      
    }

    create() 
    {
        this.add.image(this.cameras.main.width / 2,this.cameras.main.height / 2,'Lose');
       this.audio = true;
       this.puntuaciones = 0;
        var play = this.add.text(150, 100, 'Kong Escaped', {fontFamily: 'arcade_classic',fontSize: '56px',color: '#000000' });
       var play = this.add.text(150, 700, 'Back to Map', {fontFamily: 'arcade_classic',fontSize: '56px',color: '#000000' });
       play.setInteractive();
       this.puntos = this.add.text(350, 300, 'Puntos:', {fontFamily: 'arcade_classic',fontSize: '56px',color: '#000000' });
       this.puntuacion = this.add.text(350, 370, '0', {fontFamily: 'arcade_classic',fontSize: '56px',color: '#000000' });
        play.on('pointerdown', () => {
            this.scene.start('MapScene');
            this.scene.stop();
            this.music2.stop();
            this.music1.stop();
        });
        this.music1 = this.sound.add('Puntos', { loop: true, volume: 0.75 });
        this.music1.play();
        this.music2 = this.sound.add('Lose', { loop: true, volume: 0.5 });
        this.music2.play();
    }

    update(time, delta) 
    {
        if(this.audio)
            {
        if (this.puntuaciones <= this.punto)
        {
            this.puntuaciones += 5;
            this.puntuacion.setText(this.puntuaciones);
        }
        else 
        {
             this.music1.stop();
             this.audio= false
            this.puntuacion.setText(this.punto);
       
           
        }
        }

        
    }
}
export {LoseScene}