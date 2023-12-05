// MainMenuScene.js contains code for the main menu scene
export class MainMenuScene extends Phaser.Scene {
  constructor() {
    super({ key: 'MainMenuScene' });
  }

  preload() {
    // Preload your images
    this.load.image('background', 'img/bckg.jpg');
    this.load.image('lion', 'img/lion.png');
    this.load.image('cat', 'img/cat.png');
    // Add more images as needed
  }

  create() {
    const background = this.add.image(window.innerWidth / 2, window.innerHeight / 2, 'background');

    const imageKeys = ['lion', 'cat']; // Add more image keys here

    // ... (code for creating gallery of images and handling image selection)
  }
}
