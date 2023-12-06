import { MainMenu } from './scenes/MainMenu.js';
import { Coloring } from './scenes/Coloring.js';

// Create a Phaser game instance
const config = {
  type: Phaser.AUTO,
  width: window.innerWidth,
  height: window.innerHeight,
  scene: [MainMenu, Coloring]
};

const game = new Phaser.Game(config);
