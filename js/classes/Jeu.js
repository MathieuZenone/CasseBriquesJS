/*
 * Classe Jeu.
 * Le jeux représente le jeu à travers les différents niveaux. 
 * Il est composé d'un canvas qui représente la zone de dessin du jeu 
 * et context qui représente le contenu de celui-ci. 
 */
class Jeu {
    /* canvas du jeu */
    #canvas;

    /* ctx (contenue du canvas) du jeu */
    #ctx;

    /* gameOver etat du jeu en cours */
    #gameOver;

    /* Niveau du jeu en cours */
    #niveau;

    #scoreTotal

    #vieTotal
    /**
     * Contructeur qui instancie un nouveau Jeu avec un GameOver à false
     * un score à 0 et qui prend en parametres le canvas ainsi que son
     * contenus .
     * @param {canvas} canvas zone de dessin du jeu 
     * @param {*} ctx contenu de la zone de dessin
     */
    constructor(canvas, ctx) {
        this.#canvas = canvas;
        this.#ctx = ctx;
        this.#gameOver = false;
        this.#scoreTotal = 0;
        this.#vieTotal = 3;
    }

    /**
     * Permet de démarrer une nouvelle partie.
     * La partie va créer un nouveau niveau qui doit être joué jusqu'à la fin de celui-ci (gagnant ou perdant).
     * Une fois le niveau terminé, s'il est perdu alors le jeu s'arrête sinon on génère un nouveau niveau
     * en conservant le nombre de points actuel du joueur.
     */
    async jouer(){
        let difficulte = 1;
        
        do {
            this.#niveau = new Niveau(this.#canvas, this.#ctx, difficulte, this.#scoreTotal, this.#vieTotal);

            await this.#niveau.start();

            this.#scoreTotal += this.#niveau.score;
            this.#vieTotal = this.#niveau.vie;
            
            // TODO: Add const on niveau.etat
            // si le niveau est gagné
            if (this.#niveau.etat == 1){
                difficulte += getRandomInt(3);
            }

            //si le niveau est perdu
            if (this.#niveau.etat == 2){
               this.#gameOver = true;
               this.finJeux(); 
            }

        } while (this.#gameOver == false);

    }

    /**
     * TODO
     */
    finJeu() {
        // TODO: Display a message into canvas
    }
}