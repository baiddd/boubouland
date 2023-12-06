class Coloring extends Phaser.Scene {
  constructor() {
    super({ key: 'Coloring' });
    this.selectedImage = null;
    this.selectedColor = '#000000';
    this.zoomLevel = 1.0;
    this.image = null;
    this.imageWidth = 0;
    this.imageHeight = 0;
  }

  preload() {
    const { selectedImage } = this.scene.settings.data;
    this.load.image(selectedImage, `img/${selectedImage}.png`);
  }

  create() {
    this.image = this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, this.scene.settings.data.selectedImage);
    this.imageWidth = this.image.displayWidth;
    this.imageHeight = this.image.displayHeight;
    this.adjustImageSize(this.selectedImage);
      
    // Set up input events
      
    this.input.on('pointerdown', this.startDrawing, this);
    this.input.on('pointermove', this.continueDrawing, this);
    this.input.on('pointerup', this.stopDrawing, this);

    // Implement color panel UI at the bottom for color selection
    this.createColorPanel();
    this.createUIButtons();

    this.input.on('wheel', (pointer, gameObjects, deltaX, deltaY, deltaZ) => {
      const zoomAmount = 0.1; // Adjust zoom speed as needed
      if (deltaY > 0) {
        // Zoom out when scrolling down
        this.adjustImageSize(coloringImage, -zoomAmount);
      } else {
        // Zoom in when scrolling up
        this.adjustImageSize(coloringImage, zoomAmount);
      }
    });
  }

  createColorPanel() {
    this.colorPanel = this.add.graphics();
    this.colorPanel.fillStyle(0x000000, 1);
    this.colorPanel.fillRect(0, this.cameras.main.height - 80, this.cameras.main.width, 80);
    const colors = [
      '#000000', '#808080', '#C0C0C0', '#FFFFFF', '#FF0000', '#800000', '#FFFF00', '#808000',
      '#00FF00', '#008000', '#00FFFF', '#008080', '#0000FF', '#000080', '#FF00FF', '#800080',
      '#FFA500', '#FFD700', '#FFFFE0', '#F0E68C', '#7FFF00', '#ADFF2F', '#228B22', '#008000',
      '#00FF7F', '#7CFC00', '#20B2AA', '#87CEEB', '#ADD8E6', '#87CEFA', '#6495ED', '#0000CD',
      '#191970', '#7B68EE', '#6A5ACD', '#483D8B', '#FA8072', '#FF69B4', '#FFC0CB', '#FFB6C1',
      '#DB7093', '#FFA07A', '#FF7F50', '#FF6347', '#FF4500', '#FF8C00', '#FFA500', '#FFD700',
      '#FFFF00', '#ADFF2F', '#7FFF00', '#7CFC00', '#00FF00', '#32CD32', '#008000', '#008B8B',
      '#00FFFF', '#00CED1', '#1E90FF', '#0000FF', '#000080', '#8A2BE2', '#9400D3', '#800080',
      '#FF1493', '#C71585', '#FF00FF', '#FF69B4', '#DB7093', '#FFE4E1', '#FFDAB9', '#FFE4B5',
      '#FFDEAD', '#FFA07A', '#FAF0E6', '#FAEBD7', '#FFEFD5', '#FFEBCD', '#FFE4C4', '#FFDAB9',
      '#EEE8AA', '#F0E68C', '#BDB76B', '#FFC0CB', '#FFB6C1', '#FF69B4', '#FF1493', '#DB7093',
      '#C71585', '#9370DB', '#7B68EE', '#6A5ACD', '#483D8B', '#4169E1', '#0000FF', '#0000CD',
      '#00008B', '#000080', '#191970', '#7B68EE', '#6A5ACD', '#483D8B', '#E9967A', '#FA8072',
      '#F08080', '#CD5C5C', '#DC143C', '#B22222', '#FF0000', '#8B0000', '#BC8F8F', '#F4A460',
      '#DAA520', '#B8860B', '#CD853F', '#D2691E', '#8B4513', '#A0522D', '#CD853F', '#DEB887'
    ]; // Array of various color hex codes
    for (let i = 0; i < colors.length; i++) {
      const colorButton = this.add.graphics();
      colorButton.fillStyle(colors[i], 1);
      colorButton.fillRect(30 + i * 60, this.cameras.main.height - 60, 50, 50);

      colorButton.setInteractive(new Phaser.Geom.Rectangle(0, 0, 50, 50), Phaser.Geom.Rectangle.Contains);
      colorButton.on('pointerdown', () => {
        this.colorSelected = colors[i];
      });
    }
  }
  createUIButtons() {
    // Button to return to the main menu
    const backButton = this.add.text(20, 20, 'Back to Menu', { fontSize: '24px', fill: '#fff' });
    backButton.setInteractive();
    backButton.on('pointerdown', () => {
      this.scene.start('MainMenu');
    });

    const downloadButton = this.add.text(20, 50, 'Download Image', { fontSize: '24px', fill: '#fff' });
    downloadButton.setInteractive();
    downloadButton.on('pointerdown', () => {
      downloadImage(this, canvas);
    });

    // Zoom buttons
    const zoomInButton = this.add.text(this.cameras.main.width - 100, 20, 'Zoom In', { fontSize: '24px', fill: '#fff' });
    zoomInButton.setInteractive();
    zoomInButton.on('pointerdown', () => {
      this.zoomLevel += 0.1;
      this.image.setScale(this.zoomLevel);
    });

    const zoomOutButton = this.add.text(this.cameras.main.width - 200, 20, 'Zoom Out', { fontSize: '24px', fill: '#fff' });
    zoomOutButton.setInteractive();
    zoomOutButton.on('pointerdown', () => {
      if (this.zoomLevel > 0.1) {
        this.zoomLevel -= 0.1;
        this.image.setScale(this.zoomLevel);
      }
    });
  }

  startDrawing(pointer) {
    // Start drawing when the pointer is down
    this.image.setTexture('coloringImage');
    this.image.getPixel(pointer.x, pointer.y, this.colorSelected);
  }
  continueDrawing(pointer) {
    // Continue drawing while the pointer is moving
    if (pointer.isDown) {
      this.image.getPixel(pointer.x, pointer.y, this.colorSelected);
    }
  }

  stopDrawing() {
    // Stop drawing when the pointer is up
  }
  downloadImage(canvas, filename = 'colored_image.png') {
    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png');
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  // Other methods for handling zooming, coloring logic, etc.
}

export { Coloring };