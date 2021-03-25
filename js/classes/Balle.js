/*
 * Classe Balle, une balle est un ObjetAmovible. 
 * La balle est définie par un rayon et une puissance qui représente les points de vie 
 * perdue pour une brique si une collision survient entre les deux objets.
 */
class Balle extends ObjetAmovible {

    /* Rayon de la balle */
    #rayon;

    /* Puissance de la balle */
    #puissance;

    /* Indique si la balle est toujours en vie */
    #enVie;

    /* 
     * Indique si la balle vient de rentrer en collision avec la raquette.
     * Si c'est le cas alors elle devient intouchable par la raquette jusqu'à ce qu'elle 
     * rentre en collision avec un autre objet.
    */
    #affectCollisionRaquette;

    #enCollisionBrique;
 
    /* 
     * État initial de la balle.
     */
    constructor(xPos, yPos, couleur, vitesse, xDir, yDir, rayon, puissance) {
        super(xPos, yPos, couleur, vitesse, xDir, yDir);

        this.#rayon = rayon;
        this.#puissance = puissance;
        
        this.#enVie = true;
        this.#affectCollisionRaquette = true;
        this.#enCollisionBrique = false;
    }

    draw(ctx, canvas, briques, raquette) {
        let gainScore = 0;
        ctx.beginPath();

        ctx.arc(this.positionX, this.positionY, this.#rayon, 0, Math.PI*2, false);
        ctx.fillStyle = this.couleur;
        
        ctx.fill();
        ctx.closePath();
        super.nouvelPosition();
        this.collisionBordure(canvas);

        gainScore += this.colissionBriques(briques);

        this.rebondRaquette(raquette);
        this.etatBalle(canvas);
        
        return gainScore;
    }

    /* 
     * Affecte la trajectoire de la balle lorsqu'une collision 
     * avec une des bordures du canvas survient.
     */
    collisionBordure(canvas){

        // Collision avec la bordure gauche 
        if (this.positionX <= 0 + this.#rayon){
            this.directionX = this.directionX * -1;
            this.#affectCollisionRaquette = true;
        }

        // Collision avec la bordure du haut
        if (this.positionY <= 0 + this.#rayon){
            this.directionY = this.directionY * -1;
            this.#affectCollisionRaquette = true;
        }

        // Collision avec la bordure droite
        if (this.positionX >= canvas.width - this.#rayon){
            this.directionX = this.directionX * -1;
            this.#affectCollisionRaquette = true;
        }

        // Collision avec la bordure du bas
        if (this.positionY >= canvas.height - this.#rayon){
            //this.directionY = this.directionY * -1;
            //super.setVitesse(0);
        }

    }

    /*
     * Méthode indiquant si la balle est toujours en 'vie'.
     * (Toujours dans le canvas)
     */
    etatBalle(canvas){

        if (this.positionY >= canvas.height + this.#rayon){
            this.#enVie = false;
        }

        this.#enCollisionBrique = false;
    }


    /**
     * Affecte la trajectoire de la balle en cas de collision avec la raquettte.
     * @param {Object} raquette 
     */
    rebondRaquette(raquette){
    
        if (this.collisionRaquetteRectangle(raquette) && this.#affectCollisionRaquette) {
            this.#affectCollisionRaquette = false;
            this.directionY = this.directionY * -1;
        }

        if (this.collisionRaquetteBord(raquette) && this.#affectCollisionRaquette) {
            this.#affectCollisionRaquette = false;
            this.directionX = this.directionX * -1;
            this.vitesse = this.vitesse * -1;
        }
    }

    /**
     * Détecte si la balle entre en collision avec la raquette
     * 
     * @param {Object} raquette
     * 
     * @return {Boolean} True si collision, false si cas contraire
     */
     collisionRaquetteRectangle(raquette) {

        // Si un point de la balle est entre le haut et le bas de la raquette
        return (
                Math.abs(this.positionY  - raquette.positionY) <= this.rayon 
                && Math.abs(this.positionY + raquette.hauteur - raquette.positionY) <= this.rayon
                && this.positionX >= raquette.positionX
                && this.positionX <= raquette.positionX + raquette.longueur 
                );
     }

    /**
     * Détecte si la balle entre en collision avec un des bors de la raquette
     * 
     * @param {Object} raquette La raquette du jeu
     * 
     * @return {Boolean} true en cas de collision, false si cas contraire
     */
     collisionRaquetteBord(raquette) {
        // TODO: Refactoring

        let x, y;
        let rayon = raquette.hauteur / 2;
        let distanceInterObjet = 0;
        
        // Bord droit
        x = raquette.positionX + raquette.longueur;
        y = raquette.positionY + rayon;
      
        distanceInterObjet = Math.sqrt(
                                 Math.pow(
                                    (x - this.positionX), 2)
                                 + Math.pow(
                                    (y - this.positionY), 2)
                            );
                
        if (distanceInterObjet <= this.#rayon + rayon){
           return true;
        }
        
        // Bord gauche
        x = raquette.positionX;
        y = raquette.positionY + rayon;

        distanceInterObjet = Math.sqrt(
            Math.pow(
               (x - this.positionX), 2)
            + Math.pow(
               (y - this.positionY), 2)
       );

        if (distanceInterObjet <= this.#rayon + rayon){
            return true;
        }
       
        return false;
     }

    /**
     * Methode gérant les rebond sur les briques  
     * 
     * @param {Array} briques Les briques du jeu
     * 
     * @return {Integer} Le score à incrémenter
     */
     colissionBriques(briques){
        let superGain = 0;

        briques.forEach(brique => superGain += this.rebondBrique(brique));

        return superGain;
    }

    /**
     * Méthode gérant les rebonds sur une brique
     * 
     * @param {Object} brique La brique du test
     * 
     * @return {Integer} Le score à incrémenter
     */
    rebondBrique(brique) {
        // TODO: Refactoring

        let ax, ay, bx, by, cx, cy, dx, dy;
        let gainScore = 0;
        
        ax = brique.positionX;
        ay = brique.positionY;

        bx = brique.positionX + brique.largeur;
        by = brique.positionY;

        cx = brique.positionX + brique.largeur
        cy = brique.positionY + brique.hauteur;

        dx = brique.positionX;
        dy = brique.positionY + brique.hauteur;

        // Collision droite
        if  ( delta(this.positionY, this.positionX, this.#rayon, bx, by ,cx ,cy) >= 0 
                && this.positionY >= ay
                && this.positionY <= dy 
            ) {
            
            this.directionX = this.directionX * -1;
            
            if (!this.#enCollisionBrique) {
                this.#affectCollisionRaquette = true;

                gainScore += this.#puissance;
                
                if (brique.vie < 0 ) {
                    gainScore += gainScore - brique.vie; 
                }

                brique.retrancherVie(this.#puissance);

                this.#enCollisionBrique = true;
            }
        }
    
        // Collision gauche
        if ( delta(this.positionY, this.positionX, this.#rayon, ax, ay ,dx ,dy) >= 0
                && this.positionY >= ay 
                && this.positionY <= dy 
            ) {
               
            this.directionX = this.directionX * -1;
            
            if (!this.#enCollisionBrique) {
                this.#affectCollisionRaquette = true;

                gainScore += this.#puissance;

                if (brique.vie < 0 ) {
                    gainScore += gainScore - brique.vie; 
                }

                brique.retrancherVie(this.#puissance);
                this.#enCollisionBrique = true;
            }
        }

        // Collision haut
        if ( delta(this.positionY, this.positionX, this.#rayon, ax, ay ,bx ,by) >= 0
                && this.positionX >= ax 
                && this.positionX <= bx 
            ) {
                
            this.directionY = this.directionY * -1;
            

            if (!this.#enCollisionBrique) {
                this.#affectCollisionRaquette = true;

                gainScore += this.#puissance;

                if (brique.vie < 0 ) {
                    gainScore += gainScore - brique.vie; 
                }

                brique.retrancherVie(this.#puissance);
                this.#enCollisionBrique = true;
            }
        }

        // Collision bas
        if ( delta(this.positionY, this.positionX, this.#rayon, dx,dy,cx,cy) >= 0
                && this.positionX >= ax 
                && this.positionX <= bx 
            ) {
                 
            this.directionY = this.directionY *- 1;
            
            if (!this.#enCollisionBrique) {

                this.#affectCollisionRaquette = true;

                gainScore += this.#puissance;

                if (brique.vie < 0 ) {
                    gainScore += gainScore - brique.vie; 
                }

                brique.retrancherVie(this.#puissance);
                this.#enCollisionBrique = true;
            }
            
        }
        
        return gainScore;
    }

    /**
     * Méthode indiquant si la balle est présente dans un polygone
     * 
     * @param {Array} listesX
     * @param {Array} listesY
     * 
     * @return {Boolean} True si elle est présente, false si cas contraire
     */
    estPresentPolygone(listesX,listesY){
        let x1,y1,x2,y2,a,b,c,d;
        let estPresent = true;

        for (let i = 0; i < listesX.length - 1; i++) {
            x1 = listesX[i];
            x2 = listesX[i + 1];
            y1 = listesY[i];
            y2 = listesY[i+1];

            a = -1 * (y2 - y1);
            b = x2 -x1;
            c = -1*(a * x1 + b * y1);
            d = ((x2-x1)*(this.positionY-y2) - (this.positionX-x1)*(y2-y1) );

            if (d <0) {
                estPresent = false;
                break;
            }
        }
        
        return estPresent;
    }

    // Getters & Setters
    get rayon() {
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
}