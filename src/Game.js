// Game.js contains the main game logic
// Create a Phaser game instance
const config = {
  type: Phaser.AUTO,
  width: window.innerWidth,
  height: window.innerHeight,
  scene: [MainMenuScene, ColoringScene]
};

const game = new Phaser.Game(config);
