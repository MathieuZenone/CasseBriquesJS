

/* recuperation du canvas */
let canvas = document.getElementById("zoneDessin");
let ctx = canvas.getContext("2d");


/* Declaration du Jeux */
let nouvellePartie = new Jeux(canvas,ctx);
//on demare le jeux
nouvellePartie.jouer();
