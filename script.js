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