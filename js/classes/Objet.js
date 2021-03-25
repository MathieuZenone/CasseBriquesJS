/*
 * Classe Objet.
 * Un objet dans le cas du casse brique est défini par des coordonnées dans un plan orthonormé (x,y) 
 * et par une couleur. Par défaut il ne peut pas se déplacer.
 */
class Objet {
    
    /* position X de l'objet */
    #xPos;
    
    /* position Y de l'objet */
    #yPos;
    
    /* Couleur de l'objet */
    #couleur;
    
    /**
     * État inital d'un objet dans le jeu du casse brique
     * 
     * @param {numeric} xPos position x de l'objet
     * @param {numeric} yPos position y de l'objet
     * @param {numeric} couleur couleur de l'objet
     */
    constructor (xPos, yPos, couleur){
        this.#xPos = xPos;
        this.#yPos = yPos;
        this.#couleur = couleur;
    }

    // Getters & Setters
    get positionX(){
        return this.#xPos;
    }

    get positionY(){
        return this.#yPos;
    }

    get couleur(){
        return this.#couleur;
    }

    set positionX(x){
        this.#xPos = x;
    }

    set positionY(y){
        this.#yPos = y;
    }

    set couleur(couleur){
        this.#couleur = couleur;
    }


}