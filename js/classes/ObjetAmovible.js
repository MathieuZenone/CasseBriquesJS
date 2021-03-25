/*
 * Classe ObjetAmovible.
 * Un objetAmovible permet de se se déplacer dans un plan orthonormé.
 * Un ObjetAmovible est porte une vitesse, une directionX et une 
 * directionY
 */
class ObjetAmovible extends Objet{

    /* Vitesse de l'objet Amovible */
    #vitesse;

    /* Direction X de l'ObjetAmovible */
    #xDir;

    /* Direction Y de l'ObjetAmovible */
    #yDir;

    /**
     * État initial d'un objet amovible
     * 
     * @param {numeric} xPos position x de l'objet
     * @param {numeric} yPos position y de l'objet
     * @param {numeric} couleur couleur de l'objet
     * @param {Integer} vitesse vitesse de l'objet
     * @param {numeric} xDir coordonnée x du vecteur de direction de l'objet
     * @param {numeric} yDir coordonnée y du vecteur de direction de l'objet
     */
    constructor(xPos, yPos, couleur, vitesse, xDir, yDir) {
        super(xPos, yPos, couleur);
        this.#vitesse = vitesse;
        this.#xDir = xDir;
        this.#yDir = yDir;
    }

    // Getters & Setters
    get vitesse(){
        return this.#vitesse;
    }

    get directionX(){
        return this.#xDir;
    }

    get directionY(){
        return this.#yDir;
    }

    set vitesse(vitesse){
        this.#vitesse = vitesse;
    }

    set directionX(directionX){
        this.#xDir = directionX;
    }

    set directionY(directionY){
        this.#yDir = directionY;
    }

    /**
     * Calcule la nouvelle position d'un objet pour lui permettre de se déplacer
     */
    nouvellePosition(){
        this.positionX += this.#xDir  * this.#vitesse ;
        this.positionY += this.#yDir  * this.#vitesse ;
    }
}