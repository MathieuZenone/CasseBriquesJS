/*
 * Classe Objet, un objet est définit par des coordonnées dans un plan orthonormé (x,y) 
 * et par une couleur, un objet ne peux pas se deplacer  
 */
class Objet {
    
    /* postion X de l'objet */
    #positionX;
    
    /* postion Y de l'objet */
    #positionY;
    
    /* Couleur de l'objet */
    #couleur;
    
    
    /**
     * Constructeur de la classe Objet, instancie un objet 
     * avec une positionX ,une positionY et une couleur 
     * @param {numeric} positionX position x de l'objet
     * @param {numeric} positionY position y de l'objet
     * @param {numeric} couleur couleur de l'objet
     */
    constructor (positionX,positionY,couleur){
        this.#positionX = positionX;
        this.#positionY = positionY;
        this.#couleur = couleur;
    }



    get positionX(){
        return this.#positionX;
    }

    get positionY(){
        return this.#positionY;
    }

    get couleur(){
        return this.#couleur;
    }

    set positionX(x){
        this.#positionX = x;
    }

    set positionY(y){
        this.#positionY = y;
    }

    set couleur(couleur){
        this.#couleur = couleur;
    }


}