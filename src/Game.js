import { MainMenu } from './scenes/MainMenu.js';
import { Coloring } from './scenes/Coloring.js';

// Create a Phaser game instance

const config = {
  type: Phaser.AUTO,
  width: window.innerWidth,
  height: window.innerHeight,
  scale: {
    mode: Phaser.Scale.RESIZE,
    autoCenter: Phaser.Scale.CENTER_BOTH
  },
  scene: [MainMenu, Coloring],
  // Other configuration options...
};

const game = new Phaser.Game(config);
game.scene.add('MainMenu', MainMenu);
game.scene.add('ColoringGame', ColoringGame);

// Start the main menu scene
game.scene.start('MainMenu');
