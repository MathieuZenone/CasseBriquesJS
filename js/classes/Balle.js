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

    #enColisionBrique;
 
    /* 
     * Constructeur initialisant une balle en definissant son rayon et sa puissance
     */
    constructor(positionX,positionY,couleur,vitesse,directionX,directionY,rayon,puissance){
        super(positionX,positionY,couleur,vitesse,directionX,directionY);
        this.#rayon = rayon;
        this.#puissance = puissance;
        this.#enVie = true;
        this.#affectColisionRaquette = true;
        this.#enColisionBrique = false;

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
        let gainScore = 0;
        ctx.beginPath();

        ctx.arc(this.positionX, this.positionY, this.#rayon, 0, Math.PI*2, false);
        //ctx.fillStyle = '#'+(Math.random()*0xFFFFFF<<0).toString(16);
        ctx.fillStyle = this.couleur;
        
        ctx.fill();
        ctx.closePath();
        super.nouvelPosition();
        this.colisionBordure(canvas);
        gainScore += this.colisionBriques(briques);
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
        return gainScore;

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
        }

        this.#enColisionBrique = false;
        
       
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
        let superGain = 0;
        briques.forEach(brique => superGain+=this.rebondBrique(brique));
        return superGain;
    }

    /**
     * Methode gérant les rebonds sur les briques
     */
    rebondBrique(brique){
        let ax,ay,bx,by,cx,cy,dx,dy;
        let gainScore = 0;
        
        ax = brique.positionX;
        ay = brique.positionY;

        bx = brique.positionX + brique.largeur;
        by = brique.positionY;

        cx = brique.positionX + brique.largeur
        cy = brique.positionY + brique.hauteur;

        dx = brique.positionX;
        dy = brique.positionY + brique.hauteur;





        //colision droite
       /* console.log("===========DEBUG===========");
        console.log("POSITION Y CERCLE : " + this.positionY);
        console.log("POSITION X CERCLE : " + this.positionX);

        console.log("POSITION BX : " + bx);
        console.log("POSITION By : " + by);

        console.log("POSITION CX : " + cx);
        console.log("POSITION CY : " + cy);

        console.log(delta(this.positionY, this.positionX, this.#rayon, bx,by,cx,cy));
        console.log("===========================");*/
        
        if (delta(this.positionY, this.positionX, this.#rayon, bx, by ,cx ,cy)>=0
            && this.positionY >= ay
            && this.positionY <= dy 
            ){
            
            
            
            this.directionX = this.directionX*-1;
            

            if (!this.#enColisionBrique){
                this.#affectColisionRaquette = true;
                gainScore += this.#puissance;
                if (brique.vie < 0 ){
                    gainScore += gainScore - brique.vie; 
                }
                brique.retrancherVie(this.#puissance);
                this.#enColisionBrique = true;
            }
        }



        //colision gauche
        if (delta(this.positionY, this.positionX, this.#rayon, ax, ay ,dx ,dy)>=0
            && this.positionY >= ay 
            && this.positionY <= dy 
            ){
               
            
            this.directionX = this.directionX *-1;
            
            if (!this.#enColisionBrique){
                this.#affectColisionRaquette = true;
                gainScore += this.#puissance;
                if (brique.vie < 0 ){
                    gainScore += gainScore - brique.vie; 
                }
                brique.retrancherVie(this.#puissance);
                this.#enColisionBrique = true;
            }
        }

        //colision dessus
        if (delta(this.positionY, this.positionX, this.#rayon, ax, ay ,bx ,by)>=0
            && this.positionX >= ax 
            && this.positionX <= bx 
            ){
                
            
            this.directionY = this.directionY  *-1;
            

            if (!this.#enColisionBrique){
                
                this.#affectColisionRaquette = true;
                gainScore += this.#puissance;
                if (brique.vie < 0 ){
                    gainScore += gainScore - brique.vie; 
                }
                brique.retrancherVie(this.#puissance);
                this.#enColisionBrique = true;
            }
        }


        //colision basse
        if (delta(this.positionY, this.positionX, this.#rayon, dx,dy,cx,cy)>=0
            && this.positionX >= ax 
            && this.positionX <= bx 
            ){
                 
                //this.vitesse = this.vitesse*-1;
            
            this.directionY = this.directionY *-1;
            
            
            if (!this.#enColisionBrique){
                this.#affectColisionRaquette = true;
                gainScore += this.#puissance;
                if (brique.vie < 0 ){
                    gainScore += gainScore - brique.vie; 
                }
                brique.retrancherVie(this.#puissance);
                this.#enColisionBrique = true;
            }
            
        }
        
     



        return gainScore;

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