//your JS code here. If required.
const output = document.getElementById("output");
const btn = document.getElementById("download-images-button");

const images = [
  { url: "https://picsum.photos/id/237/200/300" },
  { url: "https://picsum.photos/id/238/200/300" },
  { url: "https://picsum.photos/id/239/200/300" },
];
// Function to load an image and return a promise
function loadImage(image) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = image.url;

    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Failed to load image's URL: ${image.url}`));
  });
}

// Function to download and display images
function downloadAndDisplayImages() {
  // Create an array of promises for downloading the images
  const promises = images.map(image => loadImage(image));

  // Use Promise.all to download all images in parallel
  Promise.all(promises)
    .then(loadedImages => {
      // Clear any existing images
      output.innerHTML = "";

      // Display the downloaded images
      loadedImages.forEach(img => output.appendChild(img));
    })
    .catch(error => {
      // Handle any errors
      console.error(error);
    });
}

// Add click event listener to the button
btn.addEventListener("click", downloadAndDisplayImages);