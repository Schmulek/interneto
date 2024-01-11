// Create a new canvas element
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');

// Load the image
const img = new Image();
img.src = 'orzech.jpg';

img.onload = function() {
    // Set canvas dimensions to match the image
    canvas.width = img.width;
    canvas.height = img.height;

    // Draw the image on the canvas
    ctx.drawImage(img, 0, 0);

    // Get the image data (pixels)
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;

    // Define the white and gray background colors
    const whiteBackground = [255, 255, 255]; // White
    const grayBackground = [192, 192, 192]; // Gray

    // Define a tolerance level for color similarity
    const tolerance = 50;

    // Loop through the image pixels
    for (let i = 0; i < pixels.length; i += 4) {
        const r = pixels[i];
        const g = pixels[i + 1];
        const b = pixels[i + 2];

        // Check if the pixel color is similar to the white or gray background
        if (
            (
                Math.abs(r - whiteBackground[0]) <= tolerance &&
                Math.abs(g - whiteBackground[1]) <= tolerance &&
                Math.abs(b - whiteBackground[2]) <= tolerance
            ) ||
            (
                Math.abs(r - grayBackground[0]) <= tolerance &&
                Math.abs(g - grayBackground[1]) <= tolerance &&
                Math.abs(b - grayBackground[2]) <= tolerance
            )
        ) {
            // Replace the background color with transparency
            pixels[i + 3] = 0; // Set the alpha channel to 0 (transparent)
        }
    }

    // Put the modified pixel data back to the canvas
    ctx.putImageData(imageData, 0, 0);

    // To convert canvas back to an image:
    const processedImage = new Image();
    processedImage.src = canvas.toDataURL('image/png'); // You can specify the desired format

    // Append the processed image to the DOM or use it as needed
};
