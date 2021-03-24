

// recuperation du canvas 
let canvas = document.getElementById("zoneDessin");
// recupération de la zone de dessin du canvas 
let ctx = canvas.getContext("2d");


// Declaration d'un nouveau Jeux 
let nouvellePartie = new Jeux(canvas,ctx);
//on demare la partie
nouvellePartie.jouer();
