import { MainMenuScene, ColoringScene } from './';

// Create a Phaser game instance
const config = {
  type: Phaser.AUTO,
  width: window.innerWidth,
  height: window.innerHeight,
  scene: [MainMenuScene, ColoringScene]
};

const game = new Phaser.Game(config);