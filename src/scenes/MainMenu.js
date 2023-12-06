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
        this.scene.start('Coloring', { selectedImage: imageKey });
      });
      imageGroup.add(image);
      this.input.on('wheel', (pointer, currentlyOver, dx, dy, dz, event) => {
        if (this.input.pointer1.isDown && this.input.pointer2.isDown) {
          const distance = Phaser.Math.Distance.Between(this.input.pointer1.x, this.input.pointer1.y, this.input.pointer2.x, this.input.pointer2.y);
          if (distance > 10) {
            // Adjust the scale of images based on the pinch gesture
            const newScale = image.scaleX + dy * 0.001;
            image.setScale(Math.min(Math.max(newScale, 0.2), 2)); // Limit the scale
          }
        }
      });
  
        // Handle mouse wheel event for pinch-to-zoom on computers
      this.input.on('wheel', (pointer, gameObjects, deltaX, deltaY, deltaZ) => {
        const mouseWheel = this.input.mousePointer;
        if (mouseWheel.wheelDeltaY() > 0) {
          // Zoom in
          const newScale = image.scaleX * 1.1;
          image.setScale(Math.min(Math.max(newScale, 0.2), 2)); // Limit the scale
        } else {
          // Zoom out
          const newScale = image.scaleX * 0.9;
          image.setScale(Math.min(Math.max(newScale, 0.2), 2)); // Limit the scale
        }
      });
    });
  }

}

export {MainMenu};