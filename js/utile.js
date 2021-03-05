
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


