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
    const imageScale = 0.4;
    const imageSpacing = 150;

    images.forEach((imageKey, index) => {
      const xPos = this.cameras.main.width * (index + 1) * 0.25;
      const image = this.add.image(xPos, this.cameras.main.centerY, imageKey).setScale(imageScale).setInteractive();

      image.on('pointerdown', () => {
        this.scene.start('Coloring', { selectedImage: imageKey });
      });
    });
  }
}
