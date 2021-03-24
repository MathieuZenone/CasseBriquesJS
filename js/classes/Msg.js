
/**
 * Classe msg sert à afficher un texte dans une zone de dessin,
 * cette classe est un extend d'objet
 */
class Msg extends Objet{
 

    /**
     * Constructeur initialisant uen brique avec une largeur
     * @param {numeric} positionX position x de l'objet
     * @param {numeric} positionY position y de l'objet
     * @param {numeric} couleur couleur de l'objet
     */
    constructor(positionX,positionY,couleur){
        super(positionX,positionY,couleur);
    }


    /**
     * fonction dessinant une brique
     * @param {*} ctx 
     * @param {*} message message à afficher
     */
    draw(ctx,message){
        ctx.beginPath();
        ctx.fillStyle = this.couleur;
        ctx.font = '35px serif';
        ctx.fillText(message, this.positionX , this.positionY);
        ctx.fill();
        ctx.closePath();
    }

}