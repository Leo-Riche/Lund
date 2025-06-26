const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

const width = canvas.clientWidth * 2;
const height = canvas.clientHeight * 2;
canvas.width = width;
canvas.height = height;

const backgroundGradient = context.createLinearGradient(0, 0, 0, height);
backgroundGradient.addColorStop(0, "#000010");
backgroundGradient.addColorStop(1, "#000033");

/**
 * Dessine le fond dégradé et les étoiles.
 */
function drawBackgroundAndStars() {
  context.fillStyle = backgroundGradient;
  context.fillRect(0, 0, width, height);

  // Génération des étoiles
  const starCount = 500;
  for (let i = 0; i < starCount; i++) {
    const x = Math.random() * width;
    const y = Math.random() * height;
    const radius = Math.random() * 1.2 + 0.3;
    context.beginPath();
    context.arc(x, y, radius, 0, 2 * Math.PI);
    context.fillStyle = "white";
    context.globalAlpha = Math.random() * 0.7 + 0.3;
    context.fill();
  }
  context.globalAlpha = 1;
}

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
  const missingPetals = 5 + Math.floor(Math.random() * 5); // 5 à 9 pétales manquants
  const missingIndices = new Set();
  while (missingIndices.size < missingPetals) {
    missingIndices.add(Math.floor(Math.random() * petalCount));
  }
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
 * @param {number} minSize - Taille minimale des marguerites.
 * @param {number} maxSize - Taille maximale des marguerites.
 */
function drawDaisiesBatch(minSize, maxSize) {
  const daisyCount = 7;
  // On commence à partir du tiers gauche du canvas
  const leftStart = width / 3;
  const margin = width * 0.07;
  const availableWidth = width - leftStart - margin;
  const baseY = height * 0.94;

  // Génère des espacements aléatoires
  let positions = [];
  let total = 0;
  for (let i = 0; i < daisyCount; i++) {
    const space = 1 + Math.random();
    positions.push(space);
    total += space;
  }
  // Calcule la position x de chaque fleur en fonction des espacements
  let daisyXs = [];
  let acc = 0;
  for (let i = 0; i < daisyCount; i++) {
    acc += positions[i];
    const t = acc / total;
    daisyXs.push(leftStart + margin + t * (availableWidth - margin));
  }

  for (let i = 0; i < daisyCount; i++) {
    const daisyX = daisyXs[i];
    const daisySize = minSize + Math.random() * (maxSize - minSize);
    const daisyY = baseY + (Math.random() - 0.5) * 18;
    const tilt = -0.5 + Math.random() * 1.2;
    drawDaisyStem(
      context,
      daisyX,
      daisyY,
      height,
      Math.max(daisySize * 0.06, 2.5),
      daisySize,
      tilt
    );
    drawDaisy(context, daisyX, daisyY, daisySize, tilt); // suppression du paramètre 'max 6 pétales' qui n'est pas utilisé dans drawDaisy
  }
}

/**
 * Calcule un point sur une courbe de Bézier cubique.
 * @param {number} t - Le paramètre (0 à 1) le long de la courbe.
 * @param {object} p0 - Point de départ {x, y}.
 * @param {object} p1 - Premier point de contrôle {x, y}.
 * @param {object} p2 - Deuxième point de contrôle {x, y}.
 * @param {object} p3 - Point d'arrivée {x, y}.
 * @returns {object} Le point calculé sur la courbe {x, y}.
 */
function getBezierPoint(t, p0, p1, p2, p3) {
  const x =
    Math.pow(1 - t, 3) * p0.x +
    3 * Math.pow(1 - t, 2) * t * p1.x +
    3 * (1 - t) * Math.pow(t, 2) * p2.x +
    Math.pow(t, 3) * p3.x;

  const y =
    Math.pow(1 - t, 3) * p0.y +
    3 * Math.pow(1 - t, 2) * t * p1.y +
    3 * (1 - t) * Math.pow(t, 2) * p2.y +
    Math.pow(t, 3) * p3.y;

  return { x, y };
}

/**
 * Dessine le mot "Reckless" en haut du canvas avec la police Fraktur.
 */
function drawRecklessText() {
  // Attendre que la police soit chargée
  document.fonts.ready.then(() => {
    context.save();
    context.font = "bold 90px 'UnifrakturMaguntia'"; // Ajuste la taille selon tes besoins
    context.fillStyle = "#F0F0F0"; // Blanc/gris clair
    context.textAlign = "center";
    context.textBaseline = "middle";

    const text = "Reckless";
    const textX = width / 2;
    // Positionne le texte en haut du canvas, par exemple 15% de la hauteur
    const textY = height * 0.15;

    // Ajoute une ombre pour un effet de "glow" léger
    context.shadowColor = "rgba(255, 255, 255, 0.7)";
    context.shadowBlur = 15; // Intensité du glow

    context.fillText(text, textX, textY);

    context.shadowBlur = 0; // Réinitialise l'ombre pour ne pas affecter les autres éléments
    context.restore();
  });
}

// --- Ordre de dessin de la scène ---

// 1. Dessine le fond et les étoiles
drawBackgroundAndStars();

// 2. Dessine la première série de marguerites (plus grandes)
const minSizeInitial = Math.min(width, height) * 0.032;
const maxSizeInitial = Math.min(width, height) * 0.052;
drawDaisiesBatch(minSizeInitial, maxSizeInitial);

// 3. Efface tout et redessine le fond et les étoiles pour la deuxième série (comme dans ton code original)
context.clearRect(0, 0, width, height);
drawBackgroundAndStars();

// 4. Dessine la deuxième série de marguerites (plus petites)
const smallMinSize = Math.min(width, height) * 0.018;
const smallMaxSize = Math.min(width, height) * 0.028;
drawDaisiesBatch(smallMinSize, smallMaxSize);

// 5. Dessine les courbes de Bézier
context.strokeStyle = "white";
context.lineWidth = 1;

let bezierData = {};
for (let i = 0; i < 15; i++) {
  context.beginPath();
  context.moveTo(-10, height - i * 10);
  context.bezierCurveTo(
    width / 2,
    height - (i + 10),
    width / 2,
    height - i * 100,
    width + 10,
    height - i * 20
  );
  if (i === 14) { // Utilise === pour la comparaison stricte
    bezierData = {
      p1: { x: -10, y: height - i * 10 },
      p2: { x: width / 2, y: height - (i + 10) },
      p3: { x: width / 2, y: height - i * 100 },
      p4: { x: width + 10, y: height - i * 20 },
    };
  }
  context.stroke();
}

for (let i = 0; i < 110; i++) {
  const step = i / 110;
  const startPoint = getBezierPoint(
    step,
    bezierData.p1,
    bezierData.p2,
    bezierData.p3,
    bezierData.p4
  );

  context.beginPath();
  context.moveTo(startPoint.x, startPoint.y);
  context.bezierCurveTo(
    startPoint.x * Math.random() * 30, // Ces valeurs semblent très aléatoires et peuvent donner des résultats inattendus
    startPoint.y * i,
    startPoint.x,
    startPoint.y * i,
    i * 100,
    height + 10
  );
  context.stroke();
}

// 6. Dessine le titre "Reckless"
drawRecklessText();