class WinScene extends Phaser.Scene 
{
    constructor() 
    {
        super('WinScene'); 
        
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
     
        this.add.image(this.cameras.main.width / 2,this.cameras.main.height / 2,'Win');
       this.audio = true;
       this.puntuaciones = 0;
       
       var play = this.add.text(350, 700, 'Leave', {fontFamily: 'arcade_classic',fontSize: '56px',color: '#6d45f7' });
       var play2 = this.add.text(150, 100, 'Happy Wedding', {fontFamily: 'arcade_classic',fontSize: '56px',color: '#6d45f7' });
       play.setInteractive();
       this.puntos = this.add.text(350, 230, 'Puntos:', {fontFamily: 'arcade_classic',fontSize: '48px',color: '#6d45f7' });
       this.puntuacion = this.add.text(350, 270, '0', {fontFamily: 'arcade_classic',fontSize: '48px',color: '#6d45f7' });
     
        play.on('pointerdown', () => {
            this.scene.start('MainScene');
            this.scene.stop();
            this.music2.stop();
            this.music1.stop();
        });
                this.music1 = this.sound.add('Puntos', { loop: true, volume: 0.75 });
        this.music1.play();
        this.music2 = this.sound.add('Win', { loop: true, volume: 0.5 });
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
export {WinScene}


class NextScene extends Phaser.Scene 
{
    constructor() 
    {
        super('NextScene'); 
        
    }
    init(data) 
    {
        this.punto = data.puntos;
        this.nivel = data.nivel;
        console.log(this.nivel);
    }


    preload() 
    {   
      
    }

    create() 
    {
      this.add.image(this.cameras.main.width / 2,this.cameras.main.height / 2,'Next');
       this.audio = true;
       this.puntuaciones = 0;
       
       var play = this.add.text(75, 600, 'Mapa', {fontFamily: 'arcade_classic',fontSize: '48px',color: '#FFA500' });
       play.setInteractive();
      var play2 = this.add.text(450, 600, 'Siguiente', {fontFamily: 'arcade_classic',fontSize: '48px',color: '#FFA500' });
       play2.setInteractive();
       this.puntos = this.add.text(325, 100, 'Puntos:', {fontFamily: 'arcade_classic',fontSize: '56px',color: '#FFA500' });
       this.puntuacion = this.add.text(350, 170, '0', {fontFamily: 'arcade_classic',fontSize: '56px',color: '#FFA500' });
     
        play.on('pointerdown', () => {
            this.scene.start('MapScene');
            this.music2.stop();
            this.music1.stop();
        });
        
       play2.on('pointerdown', () => {

            
            this.music2.stop();
            this.music1.stop();

            if (this.nivel == 1) 
                {
   this.scene.start('LevelScene2');
   this.scene.stop();
  
                }
            else
                {
 this.scene.start('LevelScene3');
  this.scene.stop();
                }
        });
        this.music1 = this.sound.add('Puntos', { loop: true, volume: 0.75 });
        this.music1.play();
        this.music2 = this.sound.add('Win', { loop: true, volume: 0.5 });
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
export {NextScene}