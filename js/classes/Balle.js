/*
 * Classe Balle, une balle est un ObjetAmovible. Elle est définit
 * par un rayon et par une puissance qui se caractérise par une valeur representant
 * le nombre de vie que la balle enlevera à une brique lors de l'impacte.
 */
class Balle extends ObjetAmovible {

    /* Rayon de la balle */
    #rayon;

    /* Puissance de la balle */
    #puissance;

    /* indique si la balle est toujours en vie */
    #enVie;

    /* 
     * Constructeur initialisant une balle en definissant son rayon et sa puissance
     */
    constructor(positionX,positionY,couleur,vitesse,directionX,directionY,rayon,puissance){
        super(positionX,positionY,couleur,vitesse,directionX,directionY);
        this.#rayon = rayon;
        this.#puissance = puissance;
        this.#enVie = true;
    }

    get rayon(){
        return this.#rayon;
    }

    get puissance(){
        return this.#puissance;
    }

    get enVie(){
        return this.#enVie;
    }

    set rayon(rayon){
        this.#rayon = rayon;
    }

    set puissance(puissance){
        this.#puissance = puissance;
    }

    set enVie(enVie){
        this.#enVie = enVie;
    }

    draw(ctx,canvas,balles,briques,raquette){
        ctx.beginPath();

        ctx.arc(this.positionX, this.positionY, this.#rayon, 0, Math.PI*2, false);
        //ctx.fillStyle = '#'+(Math.random()*0xFFFFFF<<0).toString(16);
        ctx.fillStyle = this.couleur;
        ctx.fill();
        ctx.closePath();
        super.nouvelPosition();
        this.colisionBordure(canvas);
        this.colisionRaquette(raquette);
        this.etatBalle(canvas);
        //colision balles
        for (let i = 0; i < balles.length; i++) {
            let distanceInterObjet = 0;
            if (balles[i].positionX != this.positionX && balles[i].positionY != this.positionY){
                distanceInterObjet = Math.sqrt(
                                        Math.pow(
                                            (balles[i].positionX - this.positionX),2)
                                        +Math.pow(
                                            (balles[i].positionY - this.positionY),2)
                                    );
                
                if (distanceInterObjet <= this.#rayon + balles[i].rayon){
                    this.vitesse = (this.vitesse * -1);
                }
            }
        }

    }

    /* 
     * Methode calculant la nouvelle trajectoire de la balle si c'elle si rentre en 
     * colisions avec une bordure
     */
    colisionBordure(canvas){
        //colisions bordure

        //Colision avec la bordure gauche 
        if (this.positionX <= 0 + this.#rayon){
            this.directionX = this.directionX * -1;
        }

        //Colision avec la bordure haute
        if (this.positionY <= 0 + this.#rayon){
            this.directionY = this.directionY * -1;
        }
        //colision avec la bordure droite
        if (this.positionX >= canvas.width - this.#rayon){
            this.directionX = this.directionX * -1;
        }
        //colision avec la bordure basse
        if (this.positionY >= canvas.height - this.#rayon){
            //this.directionY = this.directionY * -1;
            //super.setVitesse(0);
        }
    }

    /*
     * Methode indiquant si la balle est toujour en vie
     * Pour ce faire on regarde si la balle à disparu du canvas
     */
    etatBalle(canvas){
        if (this.positionY >= canvas.height + this.#rayon){
            this.#enVie = false;
            console.log(this.#enVie);
        }
    }


    colisionRaquette(raquette){
    
        if (this.positionY + this.#rayon >= raquette.positionY &&this.positionX <= raquette.positionX + raquette.longueur && this.positionX >= raquette.positionX){
            this.directionY = this.directionY * -1;
        }
    }

}