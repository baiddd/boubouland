class MainMenu extends Phaser.Scene {
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
    const imageScale = Math.min(this.cameras.main.width / 800, this.cameras.main.height / 600);
    const centerX = this.cameras.main.width / 2;
    const centerY = this.cameras.main.height / 2;
    const imageGroup = this.add.group();
    const startX = centerX - 150 * imageScale;
    const startY = centerY - 150 * imageScale;
    const xOffset = 200 * imageScale;
    images.forEach((imageKey, index) => {
      const image = this.add.image(startX + index * xOffset, startY, imageKey).setInteractive();
      image.setScale(imageScale * 0.5);
      image.on('pointerdown', () => {
        this.handleImageSelection(imageKey);
      });
      imageGroup.add(image);
    });
  }
  handleImageSelection(selectedImageKey) {
    // Transition to the ColoringGameScene, passing the selected image key
    this.scene.start('Coloring', { selectedImageKey });
  }
}

export {MainMenu};