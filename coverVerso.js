const canvasCoverCover = document.getElementById("canvasCoverCover");
const contectCover = canvasCover.getContext("2d");

const widthCover = canvasCover.clientWidth * 2;
const heightCover = canvasCover.clientHeight   * 2;
canvasCover.width = widthCover;
canvasCover.height = height;

const backgroundGradientCover = contectCover.createLinearGradient(0, 0, 0, height);
backgroundGradientCover.addColorStop(0, "#000010");
backgroundGradientCover.addColorStop(1, "#000033");

/**
 * Dessine le fond dégradé et les étoiles.
 */
function drawBackgroundAndStars() {
  contectCover.fillStyle = backgroundGradientCover;
  contectCover.fillRect(0, 0, widthCover, heightCover);

  // Génération des étoiles
  const starCount = 500;
  for (let i = 0; i < starCount; i++) {
    const x = Math.random() * widthCover;
    const y = Math.random() * heightCover;
    const radius = Math.random() * 1.2 + 0.3;
    contectCover.beginPath();
    contectCover.arc(x, y, radius, 0, 2 * Math.PI);
    contectCover.fillStyle = "white";
    contectCover.globalAlpha = Math.random() * 0.7 + 0.3;
    contectCover.fill();
  }
}

drawBackgroundAndStars();
