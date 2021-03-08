
/**
 * Renvoie un entier entre 0 et max
 * @param {Integer} max entier indiquant la borne supérieur de la génération
 */
function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

/** 
 * Fonction sleep qui attend ms (en milliseconde) avant de continuer
 * l'execution
 */
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


  // isLeft(): teste si un point est à gauche|sur|à droite d'une ligne infinie.
  //    Input:  3 points a, b et c
  //    Return: >0 si c est à gauche de la ligne passant par a et b
  //            =0 si c est sur la ligne
  //            <0 si c est à droite
  function isLeft(ax,ay, bx,by, px,py) {
    return ((bx-ax)*(py-ay) - (px-ax)*(by-ay) );
  }
 
  // inTriangle(): Teste si un point est inclu au triangle
  //    Input:  4 points a, b, c et P
  //    Return: true si P est inclu au triangle a,b,c
  //            false si P est strictement exclu au triangle a,b,c
  function inTriangle(ax,ay, bx,by, cx,cy, px,py) {
    return ((isLeft(ax,ay, bx,by, px,py) >= 0) && (isLeft(bx,by, cx,cy, px,py) >= 0) && (isLeft(cx,cy,ax,ay, px,py) >= 0)) ? true : false;
  }