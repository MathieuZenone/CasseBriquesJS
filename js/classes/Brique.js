
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

    retrancherVie(degat){
        this.#vie = this.#vie - degat;
    }

    /**
     * fonction dessinant une brique
     * @param {*} ctx 
     */
    draw(ctx){
        let epaisseurBordure = 10;
        ctx.beginPath();
        //ctx.fillStyle = this.couleur;
        //couleur par rapport au niveau de la brique
        ctx.fillStyle = '#'+((this.#vie)*10000+0x4CB790<<0).toString(16);
        ctx.fillRect(this.positionX, this.positionY, this.#largeur, this.#hauteur);
        ctx.clearRect(this.positionX+epaisseurBordure, this.positionY+epaisseurBordure, this.#largeur-epaisseurBordure*2, this.#hauteur-epaisseurBordure*2);
        ctx.font = '20px serif';
        ctx.fillText(this.#vie, this.positionX + 2*epaisseurBordure + 20, this.positionY+this.#hauteur/2 + 5);
        ctx.fill();
        ctx.closePath();
    }

}