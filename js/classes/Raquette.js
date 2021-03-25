/*
 * Classe raquette.
 * La raquette est l'outil mis à la disposition du joueur 
 * pour renvoyer les balles sur les briques. 
 * Elle porte une cordonnée fixe Y, une hauteur, une longueur,
 * ainsi que le comportement d'un ObjetAmovible.
 * Ainsi la raquette peut uniquement se déplacer sur l'axe X.
 */ 
class Raquette extends ObjetAmovible {

    /* Hauteur de la raquette */
    #hauteur;

    /* longueur de la raquette */
    #longueur;

    /* attribut indiquant si la fléche doite est activé */
    #flecheDroiteActive;

    /* attribut indiquant si la fléche gauche est activé */
    #flecheGaucheActive;

    /* attribut indiquant si la souris est enfoncé */
    #sourisActive;

    /* canvas */
    #canvas

    /* positionX de la souris */
    #positionXSouris;
    
    /**
     * État initial de la raquette
     * @param {numeric} xPos position x de l'objet
     * @param {numeric} yPos position y de l'objet
     * @param {numeric} couleur couleur de l'objet
     * @param {Integer} vitesse vitesse de l'objet
     * @param {numeric} xDir coordonnée x du vecteur de direction de l'objet
     * @param {numeric} yDir coordonnée y du vecteur de direction de l'objet
     * @param {Integer} hauteur hauteur de la raquette
     * @param {Integer} longueur longueur de la raquette
     * @param {canvas} canvas canvas dans lequel se trouve la raquette
     */
    constructor(xPos, yPos, couleur, vitesse, xDir, yDir,hauteur, longueur, canvas) {
        super(xPos, yPos, couleur, vitesse, xDir, yDir);

        this.#hauteur = hauteur;
        this.#longueur = longueur;
        this.#canvas = canvas;

        this.#positionXSouris = false;
        this.#flecheDroiteActive = false;
        this.#flecheGaucheActive = false;
        this.#sourisActive = false;

        this.#initialiserEcouteClavier();
    }

    /**
     * Initialise les écoutes d'évenements du clavier de l'utilisateur
     */
    #initialiserEcouteClavier() {
        const instanceObjet = this;

        // On ajoute des écoutes sur les action du clavier
        document.addEventListener("keydown", touche => instanceObjet.lorsqueToucheAppuye(touche), false);
        document.addEventListener("keyup",   touche => instanceObjet.lorsqueToucheRelache(touche), false);

        // On ajoute des écoutes sur les actions de la souris
        document.addEventListener("mousemove", e => instanceObjet.lorsqueSourisDeplacement(e), false);
        document.addEventListener("mousedown", () => instanceObjet.lorsqueSourisClique(), false);
        document.addEventListener("mouseup",   () => instanceObjet.lorsequeSourisRelache(), false);
    }

    /**
     * Methode dessinant la raquette.
     */
    draw(ctx) {
        // La raquette est constituée d'un rectangle dont les bords sont arrondies par deux cercles.

        // Dessin du rectange
        ctx.beginPath();
        ctx.fillStyle = this.couleur;
        ctx.rect(this.positionX, this.positionY, this.#longueur, this.#hauteur);
        
        ctx.fill();
        ctx.closePath();

        // Dessin du cercle gauche
        ctx.beginPath();
        ctx.fillStyle = this.couleur;
        ctx.arc(this.positionX , this.positionY+ (this.#hauteur/2), this.#hauteur/2, 0, Math.PI*2, false);
        
        ctx.fill();
        ctx.closePath();

        // Dessin du cercle droit
        ctx.beginPath();
        ctx.fillStyle = this.couleur;
        ctx.arc(this.positionX +this.#longueur , this.positionY+ (this.#hauteur/2), this.#hauteur/2, 0, Math.PI*2, false);
        
        ctx.fill();
        ctx.closePath();

        // On calcule la nouvelle position
        super.nouvellePosition();

        // On écoute le clavier
        this.ecouteClavier();

        // On écoute la souris
        this.ecouteSouris();

        // On regarde qu'on ne dépasse pas les bords du canvas
        this.limitationBordure();
        
    }

    /**
     * Fonction servant à limiter les déplacements de la raquette à la limite du canvas
     */
    limitationBordure() {
        //limitation à gauche
        if (this.positionX <= 0 + (this.#hauteur / 2)) {
            this.positionX = 0 + (this.#hauteur / 2);
        }
        //limitation à droite
        if (this.positionX >= this.#canvas.width - this.#longueur - (this.#hauteur / 2)) {
            this.positionX = this.#canvas.width - this.#longueur - (this.#hauteur / 2);
        }
    }

    /**
     * Fonction écoutant l'appuie des touches sur le clavier utilisateur.
     */
     lorsqueToucheAppuye(touche) {
        // TODO: Adding const
        
        if(touche.key == "Right" || touche.key == "ArrowRight") {
            this.#flecheDroiteActive = true;
        } else if(touche.key == "Left" || touche.key == "ArrowLeft") {
            this.#flecheGaucheActive = true;
        }
        
    }

    /**
     * Fonction écoutant le relâchement des touches sur le clavier utilisateur.
     */
     lorsqueToucheRelache(touche) {
        // TODO: Adding const

        if(touche.key == "Right" || touche.key == "ArrowRight") {
            this.#flecheDroiteActive = false;
        } else if(touche.key == "Left" || touche.key == "ArrowLeft") {
            this.#flecheGaucheActive = false;
        }
        
    }


    /**
     * Méthode gérant les déplacements de la raquette
     */
    ecouteClavier(){

        if (this.#flecheDroiteActive && !this.#flecheGaucheActive) {
            this.directionX = 1;
        } else if(!this.#flecheDroiteActive && this.#flecheGaucheActive) {
            this.directionX = -1;
        } else {
            this.directionX = 0;
        }

    }

    /**
     * Fonction activant l'attribut souris Active si 
     * un click est effectué
     */
     lorsqueSourisClique(){
        this.#sourisActive = true;
    }

    /**
     * Fonction desactivant l'attribut souris Active si 
     * le clic est relaché
     */
     lorsequeSourisRelache(){
        this.#sourisActive = false;
    }

    /**
     * Fonction s'activant sur le déplacement de la sourris indique sa postion X 
     */
     lorsqueSourisDeplacement(e) {
        let rect = canvas.getBoundingClientRect();
        this.#positionXSouris = e.clientX - rect.left;
    }

    /**
     * Méthode déplacant la raquette en fonction des mouvements de la souris
     */
    ecouteSouris() {
        if (this.#sourisActive){
            this.positionX = (this.#positionXSouris - this.#longueur/2) * 3; // position de la souris non exacte à revoir
        }
    }

    /* Getters & Setters */
    get longueur(){
        return this.#longueur;
    }

    get hauteur(){
        return this.#hauteur;
    }

    set longueur(nouvelleLongueur){
        this.#longueur = nouvelleLongueur;
    }

}