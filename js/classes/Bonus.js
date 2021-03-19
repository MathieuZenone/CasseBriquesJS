
class Bonus extends ObjetAmovible {

    #niveau

    #estUtilise

    constructor(positionX,positionY,couleur,vitesse,directionX,directionY,niveau){
        super(positionX,positionY,couleur,vitesse,directionX,directionY);
        this.#niveau = niveau;
        this.#estUtilise = false;

    }

    get estUtilise(){
        return this.#estUtilise;
    }

    draw(){
        if (!this.#estUtilise){
            let longueur = 20;
            let largeur = 20;
            this.#niveau.ctx.beginPath();
            ctx.fillStyle = this.couleur;
            this.#niveau.ctx.fillRect(this.positionX, this.positionY,longueur,largeur);
            this.#niveau.ctx.fill();
            this.#niveau.ctx.closePath();
            super.nouvelPosition();
            this.detectionColision();
        }
    }

    detectionColision(){
        if (this.positionY >= this.#niveau.raquette.positionY 
            && this.positionY<= this.#niveau.raquette.positionY+ this.#niveau.raquette.hauteur
            && this.positionX + 20 >= this.#niveau.raquette.positionX 
            && this.positionX <= this.#niveau.raquette.positionX + this.#niveau.raquette.longueur){
            this.#estUtilise = true;
            this.bonusAlea();
        }
    }

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