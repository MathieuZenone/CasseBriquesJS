
/* Classe brique
 * Une brique porte une hauteur, une largeur, une vie ainsi que les attributs d'un 'Objet'
 * La brique à pour objectif d'être détruite pendant la partie de jeu afin d'incrémenter le 
 * compteur de score du joueur et peut éventuelement générer une bonus lors de sa destruction.
 */
class Brique extends Objet{
    /* Hauteur de la Brique */
    #hauteur;

    /* Largeur de la Brique */
    #largeur;

    /* Vie de la brique */
    #vie;

    /**
     * État initial de la brique
     * @param {numeric} xPos 
     * @param {numeric} yPos 
     * @param {numeric} couleur 
     * @param {numeric} hauteur 
     * @param {numeric} largeur 
     * @param {Integer} vie 
     */
    constructor(xPos,yPos,couleur,hauteur,largeur,vie){
        super(xPos,yPos,couleur);
        this.#hauteur = hauteur;
        this.#largeur = largeur;
        this.#vie = vie;
    }

    /**
     * Retire à la brique un nombre déterminé de vie
     * @param {numeric} aRetrancher La vie à retirer
     */
    retrancherVie(aRetrancher) {
        this.#vie = this.#vie - aRetrancher;
    }

    /**
     * fonction dessinant une brique
     * @param {*} ctx 
     */
    draw(ctx) {
        let epaisseurBordure = 10;
        ctx.beginPath();

        //couleur par rapport au niveau de la brique
        ctx.fillStyle = '#'+((this.#vie)*10000+0x4CB790<<0).toString(16);
        ctx.fillRect(this.positionX, this.positionY, this.#largeur, this.#hauteur);
        ctx.clearRect(this.positionX+epaisseurBordure, this.positionY+epaisseurBordure, this.#largeur-epaisseurBordure*2, this.#hauteur-epaisseurBordure*2);
        ctx.font = '20px serif';
        ctx.fillText(this.#vie, this.positionX + 2*epaisseurBordure + 20, this.positionY+this.#hauteur/2 + 5);
        ctx.fill();
        ctx.closePath();
    }

    // Getters & Setters
    get hauteur() {
        return this.#hauteur;
    }

    get largeur() {
        return this.#largeur;
    }

    get vie() {
        return this.#vie;
    }

    set hauteur(hauteur) {
        this.#hauteur = hauteur;
    }

    set largeur(largeur) {
        this.#largeur = largeur;
    }

    set vie(vie) {
        this.#vie = vie;
    }

}