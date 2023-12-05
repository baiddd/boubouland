// ColorPanel.js contains the code for the color panel
class ColorPanel {
  constructor(scene) {
    this.scene = scene;
    this.colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff']; // Example colors, you can add more

    this.createColorPanel();
  }

  createColorPanel() {
    const panelX = 10;
    const panelY = window.innerHeight - 80;
    const buttonWidth = 50;

    this.colors.forEach((color, index) => {
      const button = this.scene.add.rectangle(panelX + index * (buttonWidth + 5), panelY, buttonWidth, 50, parseInt(color, 16)).setInteractive();
      button.on('pointerdown', () => {
        this.scene.setSelectedColor(color);
      });
    });
  }
}
