
/*
 * Les Briques sont des Objet caractérisé par une hauteur, une largeur et une vie 
 * Les Briques sont déstiné à etre detruit lors de l'impacte d'une ou plusieurs balles
 */
class Brique extends Objet{
    /* Hauteur de la Brique */
    #hauteur;

    /* Largeur de la Brique */
    #largeur;

    /* Vie de la brique */
    #vie;

    /**
     * Constructeur initialisant uen brique avec une largeur
     * une hauteur et un nombre de vie 
     */
    constructor(positionX,positionY,couleur,hauteur,largeur,vie){
        super(positionX,positionY,couleur);
        this.#hauteur = hauteur;
        this.#largeur = largeur;
        this.#vie = vie;
    }

    get hauteur(){
        return this.#hauteur;
    }

    get largeur(){
        return this.#largeur;
    }

    get vie(){
        return this.#vie;
    }

    set hauteur(hauteur){
        this.#hauteur = hauteur;
    }

    set largeur(largeur){
        this.#largeur;
    }

    set vie(vie){
        this.#vie = vie;
    }

}