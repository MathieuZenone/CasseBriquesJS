// Récuperation du canvas 
let canvas = document.getElementById("zoneDessin");

if ( canvas === null ) {
    throw new Error( "Aucun canvas existant avec comme identifiant 'zoneDessin'" );
}

// Récupération de la zone de dessin du canvas 
let ctx = canvas.getContext("2d");

if ( ctx === null ) {
    throw new Error( "Impossible de récupérer le context '2d' du canvas" );
}

// Déclaration d'une nouvelle partie
let jeu = new Jeu(canvas, ctx);

if ( jeu === null ) {
    throw new Error( "Erreur lors de l'instanciation de l'objet 'Jeu' ");
}

// Lancement de la partie
jeu.jouer();
