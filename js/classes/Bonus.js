/**
 * Classe Bonus, cette classe sert à créer des bonus un bonus et un ObjetAmovible avec 
 * un niveau dans lequel il prend place et une variable booleanne pour savoir si il a été utilisé
 */
class Bonus extends ObjetAmovible {
    /* le niveau est l'endroit ou prend place le bonus */
    #niveau
    /* Boolean qui indique si le bonus a été utilisé */
    #estUtilise

    /**
     * Instancie un bonus depuis une certaine position
     * @param {numeric} positionX position x de l'objet
     * @param {numeric} positionY position y de l'objet
     * @param {numeric} couleur couleur de l'objet
     * @param {Integer} vitesse vitesse de l'objet
     * @param {numeric} directionX coordonnée x du vecteur de direction de l'objet
     * @param {numeric} directionY coordonnée y du vecteur de direction de l'objet
     * @param {*} niveau niveau dans lequel se place le bonus
     */
    constructor(positionX,positionY,couleur,vitesse,directionX,directionY,niveau){
        super(positionX,positionY,couleur,vitesse,directionX,directionY);
        this.#niveau = niveau;
        this.#estUtilise = false;

    }

    get estUtilise(){
        return this.#estUtilise;
    }
    /**
     * Fonction dessinant le bonus
     */
    draw(){
        if (!this.#estUtilise){
            let longueur = 20;
            let largeur = 20;
            this.#niveau.ctx.beginPath();
            ctx.fillStyle = this.couleur;
            this.#niveau.ctx.fillRect(this.positionX, this.positionY,longueur,largeur); //dessine un carée
            this.#niveau.ctx.fill();
            this.#niveau.ctx.closePath();
            super.nouvelPosition();
            this.detectionColision();
        }
    }

    /**
     * on regarde si le bonus rentre en colision avec la raquète
     */
    detectionColision(){
        if (this.positionY >= this.#niveau.raquette.positionY 
            && this.positionY<= this.#niveau.raquette.positionY+ this.#niveau.raquette.hauteur
            && this.positionX + 20 >= this.#niveau.raquette.positionX 
            && this.positionX <= this.#niveau.raquette.positionX + this.#niveau.raquette.longueur){
            this.#estUtilise = true;
            this.bonusAlea();
        }
    }

    /**
     * Definition des avantage liés à la récupération du bonus au bonus
     */
    bonusAlea(){
        let alea = Math.random();
        //nouvelle vie
        if (alea<0.4){
            this.#niveau.vie = this.#niveau.vie+1;
        //NOUVELLE BALLE
        }else if(alea <0.8){
            this.#niveau.nouvelleBalle();
        //augmentation taille raquette
        }else{
            let limitTaille = 800;
            if (this.#niveau.raquette.longueur * 2 < limitTaille){
                this.#niveau.raquette.longueur = this.#niveau.raquette.longueur * 1.5;
            }
        }
    }




}