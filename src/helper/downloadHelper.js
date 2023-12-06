// Function to download an image
function downloadImage(scene, canvas, filename = 'colored_image.png') {
    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png');
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
  
  // Exporting the function to be accessible from other files
  export { downloadImage };