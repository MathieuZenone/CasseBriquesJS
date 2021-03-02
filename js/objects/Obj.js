/* Declaration de la class de la balle */
class Obj {
    #positionX;
    #positionY;
    #vitesse;
    #directionX;
    #directionY;
    
    constructor (positionX,positionY,vitesse,directionX,directionY){
        this.#positionX = positionX;
        this.#positionY = positionY;
        this.#vitesse = vitesse;
        this.#directionX = directionX;
        this.#directionY = directionY;
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

    getDirectionX(){
        return this.#directionX;
    }

    getDirectionY(){
        return this.#directionY;
    }

    setX(x){
        this.#positionX = x;
    }

    setY(y){
        this.#positionY = y;
    }

    setVitesse(vitesse){
        this.#vitesse = vitesse;
    }

    setDirectionX(directionX){
        this.#directionX = directionX;
    }

    setDirectionY(directionY){
        this.#directionY = directionY;
    }

    nouvelPostion(canvas,remise){
      
        this.#positionX += this.#directionX  * this.#vitesse ;
        this.#positionY += this.#directionY  * this.#vitesse ;
        /*if (this.#positionX<= 0 + remise){
            this.#positionX =  0 + remise;
            this.#vitesse = 0;
        }

        if (this.#positionY <= 0 + remise){
            this.#positionY =  0 + remise;
            this.#vitesse = 0;
        }

        if (this.#positionX >= canvas.width - remise){
            this.#positionX =  canvas.width - remise;
            this.#vitesse = 0;
        }

        if (this.#positionY >= canvas.height - remise){
           this.#positionY =  canvas.width - remise;
           this.#vitesse = 0;
        }*/
    }

}

class Balle extends Obj {

    #rayon;

    constructor(positionX,positionY,vitesse,directionX,directionY,rayon){
        super(positionX,positionY,vitesse,directionX,directionY);
        this.#rayon = rayon;
    }

    getRayon(){
        return this.#rayon;
    }
    
    draw(ctx,canvas){
        ctx.beginPath();

        ctx.arc(super.getX(), super.getY(), this.#rayon, 0, Math.PI*2, false);
        ctx.fillStyle = "blue";
        ctx.fill();
        ctx.closePath();
        super.nouvelPostion(canvas,this.#rayon);
        if (super.getX()<= 0 + this.#rayon){
            
            super.setDirectionX(super.getDirectionX()*-1);
        }

        if (super.getY() <= 0 + this.#rayon){
            super.setDirectionY(super.getDirectionY()*-1);
        }

        if (super.getX() >= canvas.width - this.#rayon){
            super.setDirectionX(super.getDirectionX()*-1);
        }

        if (super.getY() >= canvas.height - this.#rayon){
            super.setDirectionY(super.getDirectionY()*-1);
            //super.setVitesse(0);
        }
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
 