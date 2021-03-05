/*
 * Classe ObjetAmovible, cette classe définit un objet pouvant se deplacer 
 * dans un plan orthonormé. Cette classe est une classe fille de Objet.
 * Un ObjetAmovible est définit par une vitesse, une directionX et une 
 * directionY
 */
class ObjetAmovible extends Objet{

    /* Vitesse de l'objet Amovible */
    #vitesse;

    /* Direction X de l'ObjetAmovible */
    #directionX;

    /* Direction Y de l'ObjetAmovible */
    #directionY;

    /* 
     * Constructeur initialisant un ObjetAmovible avec une vitesse
     * Une directionX et une directionY
     */
    constructor(positionX,positionY,couleur,vitesse,directionX,directionY){
        super(positionX,positionY,couleur);
        this.#vitesse = vitesse;
        this.#directionX = directionX;
        this.#directionY = directionY;
    }


    get vitesse(){
        return this.#vitesse;
    }

    get directionX(){
        return this.#directionX;
    }

    get directionY(){
        return this.#directionY;
    }

    set vitesse(vitesse){
        this.#vitesse = vitesse;
    }

    set directionX(directionX){
        this.#directionX = directionX;
    }

    set directionY(directionY){
        this.#directionY = directionY;
    }



    nouvelPosition(){
      
        this.positionX += this.#directionX  * this.#vitesse ;
        this.positionY += this.#directionY  * this.#vitesse ;

    }
}