/**
 * Classe Bonus.
 * Un bonus est un ObjetAmovible avec un niveau dans lequel il prend place 
 * et une variable bool pour savoir s'il a été utilisé
 */
class Bonus extends ObjetAmovible {

    /* le niveau est l'endroit où prend place le bonus */
    #niveau
    /* Boolean qui indique si le bonus a été utilisé */
    #estUtilise

    /**
     * Instancie un bonus depuis une certaine position
     * @param {numeric} xPos position x de l'objet
     * @param {numeric} yPos position y de l'objet
     * @param {numeric} couleur couleur de l'objet
     * @param {Integer} vitesse vitesse de l'objet
     * @param {numeric} xDir coordonnée x du vecteur de direction de l'objet
     * @param {numeric} yDir coordonnée y du vecteur de direction de l'objet
     * @param {*} niveau niveau dans lequel se place le bonus
     */
    constructor(xPos, yPos, couleur,vitesse, xDir, yDir, niveau) {
        super(xPos, yPos, couleur, vitesse, xDir, yDir);
        this.#niveau = niveau;
        this.#estUtilise = false;

    }

    get estUtilise() {
        return this.#estUtilise;
    }

    /**
     * Fonction dessinant le bonus
     */
    draw() {
        if (!this.#estUtilise) {
            let longueur = 20;
            let largeur = 20;
            this.#niveau.ctx.beginPath();
            ctx.fillStyle = this.couleur;
            this.#niveau.ctx.fillRect(this.positionX, this.positionY, longueur, largeur); //dessine un carée
            this.#niveau.ctx.fill();
            this.#niveau.ctx.closePath();
            super.nouvellePosition();
            this.detectionColision();
        }
    }

    /**
     * on regarde si le bonus rentre en colision avec la raquète
     */
    detectionColision(){
        if (this.positionY >= this.#niveau.raquette.positionY 
            && this.positionY <= this.#niveau.raquette.positionY+ this.#niveau.raquette.hauteur
            && this.positionX + 20 >= this.#niveau.raquette.positionX 
            && this.positionX <= this.#niveau.raquette.positionX + this.#niveau.raquette.longueur 
            ) {
            this.#estUtilise = true;
            this.bonusAlea();
        }
    }

    /**
     * Génération aléatoire du type de bonus
     */
    bonusAlea(){
        // TODO: Make const for purcentage
        let alea = Math.random();

        if (alea<0.4) { //nouvelle vie
            this.#niveau.vie = this.#niveau.vie+1;
        } else if (alea <0.8) { //NOUVELLE BALLE
            this.#niveau.nouvelleBalle();
        } else { //augmentation taille raquette
            let limitTaille = 800;
            if (this.#niveau.raquette.longueur * 2 < limitTaille) {
                this.#niveau.raquette.longueur = this.#niveau.raquette.longueur * 1.5;
            }
        }
    }

}