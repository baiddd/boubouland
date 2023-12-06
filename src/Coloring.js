import { ColorPanel } from './ColorPanel.js';

export class Coloring extends Phaser.Scene {
  constructor() {
    super({ key: 'Coloring' });
    this.selectedImage = null;
    this.selectedColor = '#000000';
  }

  preload() {
    // Load the selected image for coloring...
    const { selectedImage } = this.scene.settings.data;
    this.load.image(selectedImage, `img/${selectedImage}.png`);
  }

  create() {
    this.selectedImage = this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, this.scene.settings.data.selectedImage);

    // Set up color panel
    this.colorPanel = new ColorPanel(this);

    // Set up zoom in/out buttons
    this.zoomInButton = this.add.text(20, 20, '+', { fill: '#ffffff', fontSize: '24px' }).setInteractive();
    this.zoomOutButton = this.add.text(70, 20, '-', { fill: '#ffffff', fontSize: '24px' }).setInteractive();

    this.zoomInButton.on('pointerdown', () => {
      this.selectedImage.setScale(this.selectedImage.scaleX + 0.1);
    });

    this.zoomOutButton.on('pointerdown', () => {
      this.selectedImage.setScale(Math.max(0.1, this.selectedImage.scaleX - 0.1));
    });

    // Set up return to menu button
    this.returnButton = this.add.text(140, 20, 'Return to Menu', { fill: '#ffffff', fontSize: '16px' }).setInteractive();
    this.returnButton.on('pointerdown', () => {
      this.scene.start('MainMenu');
    });

    // Set up download button for colored image
    this.downloadButton = this.add.text(280, 20, 'Download Image', { fill: '#ffffff', fontSize: '16px' }).setInteractive();
    this.downloadButton.on('pointerdown', () => {
      this.downloadImage();
    });
  }

  setSelectedColor(color) {
    this.selectedColor = color;
  }

  downloadImage() {
    const canvas = this.textures.createCanvas('coloredImage', this.selectedImage.width, this.selectedImage.height);
    const ctx = canvas.getContext('2d');

    // Draw the selected image
    ctx.drawImage(this.textures.getFrame(this.selectedImage.texture.key).source.image, 0, 0);

    // Apply tint to the canvas
    ctx.fillStyle = this.selectedColor;
    ctx.globalAlpha = 0.5; // Adjust transparency if needed
    ctx.fillRect(0, 0, this.selectedImage.width, this.selectedImage.height);

    canvas.toBlob((blob) => {
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.download = 'colored_image.png';
      link.href = url;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    });
  }
}
