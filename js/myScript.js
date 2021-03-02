/* Declaration de la class de la balle */
class Obj {
    #positionX;
    #positionY;
    #vitesse;
    #direction;
    
    constructor (positionX,positionY,vitesse,direction){
        this.#positionX = positionX;
        this.#positionY = positionY;
        this.#vitesse = vitesse;
        this.#direction = direction;
    }

    getX(){
        return this.#positionX;
    }

    getY(){
        return this.#positionY;
    }

    getVitesse(){
        return this.#vitesse;
    }

    getDirection(){
        return this.#direction;
    }

}

class Balle extends Obj {

    #rayon;

    constructor(positionX,positionY,vitesse,direction,rayon){
        super(positionX,positionY,vitesse,direction,rayon);
        this.#rayon = rayon;
    }

    getRayon(){
        return this.#rayon;
    }

}

class Brique extends Obj{
    #hauteur;
    #largeur;
    #vie;

    constructor(positionX,positionY,vitesse,direction,hauteur,largeur,vie){
        super(positionX,positionY,vitesse,direction,rayon);
        this.#hauteur = hauteur;
        this.#largeur = largeur;
        this.#vie = vie;
    }

    getHauteur(){
        return this.#hauteur;
    }

    getLargeur(){
        return this.#largeur;
    }

    getVie(){
        return this.#vie;
    }

}
 