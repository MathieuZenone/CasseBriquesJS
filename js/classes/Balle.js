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

    /* indique si la balle viens de rentrer en colisions avec la raquette alors on la rend intouchable par 
     * la raquette jusqu'a qu'elle rentre en colision avec autre chose
     */
    #affectColisionRaquette;

    /* 
     * Constructeur initialisant une balle en definissant son rayon et sa puissance
     */
    constructor(positionX,positionY,couleur,vitesse,directionX,directionY,rayon,puissance){
        super(positionX,positionY,couleur,vitesse,directionX,directionY);
        this.#rayon = rayon;
        this.#puissance = puissance;
        this.#enVie = true;
        this.#affectColisionRaquette = true;
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
        this.colisionBriques(briques);
        this.rebondRaquette(raquette);
        this.etatBalle(canvas);
        /*colision balles colision avec les balle desactivé 
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
                    this.positionX = (this.positionX * -1);
                }
            }
        }*/

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
            this.#affectColisionRaquette = true;
        }

        //Colision avec la bordure haute
        if (this.positionY <= 0 + this.#rayon){
            this.directionY = this.directionY * -1;
            this.#affectColisionRaquette = true;
        }
        //colision avec la bordure droite
        if (this.positionX >= canvas.width - this.#rayon){
            this.directionX = this.directionX * -1;
            this.#affectColisionRaquette = true;
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


    /**
     * Cette fonction gére la colision entre une balle et la raquette
     * @param {Object} raquette 
     */
    rebondRaquette(raquette){
    
        if (this.colisionRaquetteRectangle(raquette) && this.#affectColisionRaquette){
            //this.vitesse = 0;
            this.#affectColisionRaquette = false;
            this.directionY = this.directionY * -1;
        }
        if (this.colisionRaquetteBord(raquette) && this.#affectColisionRaquette ){
            //this.vitesse = 0;
            this.#affectColisionRaquette = false;
            this.directionX = this.directionX * -1;
            this.vitesse = this.vitesse * -1;
        }
    }

    /**
     * Cette fonction detecte une colision entre la raquette et la balle
     */
     colisionRaquetteRectangle(raquette){
        let colision = false; 
        //gestion du rebond sur le rectangle de la raquette
        //on teste si un point de la balle est entre le haut et le bas de la raquette
        if (Math.abs(this.positionY  - raquette.positionY )<= this.rayon 
            && Math.abs(this.positionY + raquette.hauteur  -raquette.positionY ) <= this.rayon
            && this.positionX >= raquette.positionX
            && this.positionX <= raquette.positionX +raquette.longueur ){

            colision = true;
        }

       

        return colision;
     }

    /**
     * Cette fonction detecte une colision avec les bordure de la raquette
     */
     colisionRaquetteBord(raquette){
        let colision = false;
        let x,y;
        let rayon = raquette.hauteur /2;
        let distanceInterObjet = 0;
        
        //bord droit
        x = raquette.positionX +raquette.longueur;
        y = raquette.positionY + rayon;
      
        distanceInterObjet = Math.sqrt(
                                 Math.pow(
                                    (x - this.positionX),2)
                                +Math.pow(
                                    (y - this.positionY),2)
                            );
                
        if (distanceInterObjet <= this.#rayon + rayon){
            colision = true;
        }
        

        //bord gauche
        x = raquette.positionX;
        y = raquette.positionY + rayon;

        distanceInterObjet = Math.sqrt(
            Math.pow(
               (x - this.positionX),2)
           +Math.pow(
               (y - this.positionY),2)
       );

        if (distanceInterObjet <= this.#rayon + rayon){
        colision = true;
        }
       

        return colision;
     }


    /**
     * Methode gérant les rebond sur les briques  
     */
     colisionBriques(briques){
         //on parcours toute les briques 
         briques.forEach(brique => this.rebondBrique(brique));

    }

    /**
     * Methode gérant les rebonds sur les briques
     */
    rebondBrique(brique){
        let ax,ay,bx,by,cx,cy;
        let yDirection =0;
        let xDirection = 0;
 
        //colision dessus
        ax = brique.positionX;
        bx = brique.positionX + brique.largeur;
        cx = brique.positionX + brique.largeur/2;
        ay = brique.positionY;
        by = brique.positionY;
        cy = brique.positionY + brique.hauteur/2;
        if (inTriangle(ax,ay,bx,by,cx,cy,this.positionX ,this.positionY + this.#rayon )){
            //this.vitesse = this.vitesse*-1;
            this.directionY = this.directionY * -1;

            this.#affectColisionRaquette = true;
            brique.retrancherVie(this.#puissance);
        }

        //colision droite
        ax = brique.positionX + brique.largeur;
        bx = brique.positionX + brique.largeur;
        cx = brique.positionX + brique.largeur/2;
        ay = brique.positionY;
        by = brique.positionY + brique.hauteur;
        cy = brique.positionY + brique.hauteur/2;
        if (inTriangle(ax,ay,bx,by,cx,cy,this.positionX - this.#rayon,this.positionY )){
            //this.vitesse = this.vitesse*-1;
            this.directionX = this.directionX * -1 ;
            this.#affectColisionRaquette = true;
            brique.retrancherVie(this.#puissance);
        }

        //colision basse
        ax = brique.positionX + brique.largeur;
        bx = brique.positionX;
        cx = brique.positionX + brique.largeur/2;
        ay = brique.positionY + brique.hauteur;
        by = brique.positionY + brique.hauteur;
        cy = brique.positionY + brique.hauteur/2;
        if (inTriangle(ax,ay,bx,by,cx,cy,this.positionX,this.positionY - this.#rayon)){
            //this.vitesse = this.vitesse*-1;
            this.directionY = this.directionY * -1;
            this.#affectColisionRaquette = true;
            brique.retrancherVie(this.#puissance);
        }

        //colision gauche
        ax = brique.positionX;
        bx = brique.positionX;
        cx = brique.positionX + brique.largeur/2;
        ay = brique.positionY + brique.hauteur;
        by = brique.positionY;
        cy = brique.positionY + brique.hauteur/2;
        if (inTriangle(ax,ay,bx,by,cx,cy,this.positionX + this.#rayon,this.positionY)){
            //this.vitesse = this.vitesse*-1;
            this.directionX = this.directionX * -1 ;
            this.#affectColisionRaquette = true;
            brique.retrancherVie(this.#puissance);
        }


    }

    /**
     * Methode indiquant si la balle est présente dans un polygone
     */
    estPresentPolygone(listesX,listesY){
        let x1,y1,x2,y2,a,b,c,d;
        let estPresent = true;

        for (let i = 0; i < listesX.length - 1; i++){
            x1 = listesX[i];
            x2 = listesX[i + 1];
            y1 = listesY[i];
            y2 = listesY[i+1];

            a = -1 * (y2 - y1);
            b = x2 -x1;
            c = -1*(a * x1 + b * y1);
            d = ((x2-x1)*(this.positionY-y2) - (this.positionX-x1)*(y2-y1) );

            if (d <0){
                estPresent = false;
            }
        }   
        return estPresent;
    }

}