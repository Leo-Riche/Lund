const canvasCover = document.getElementById("canvasCover");
const contextCover = canvasCover.getContext("2d");

const widthCover = canvasCover.clientWidth * 2;
const heightCover = canvasCover.clientHeight * 2;
canvasCover.width = widthCover;
canvasCover.height = heightCover;

const backgroundGradientCover = contextCover.createLinearGradient(
  0,
  0,
  0,
  heightCover
);
backgroundGradientCover.addColorStop(0, "#2a0010");
backgroundGradientCover.addColorStop(1, "#000015");

/**
 * Dessine le fond dégradé et les étoiles.
 */
function drawBackgroundAndStars() {
  contextCover.fillStyle = backgroundGradientCover;
  contextCover.fillRect(0, 0, widthCover, heightCover);

  // Génération des étoiles
  const starCount = 500;
  for (let i = 0; i < starCount; i++) {
    const x = Math.random() * widthCover;
    const y = Math.random() * heightCover;
    const radius = Math.random() * 1.2 + 0.3;
    contextCover.beginPath();
    contextCover.arc(x, y, radius, 0, 2 * Math.PI);
    contextCover.fillStyle = "white";
    contextCover.globalAlpha = 1;
    contextCover.fill();
  }
}

// drawBackgroundAndStars(); 

/**
 * Dessine un pétale de marguerite stylisé avec ombre.
 */
function drawPetalDaisy(ctx, x, y, length, width, angle, color, alpha = 1) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);
  ctx.globalAlpha = alpha;
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.bezierCurveTo(
    width * 0.3, -length * 0.2,
    width * 0.7, -length * 0.7,
    0, -length
  );
  ctx.bezierCurveTo(
    -width * 0.7, -length * 0.7,
    -width * 0.3, -length * 0.2,
    0, 0
  );
  ctx.closePath();
  ctx.fillStyle = color;
  ctx.shadowColor = "#eaeaea"; // Ajoute une ombre au pétale
  ctx.shadowBlur = 4;
  ctx.fill();
  ctx.shadowBlur = 0; // Réinitialise l'ombre
  ctx.globalAlpha = 1; // Réinitialise l'alpha
  ctx.restore();
}

/**
 * Dessine une marguerite stylisée (vue de côté).
 * Certains pétales peuvent manquer aléatoirement.
 */
function drawDaisy(ctx, x, y, size, tilt = 0) {
  // Pétales
  const petalCount = 16 + Math.floor(Math.random() * 4);
  const missingIndices = new Set();
  const petalLength = size * (1.1 + Math.random() * 0.13);
  const petalWidth = size * 0.22;

  for (let i = 0; i < petalCount; i++) {
    if (missingIndices.has(i)) continue; // On saute ce pétale
    // Légère ondulation et variation d'angle
    const angle =
      tilt +
      (i * 2 * Math.PI) / petalCount +
      Math.sin(i) * 0.08 +
      (Math.random() - 0.5) * 0.08;
    const alpha = 0.82 + Math.random() * 0.18;
    drawPetalDaisy(
      ctx,
      x,
      y,
      petalLength * (0.93 + Math.random() * 0.13),
      petalWidth * (0.9 + Math.random() * 0.2),
      angle,
      "#f3f3fa",
      alpha
    );
  }

  // Cœur de la marguerite
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(tilt);
  ctx.beginPath();
  ctx.ellipse(0, 0, size * 0.28, size * 0.19, 0, 0, 2 * Math.PI);
  ctx.fillStyle = "#d6c97a"; // jaune doux/grisé
  ctx.shadowColor = "#b3a14a";
  ctx.shadowBlur = 7;
  ctx.globalAlpha = 0.96;
  ctx.fill();
  ctx.shadowBlur = 0;
  ctx.globalAlpha = 1;
  ctx.restore();
}

/**
 * Dessine la tige de la marguerite.
 * Relie précisément le centre de la fleur (coeur jaune) à la bordure du canvas tout en bas.
 */
function drawDaisyStem(
  ctx,
  x,
  yTop,
  yBottom,
  thickness = 4,
  flowerSize = 0,
  tilt = 0
) {
  ctx.save();
  ctx.beginPath();
  // Calcul du point de départ (centre du cœur jaune, base de l'ellipse)
  const ellipseOffset = flowerSize * 0.19;
  // Décale le point de départ selon le tilt pour que la tige parte bien du bas du cœur
  const dx = Math.sin(tilt) * ellipseOffset;
  const dy = Math.cos(tilt) * ellipseOffset;
  ctx.moveTo(x + dx, yTop + dy);
  // Légère courbure
  ctx.bezierCurveTo(
    x + dx + Math.sin(tilt) * 12, // Utilise tilt pour la courbure de la tige
    yTop + dy + (yBottom - (yTop + dy)) * 0.33,
    x + dx - Math.sin(tilt) * 12, // Utilise tilt pour la courbure de la tige
    yTop + dy + (yBottom - (yTop + dy)) * 0.66,
    x,
    yBottom
  );
  ctx.lineWidth = thickness;
  ctx.strokeStyle = "#6b8f6b"; // vert doux/grisé
  ctx.shadowColor = "#3d4d3d";
  ctx.shadowBlur = 5;
  ctx.stroke();
  ctx.shadowBlur = 0;
  ctx.restore();
}

/**
 * Dessine un ensemble de marguerites avec des tailles et positions aléatoires.
 * Les marguerites sont espacées uniformément sur toute la largeur du canvas.
 * @param {number} minSize - Taille minimale des marguerites.
 * @param {number} maxSize - Taille maximale des marguerites.
 */
function drawDaisiesBatch(minSize, maxSize) {
  const daisyCount = 12;
  const margin = widthCover * 0.07;
  const availableWidth = widthCover - 2 * margin;
  const baseY = heightCover * 0.94;

  // Calcule la position x de chaque fleur pour qu'elles soient espacées uniformément
  let daisyXs = [];
  for (let i = 0; i < daisyCount; i++) {
    // Espace égal entre chaque marguerite, avec un peu de random pour éviter la rigidité
    const t = i / (daisyCount - 1);
    let x = margin + t * availableWidth;
    x += (Math.random() - 0.5) * (availableWidth / daisyCount) * 0.25; // petite variation aléatoire
    daisyXs.push(x);
  }

  for (let i = 0; i < daisyCount; i++) {
    const daisyX = daisyXs[i];
    const daisySize = minSize + Math.random() * (maxSize - minSize);
    const daisyY = baseY + (Math.random() - 0.5) * 18;
    const tilt = -0.5 + Math.random() * 1.2;
    drawDaisyStem(
      contextCover,
      daisyX,
      daisyY,
      heightCover,
      Math.max(daisySize * 0.06, 2.5),
      daisySize,
      tilt
    );
    drawDaisy(contextCover, daisyX, daisyY, daisySize, tilt);
  }
}

drawDaisiesBatch(20, 30);

function drawTexts(texts) {
  document.fonts.ready.then(() => {
    contextCover.save();
    contextCover.textAlign = "center";
    contextCover.textBaseline = "middle";
    let baseY = heightCover * 0.15;
    const lineHeight = 100; // espace entre les lignes

    texts.forEach((text, i) => {
      // Style différent pour la première ligne (titre)
      if (i === 0) {
        contextCover.font = "bold 100px 'UnifrakturMaguntia'";
        contextCover.fillStyle = "#F0F0F0";
        contextCover.shadowColor = "rgba(255, 255, 255, 0.7)";
        contextCover.shadowBlur = 15;
      } else {
        contextCover.font = "bold 50px 'UnifrakturMaguntia'";
        contextCover.fillStyle = "#F0F0F0";
        contextCover.shadowColor = "rgba(255, 255, 255, 0.5)";
        contextCover.shadowBlur = 10;
      }
      const textX = widthCover / 2;
      const textY = baseY + i * lineHeight;
      contextCover.fillText(text, textX, textY);
    });

    contextCover.shadowBlur = 0;
    contextCover.restore();
  });
}

function drawStaticBackground() {
  drawBackgroundAndStars();
  drawDaisiesBatch(20, 30);
}

drawStaticBackground();

const backgroundImageVerso = new Image();
backgroundImageVerso.src = canvasCover.toDataURL();

const shootingStarVerso = {
  x: widthCover * 0.8,
  y: heightCover * 0.1,
  length: 100,
  angle: -Math.PI / 4,
  progress: 0,
  speed: 0.02
};

function drawShootingStar(ctx, star) {
  const startX = star.x + Math.cos(star.angle) * star.length * star.progress;
  const startY = star.y + Math.sin(star.angle) * star.length * star.progress;
  const endX = startX + Math.cos(star.angle) * star.length * 0.3;
  const endY = startY + Math.sin(star.angle) * star.length * 0.3;

  const grad = ctx.createLinearGradient(startX, startY, endX, endY);
  grad.addColorStop(0, "rgba(255,255,255,0.85)");
  grad.addColorStop(0.5, "rgba(255,255,255,0.25)");
  grad.addColorStop(1, "rgba(255,255,255,0)");

  ctx.save();
  ctx.globalAlpha = 0.8;
  ctx.strokeStyle = grad;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(startX, startY);
  ctx.lineTo(endX, endY);
  ctx.stroke();
  ctx.restore();
}

function animateVerso() {
  contextCover.clearRect(0, 0, widthCover, heightCover);
  
  contextCover.drawImage(backgroundImageVerso, 0, 0, widthCover, heightCover);

  drawShootingStar(contextCover, shootingStarVerso);

  shootingStarVerso.progress -= shootingStarVerso.speed;
  if (shootingStarVerso.progress < 0) {
    shootingStarVerso.progress = 1;
    shootingStarVerso.x = Math.random() * widthCover * 0.8 + widthCover * 0.1;
    shootingStarVerso.y = Math.random() * heightCover * 0.3 + heightCover * 0.05;
    shootingStarVerso.length = 80 + Math.random() * 60;
    shootingStarVerso.angle = (-Math.PI / 4) + (Math.random() - 0.5) * 0.3;
  }

  drawTexts(["Lost and Hollow", "Broken", "F*ck Love", "Skin & Bones", "Reckless", "Low", "Issues"]);

  requestAnimationFrame(animateVerso);
}

backgroundImageVerso.onload = () => {
  animateVerso();
};
