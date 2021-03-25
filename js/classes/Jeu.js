/*
 * Classe Jeux, classe principale du casse briques, le jeux représente le jeux à travers
 * les différents niveaux. Le jeux est composé d'un canvas qui représente le lieux du dessin 
 * du jeu et ctx qui représente le contenus de celui-ci. le Jeux à un attribut gameOver qui représente
 * l'etat de la partie et un attribut score qui représente les points acumulées mors de la partie.
 * Enfin le jeux à un niveau (celui en cours) qui est regénéré procéduralement à chaque victoire 
 * avec une incrémentation
 * de la difficulté. 
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
    constructor(canvas,ctx){
        this.#canvas = canvas;
        this.#ctx = ctx;
        this.#gameOver = false;
        this.#scoreTotal = 0;
        this.#vieTotal = 3;
    }

    /**
     * Fonction Principale démarant une nouvelle partie 
     * la partie va creer un nouveau niveau qui sera joué jusqu'à qu'il soit finis
     * lorque le niveau est finis, soit il est perdu dans
     * ce cas la fonction fin de partis et le gammeOver sont appelé sinon un niveau est regénéré et la partie
     * continue.
     */
    async jouer(){
        let difficulte = 1;
        
        do {
            this.#niveau = new Niveau(this.#canvas,this.#ctx,difficulte,  this.#scoreTotal,this.#vieTotal);
            await this.#niveau.start();
            this.#scoreTotal += this.#niveau.score;
            this.#vieTotal = this.#niveau.vie;
            // si le niveau est gagné
            if (this.#niveau.etat == 1){
                difficulte += getRandomInt(3);
            }
            //si le niveau est perdu
            if (this.#niveau.etat == 2){
               this.#gameOver = true;
               this.finJeux(); 
            }

        }while (this.#gameOver == false);

    }

    /**
     * Fonction finissant le jeu en cours en indiquant le score et proposant de rejouer
     */
    finJeux(){
        //TODO : CODER LA METHODE
    }
}