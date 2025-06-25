const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

// On récupère les dimensions de l'élément canvas  HTML
const width = canvas.clientWidth * 2;
const height = canvas.clientHeight * 2;

// On applique ces dimensions au canvas
canvas.width = width;
canvas.height = height;