import { MainMenuScene } from "./MainMenuScene.js";
import { MapScene } from "./MapScene.js";
import { LevelScene1,LevelScene2,LevelScene3 } from "./LevelScene.js";
import { LoseScene } from "./Lose.js";
import { WinScene,NextScene } from "./Win.js";
import { PreloadScene } from "./PreloadScene.js";



const config = {
    type: Phaser.AUTO,
    parent: 'game',
    scale: {
        autoCenter: Phaser.Scale.CENTER_HORIZONTALLY,
        mode: Phaser.Scale.FIT,
        min: {
            width: 384,
            height: 192
        },
        max: {
            width: 768, 
            height: 384  
        },
        zoom: 2
    },
    pixelArt: true,
    physics: {
        default: 'arcade', 
        arcade: {
            gravity: { y: 300 }, 
            debug: false,
        },
    
    },
    scene: [ PreloadScene, MainMenuScene, MapScene,LevelScene1 ,LevelScene2,LevelScene3, LoseScene, WinScene,NextScene ],
    title: "Donkey Kong",
    version: "1.0.0"
};

new Phaser.Game(config);
