const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

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
        const angle = tilt + (i * 2 * Math.PI) / petalCount + Math.sin(i) * 0.08 + (Math.random() - 0.5) * 0.08;
        const alpha = 0.82 + Math.random() * 0.18;
        drawPetalDaisy(
            ctx,
            x,
            y,
            petalLength * (0.93 + Math.random() * 0.13),
            petalWidth * (0.9 + Math.random() * 0.2),
            angle,
            "#f3f3fa", // blanc-gris très doux
            alpha
        );
    }
    // Cœur jaune pâle
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
 */
function drawDaisyStem(ctx, x, yTop, yBottom, thickness = 4, angle = 0) { // réduit l'épaisseur par défaut
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(x, yTop);
    // Légère courbure
    ctx.bezierCurveTo(
        x + Math.sin(angle) * 12, yTop + (yBottom - yTop) * 0.33, // réduit la courbure
        x - Math.sin(angle) * 12, yTop + (yBottom - yTop) * 0.66,
        x, yBottom
    );
    ctx.lineWidth = thickness;
    ctx.strokeStyle = "#6b8f6b"; // vert doux/grisé
    ctx.shadowColor = "#3d4d3d";
    ctx.shadowBlur = 5;
    ctx.stroke();
    ctx.shadowBlur = 0;
    ctx.restore();
}

// Générer plusieurs marguerites en bas du canvas
const daisyCount = 7;
const margin = width * 0.07;
const minSize = Math.min(width, height) * 0.045;
const maxSize = Math.min(width, height) * 0.07;
// abaisse les fleurs
const baseY = height * 0.94;
for (let i = 0; i < daisyCount; i++) {
    const t = i / (daisyCount - 1);
    const daisyX = margin + t * (width - 2 * margin);
    const daisySize = minSize + Math.random() * (maxSize - minSize);
    const daisyY = baseY + (Math.random() - 0.5) * 18;
    const tilt = -0.5 + Math.random() * 1.2;
    drawDaisyStem(context, daisyX, daisyY + daisySize * 0.4, height - 10, Math.max(daisySize * 0.06, 2.5), tilt); // réduit l'épaisseur
    drawDaisy(context, daisyX, daisyY, daisySize, tilt);
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
const smallMinSize = Math.min(width, height) * 0.025;
const smallMaxSize = Math.min(width, height) * 0.04;

// Redessine les marguerites plus petites
for (let i = 0; i < daisyCount; i++) {
    const t = i / (daisyCount - 1);
    const daisyX = margin + t * (width - 2 * margin);
    const daisySize = smallMinSize + Math.random() * (smallMaxSize - smallMinSize);
    // abaisse les fleurs
    const daisyY = baseY + (Math.random() - 0.5) * 18;
    const tilt = -0.5 + Math.random() * 1.2;
    drawDaisyStem(context, daisyX, daisyY + daisySize * 0.4, height - 10, Math.max(daisySize * 0.06, 2.5), tilt); // réduit l'épaisseur
    drawDaisy(context, daisyX, daisyY, daisySize, tilt);
}