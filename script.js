const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

// On récupère les dimensions de l'élément canvas HTML
const width = canvas.clientWidth * 2;
const height = canvas.clientHeight * 2;

// On applique ces dimensions au canvas
canvas.width = width;
canvas.height = height;

// Dégradé de fond (bleu foncé vers noir)
const gradient = context.createLinearGradient(0, 0, 0, height);
gradient.addColorStop(0, "#000010");
gradient.addColorStop(1, "#000033");
context.fillStyle = gradient;
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

/**
 * Dessine un pétale de marguerite stylisé
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
    ctx.fill();
    ctx.globalAlpha = 1;
    ctx.restore();
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);
  ctx.globalAlpha = alpha;
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.bezierCurveTo(
    width * 0.3,
    -length * 0.2,
    width * 0.7,
    -length * 0.7,
    0,
    -length
  );
  ctx.bezierCurveTo(
    -width * 0.7,
    -length * 0.7,
    -width * 0.3,
    -length * 0.2,
    0,
    0
  );
  ctx.closePath();
  ctx.fillStyle = color;
  ctx.shadowColor = "#eaeaea";
  ctx.shadowBlur = 4;
  ctx.fill();
  ctx.shadowBlur = 0;
  ctx.globalAlpha = 1;
  ctx.restore();
}

/**
 * Dessine une marguerite stylisée (vue de côté)
 * Certains pétales peuvent manquer aléatoirement.
 */
function drawDaisy(ctx, x, y, size, tilt = 0) {
    // Pétales
    const petalCount = 16 + Math.floor(Math.random() * 4);
    // Augmente le nombre de pétales manquants : 8 à 13 pétales manquants
    const missingPetals = 8 + Math.floor(Math.random() * 6); // 8 à 13 pétales manquants
    // Génère un set d'indices de pétales à ne pas dessiner
    const missingIndices = new Set();
    while (missingIndices.size < missingPetals) {
        missingIndices.add(Math.floor(Math.random() * petalCount));
    }
    const petalLength = size * (1.1 + Math.random() * 0.13);
    const petalWidth = size * 0.22;
    for (let i = 0; i < petalCount; i++) {
        if (missingIndices.has(i)) continue; // On saute ce pétale
        // Légère ondulation et variation d'angle
        const angle = tilt + (i * 2 * Math.PI) / petalCount + Math.sin(i) * 0.08 + (Math.random() - 0.5) * 0.08;
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
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(tilt);
    ctx.beginPath();
    ctx.ellipse(0, 0, size * 0.28, size * 0.19, 0, 0, 2 * Math.PI);
    ctx.fillStyle = "#d6c97a";
    ctx.globalAlpha = 0.96;
    ctx.fill();
    ctx.globalAlpha = 1;
    ctx.restore();
  // Pétales
  const petalCount = 16 + Math.floor(Math.random() * 4);
  // Augmente le nombre de pétales manquants : 5 à 9 pétales manquants
  const missingPetals = 5 + Math.floor(Math.random() * 5); // 5 à 9 pétales manquants
  // Génère un set d'indices de pétales à ne pas dessiner
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
 * Dessine la tige de la marguerite
 * Relie précisément le centre de la fleur (coeur jaune) à la bordure du canvas tout en bas.
 */
function drawDaisyStem(ctx, x, yTop, yBottom, thickness = 4, angle = 0, flowerSize = 0, tilt = 0) {
    ctx.save();
    ctx.beginPath();
    // Calcul du point de départ (centre du coeur jaune, base de l'ellipse)
    // Le coeur jaune est une ellipse de rayon vertical size*0.19, donc on part de yTop + size*0.19 (ajusté pour le tilt)
    const ellipseOffset = flowerSize * 0.19;
    // Décale le point de départ selon le tilt pour que la tige parte bien du bas du coeur
    const dx = Math.sin(tilt) * ellipseOffset;
    const dy = Math.cos(tilt) * ellipseOffset;
    ctx.moveTo(x + dx, yTop + dy);
    // Légère courbure
    ctx.bezierCurveTo(
        x + dx + Math.sin(angle) * 12, yTop + dy + (yBottom - (yTop + dy)) * 0.33,
        x + dx - Math.sin(angle) * 12, yTop + dy + (yBottom - (yTop + dy)) * 0.66,
        x, yBottom
    );
    ctx.lineWidth = thickness;
    ctx.strokeStyle = "#6b8f6b"; // vert doux/grisé
    // Suppression du glow :
    // ctx.shadowColor = "#3d4d3d";
    // ctx.shadowBlur = 5;
    ctx.stroke();
    // ctx.shadowBlur = 0;
    ctx.restore();
function drawDaisyStem(
  ctx,
  x,
  yTop,
  yBottom,
  thickness = 4,
  angle = 0,
  flowerSize = 0,
  tilt = 0
) {
  ctx.save();
  ctx.beginPath();
  // Calcul du point de départ (centre du coeur jaune, base de l'ellipse)
  // Le coeur jaune est une ellipse de rayon vertical size*0.19, donc on part de yTop + size*0.19 (ajusté pour le tilt)
  const ellipseOffset = flowerSize * 0.19;
  // Décale le point de départ selon le tilt pour que la tige parte bien du bas du coeur
  const dx = Math.sin(tilt) * ellipseOffset;
  const dy = Math.cos(tilt) * ellipseOffset;
  ctx.moveTo(x + dx, yTop + dy);
  // Légère courbure
  ctx.bezierCurveTo(
    x + dx + Math.sin(angle) * 12,
    yTop + dy + (yBottom - (yTop + dy)) * 0.33,
    x + dx - Math.sin(angle) * 12,
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

// Générer plusieurs marguerites en bas du canvas avec espacement aléatoire
const daisyCount = 7;
// On commence à partir du tiers gauche du canvas
const leftStart = width / 3;
const margin = width * 0.07;
const availableWidth = width - leftStart - margin;
// Diminue la longueur des pétales en réduisant minSize et maxSize
const minSize = Math.min(width, height) * 0.032;
const maxSize = Math.min(width, height) * 0.052;
const baseY = height * 0.94;

// Génère des espacements aléatoires
let positions = [];
let total = 0;
for (let i = 0; i < daisyCount; i++) {
  // Espacement aléatoire entre 1 et 2 (peut ajuster selon l'effet désiré)
  const space = 1 + Math.random();
  positions.push(space);
  total += space;
}
// Calcule la position x de chaque fleur en fonction des espacements
let daisyXs = [];
let acc = 0;
for (let i = 0; i < daisyCount; i++) {
  acc += positions[i];
  // Normalise pour que les fleurs soient réparties entre leftStart+margin et width-margin
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
    tilt,
    daisySize,
    tilt
  );
  drawDaisy(context, daisyX, daisyY, daisySize, tilt, 6); // max 6 pétales
}
/*
 * Rétrécit les marguerites en réduisant minSize et maxSize puis redessine la scène.
 */

// Efface les marguerites existantes
context.clearRect(0, 0, width, height);

// Redessine le fond étoilé
context.fillStyle = gradient;
context.fillRect(0, 0, width, height);
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

// Nouvelles tailles plus petites
const smallMinSize = Math.min(width, height) * 0.018;
const smallMaxSize = Math.min(width, height) * 0.028;

// Génère de nouveaux espacements aléatoires pour les petites marguerites
positions = [];
total = 0;
for (let i = 0; i < daisyCount; i++) {
  const space = 1 + Math.random();
  positions.push(space);
  total += space;
}
daisyXs = [];
acc = 0;
for (let i = 0; i < daisyCount; i++) {
  acc += positions[i];
  const t = acc / total;
  daisyXs.push(leftStart + margin + t * (availableWidth - margin));
}

// Redessine les marguerites plus petites avec espacement aléatoire
for (let i = 0; i < daisyCount; i++) {
  const daisyX = daisyXs[i];
  const daisySize =
    smallMinSize + Math.random() * (smallMaxSize - smallMinSize);
  const daisyY = baseY + (Math.random() - 0.5) * 18;
  const tilt = -0.5 + Math.random() * 1.2;
  drawDaisyStem(
    context,
    daisyX,
    daisyY,
    height,
    Math.max(daisySize * 0.06, 2.5),
    tilt,
    daisySize,
    tilt
  );
  drawDaisy(context, daisyX, daisyY, daisySize, tilt, 6);
}

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
  if (i == 14) {
    bezierData = {
      p1: { x: -10, y: height - i * 10 },
      p2: { x: width / 2, y: height - (i + 10) },
      p3: { x: width / 2, y: height - i * 100 },
      p4: { x: width + 10, y: height - i * 20 },
    };
  }

  context.stroke();
}

for (let i = 0; i < 70; i++) {
  const step = i / 70;
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
    startPoint.x,
    startPoint.y * i,
    startPoint.x,
    startPoint.y * i,
    i * 100,
    height + 10
  );
  context.stroke();
}

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
