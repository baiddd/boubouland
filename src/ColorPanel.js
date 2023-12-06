export class Coloring extends Phaser.Scene {
  constructor(scene) {
    this.scene = scene;
    this.colors = [
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

    this.createColorPanel();
  }

  createColorPanel() {
    const panelX = 20;
    const panelY = this.scene.sys.game.config.height - 80;
    const buttonWidth = 30;
    const buttonHeight = 30;
    const spacing = 5;
    const columns = 12;

    let row = 0;
    let col = 0;

    this.colors.forEach((color, index) => {
      const x = panelX + col * (buttonWidth + spacing);
      const y = panelY + row * (buttonHeight + spacing);

      const button = this.scene.add.rectangle(x, y, buttonWidth, buttonHeight, parseInt(color.replace('#', '0x')));
      button.setInteractive();
      button.on('pointerdown', () => {
        this.scene.setSelectedColor(color);
      });

      col++;
      if (col === columns) {
        col = 0;
        row++;
      }
    });
  }
}
