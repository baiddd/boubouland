const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  scene: {
    preload: preload,
    create: create
  }
};

const game = new Phaser.Game(config);

let selectedImage; // Reference to the selected image
let zoomLevel = 1; // Initial zoom level
let zoomInButton;
let zoomOutButton;

function preload() {
  // Load your images
  this.load.image('background', 'img/bckg.jpg');
  this.load.image('image1', 'img/lion.png');
  this.load.image('image2', 'img/cat.png');
  // Add more images as needed
}

function create() {
  // Add the background image
  const background = this.add.image(400, 300, 'background');

  // Create an array of image keys
  const imageKeys = ['image1', 'image2']; // Add more image keys here

  // Calculate position and display images in a gallery
  const startX = 100;
  const startY = 150;
  const xOffset = 200;
  const yOffset = 200;

  for (let i = 0; i < imageKeys.length; i++) {
    const image = this.add.image(startX + i * xOffset, startY, imageKeys[i]).setInteractive();
    image.setScale(0.5); // Adjust the scale of images if needed
    image.setOrigin(0.5, 0.5);

    image.on('pointerdown', function() {
      selectedImage = image;
      selectedImage.setScale(zoomLevel); // Set initial scale
      startColoringScene.call(this);
      createZoomButtons.call(this);
    }, this);
  }
}

function startColoringScene() {
  // Clear the current scene
  this.scene.remove('coloring');

  // Create a new scene for coloring the selected image
  const coloringScene = this.scene.add('coloring', coloringSceneFunctions, true);
}

function createZoomButtons() {
  zoomInButton = this.add.text(700, 50, '+', { fill: '#ffffff', fontSize: '24px' }).setInteractive();
  zoomOutButton = this.add.text(750, 50, '-', { fill: '#ffffff', fontSize: '24px' }).setInteractive();

  zoomInButton.on('pointerdown', function() {
    zoomLevel += 0.1;
    selectedImage.setScale(zoomLevel);
  });

  zoomOutButton.on('pointerdown', function() {
    zoomLevel -= 0.1;
    if (zoomLevel < 0.1) {
      zoomLevel = 0.1;
    }
    selectedImage.setScale(zoomLevel);
  });
}

const coloringSceneFunctions = {
  preload: function() {
    this.load.image(selectedImage.texture.key, 'img/' + selectedImage.texture.key + '.png');
  },
  create: function() {
    selectedImage = this.add.image(400, 300, selectedImage.texture.key);
    selectedImage.setScale(zoomLevel);
    selectedImage.setInteractive();

    selectedImage.on('pointerdown', function(pointer) {
      const x = pointer.x;
      const y = pointer.y;
      const pixelColor = this.textures.getPixel(x, y, selectedImage.texture.key);

      if (pixelColor.a !== 0) {
        selectedImage.tint = pixelColor.color;
      }
    }, this);

    createZoomButtons.call(this);
  }
};
