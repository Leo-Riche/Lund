const canvasCover = document.getElementById("canvasCover");
const contectCover = canvasCover.getContext("2d");

const widthCover = canvasCover.clientWidth * 2;
const heightCover = canvasCover.clientHeight * 2;
canvasCover.width = widthCover;
canvasCover.height = height;

const backgroundGradientCover = contectCover.createLinearGradient(
  0,
  0,
  0,
  height
);
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
    contectCover.globalAlpha = 1;
    contectCover.fill();
  }
}

drawBackgroundAndStars();

function drawTexts(texts) {
  document.fonts.ready.then(() => {
    contectCover.save();
    contectCover.textAlign = "center";
    contectCover.textBaseline = "middle";
    let baseY = heightCover * 0.15;
    const lineHeight = 100; // espace entre les lignes

    texts.forEach((text, i) => {
      // Style différent pour la première ligne (titre)
      if (i === 0) {
        contectCover.font = "bold 100px 'UnifrakturMaguntia'";
        contectCover.fillStyle = "#F0F0F0";
        contectCover.shadowColor = "rgba(255, 255, 255, 0.7)";
        contectCover.shadowBlur = 15;
      } else {
        contectCover.font = "bold 50px 'UnifrakturMaguntia'";
        contectCover.fillStyle = "#F0F0F0";
        contectCover.shadowColor = "rgba(255, 255, 255, 0.5)";
        contectCover.shadowBlur = 10;
      }
      const textX = widthCover / 2;
      const textY = baseY + i * lineHeight;
      contectCover.fillText(text, textX, textY);
    });

    contectCover.shadowBlur = 0;
    contectCover.restore();
  });
}

// Exemple d'utilisation :
drawTexts(["Lost adn Hollow", "Broken", "F*ck Love", "Skin & Bones", "Reckless", "Low", "Issues"]);