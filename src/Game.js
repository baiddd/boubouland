
import {Coloring} from './scenes/Coloring.js';
import {MainMenu} from './scenes/MainMenu.js';

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
