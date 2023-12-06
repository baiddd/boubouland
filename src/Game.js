import { MainMenu } from './MainMenu.js';
import { Coloring } from './Coloring.js';

// Create a Phaser game instance
const config = {
  type: Phaser.AUTO,
  scale: {
    mode: Phaser.Scale.RESIZE,
    parent: 'gameContainer',
    width: '100%',
    height: '100%',
  },
  scene: [MainMenu, Coloring]
};

const game = new Phaser.Game(config);
