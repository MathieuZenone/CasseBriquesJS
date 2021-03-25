
/**
 * Classe msg
 * Le msg => message sert à afficher un texte dans une zone de dessin.
 */
class Msg extends Objet {
 

    /**
     * État initial d'un msg
     * @param {numeric} xPos position x de l'objet
     * @param {numeric} yPos position y de l'objet
     * @param {numeric} couleur couleur de l'objet
     */
    constructor(xPos, yPos, couleur){
        super(xPos, yPos, couleur);
    }


    /**
     * Dessine le message dans le canvas
     * @param {*} ctx 
     * @param {*} message message à afficher
     */
    draw(ctx, message) {
        ctx.beginPath();
        ctx.fillStyle = this.couleur;
        ctx.font = '35px serif';
        ctx.fillText(message, this.positionX, this.positionY);
        ctx.fill();
        ctx.closePath();
    }

}