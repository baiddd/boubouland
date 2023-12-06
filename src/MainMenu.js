export class MainMenu extends Phaser.Scene {
  constructor() {
    super({ key: 'MainMenu' });
  }

  preload() {
    // Preload your images...
    this.load.image('lion', 'img/lion.png');
    this.load.image('cat', 'img/cat.png');
    this.load.image('kawaii02', 'img/kawaii02.png');
    // Add more images as needed
  }

  create() {
    const images = ['lion', 'cat', 'kawaii02']; // Add more image keys here
    const imageScale = 0.5;
    const imageSpacing = 150;

    images.forEach((imageKey, index) => {
      const xPos = (index + 1) * imageSpacing;
      const image = this.add.image(xPos, this.cameras.main.centerY, imageKey).setScale(imageScale).setInteractive();

      image.on('pointerdown', () => {
        this.scene.start('Coloring', { selectedImage: imageKey });
      });
    });
  }
}
