

class Msg extends Objet{
    /* Hauteur de la Brique */
    

    /**
     * Constructeur initialisant uen brique avec une largeur
     * une hauteur et un nombre de vie 
     */
    constructor(positionX,positionY,couleur){
        super(positionX,positionY,couleur);
    }


    /**
     * fonction dessinant une brique
     * @param {*} ctx 
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