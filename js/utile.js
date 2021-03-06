
/**
 * Renvoie un entier entre 0 et max
 * @param {Integer} max entier indiquant la borne supérieure de la génération
 * @return {Integer} le nombre généré
 */
function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

/**
 * Fonction sleep qui attend ms (en millisecondes) avant de continuer
 * l'éxécution 
 * 
 * @param {Integer} ms temps en millisecondes à attendre
 * 
 * @return {Promise} : retourne l'objet promise après un temps d'attente
 */
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}



/**
 * Fonction renvoyant un delta sur l'equation polynomiale de degré 2
 * de l'intersection entre un cercle et un segment 
 * si le delta est inférieure à 0 il n'y a pas de point d'intersection
 *  0 -> 1 point d'intersection
 *  0 -> plusieurs point d'intersection
 * 
 * @param {Integer} cercleY coordonné y du cercle
 * @param {Integer} cercleX coordonné x du cercle
 * @param {Integer} cercleRayon rayon du cercle
 * @param {Integer} x1 coordonné x du premier point
 * @param {Integer} y1 coordonné y du second point
 * @param {Integer} x2 coordonné x du premier point
 * @param {Integer} y2 coordonné y du second point
 * 
 * @return {Integer} retourne le delta de l'equation
 */
function delta(cercleY, cercleX, cercleRayon, x1 ,y1 , x2, y2) {
  let delta;
  let A,B,C;
  let a,b,x;

  // On détermine l'équation de type a(x*x) + b*x + c = 0
  if (x1 != x2) {    
    a = coefficientDirecteur(x1 ,y1 , x2, y2);
    b = y1 - a*x1;

    A = 1 + (a*a);
    B = 2 * (a * (b - cercleY) - cercleX);
    C = (cercleX * cercleX) + ((b-cercleY)*(b-cercleY)) - (cercleRayon * cercleRayon);
  } else { // Dans le cas où on a une équation x = lamda
    a = 1;
    b = 0;
    x = x1;
    C = ((x - cercleX)*(x - cercleX))+((-1*cercleY)*(-1*cercleY))- (cercleRayon * cercleRayon);
    B = 2 * cercleY * -1;
    A = 1;
  }
    
  delta = B * B - 4 * A * C; // détermination du delta

  return delta;
}

/**
 * Fonction qui renvoie le a de l'équation y =ax + b
 * à partir de 2 point
 *
 * @param {Integer} x1 coordonné x du premier point
 * @param {Integer} y1 coordonné y du second point
 * @param {Integer} x2 coordonné x du premier point
 * @param {Integer} y2 coordonné y du second point
 * 
 * @return {Integer} coefficient directeur de la droite des 2 points
 */
function coefficientDirecteur(x1 ,y1 , x2, y2) {
  return (y2 - y1) / (x2 - x1);
}
