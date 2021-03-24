/*
 * Classe raquette, la raquette est l'outil mis à la disposition du joueur 
 * pour renvoyer les balles sur les briques elle pourra se deplacer grace 
 * au clavier ou à la sourris. Une raquette à une coordonee y definis et fixe, c'est un 
 * ObjetAmovible, de plus elle a une hauteur et une longueur.
 */ 
class raquette extends ObjetAmovible {

    /* Hauteur de la raquette */
    #hauteur;

    /* longueur de la raquette */
    #longueur;

    /* attribut indiquant si la fleche doite est activé */
    #flecheDroiteActive;

    /* attribut indiquant si la fleche gauche est activé */
    #flecheGaucheActive;

    /* attribut indiquand si la souris est enfoncé */
    #sourisActive;

    /* canvas ou se trouve la sourris */
    #canvas

    /* positionX de la sourris */
    #positionXSouris;
    
    /**
     * Constructeur de la raquette creeant une raquette avec une hauteur et une
     * longueur.
     * @param {numeric} positionX position x de l'objet
     * @param {numeric} positionY position y de l'objet
     * @param {numeric} couleur couleur de l'objet
     * @param {Integer} vitesse vitesse de l'objet
     * @param {numeric} directionX coordonnée x du vecteur de direction de l'objet
     * @param {numeric} directionY coordonnée y du vecteur de direction de l'objet
     * @param {Integer} hauteur hauteur de la raquette
     * @param {Integer} longueur longueur de la raquette
     * @param {canvas} canvas canvas dans lequel se trouve la raquette
     */
    constructor(positionX,positionY,couleur,vitesse,directionX,directionY,hauteur,longueur,canvas){
        super(positionX,positionY,couleur,vitesse,directionX,directionY);
        this.#hauteur = hauteur;
        this.#longueur = longueur;
        this.#canvas = canvas;
        this.#positionXSouris = false;
        this.#flecheDroiteActive = false;
        this.#flecheGaucheActive = false;
        this.#sourisActive = false;

        const instanceObjet = this;
        //on ajoute des ecoutes sur les action du clavier
        document.addEventListener("keydown",function(touche){instanceObjet.ecouteApuieTouche(touche);}, false);
        document.addEventListener("keyup", function(touche){instanceObjet.ecouteRelachementTouche(touche);}, false);

        //on ajoute des ecouteurs sur les actions de la souris
        document.addEventListener("mousemove",function(e){instanceObjet.ecouteMouvementSouris(e);}, false);
        document.addEventListener("mousedown",function(){instanceObjet.ecouteClicSouris();}, false);
        document.addEventListener("mouseup",function(){instanceObjet.ecouteRelacheClickSouris();}, false);
        
    }


    /**
     * Methode dessinant une raquette, une raquette et la superposition d'un rectangle 
     * et de 2 cercle placée aux extrimité de la raquette de fàçon à avoir des bout arrondit
     */
    draw(ctx){
       
        //Dessin du rectange
        ctx.beginPath();
        ctx.fillStyle = this.couleur;
        ctx.rect(this.positionX, this.positionY, this.#longueur, this.#hauteur);
        
        ctx.fill();
        ctx.closePath();

        //dessin du cercle gauche
        ctx.beginPath();
        ctx.fillStyle = this.couleur;
        ctx.arc(this.positionX , this.positionY+ (this.#hauteur/2), this.#hauteur/2, 0, Math.PI*2, false);
        
        ctx.fill();
        ctx.closePath();

        //dessin du cercle droit
        ctx.beginPath();
        ctx.fillStyle = this.couleur;
        ctx.arc(this.positionX +this.#longueur , this.positionY+ (this.#hauteur/2), this.#hauteur/2, 0, Math.PI*2, false);
        
        ctx.fill();
        ctx.closePath();

        // on calcule la nouvelle position
        super.nouvelPosition();
        //on ecoute le clavier
        this.ecouteClavier();
        //on ecoute la souris
        this.ecouteSouris();
        //on regarde qu'on ne depasse pas les bord du canvas
        this.limitationBordure();
        
    }

    /**
     * Fonction servant à limiter les deplacements de la raquette à la limite de la zone de jeux
     */
    limitationBordure(){
        //limitation à gauche
        if (this.positionX <= 0 + (this.#hauteur/2)){
            this.positionX = 0 + (this.#hauteur/2);
        }
        //limitation à droite
        if (this.positionX >= this.#canvas.width - this.#longueur - (this.#hauteur/2)){
            this.positionX = this.#canvas.width - this.#longueur - (this.#hauteur/2);
        }
    }

    /**
     * Fonction ecoutant les apuie sur touche du clavier,
     * si la touche du clavier droit du est activé l'attribut flecheDroiteActive est
     * mis à vrais, si la fleche gauche est activé alors l'attribut flecheGaucheActive
     * est mis à vrais, cette fonction met à jour les attribut d'une raquette
     */
    ecouteApuieTouche(touche){
        //on ecoute l'apuie de la touche fleche droite
        if(touche.key == "Right" || touche.key == "ArrowRight") {
            this.#flecheDroiteActive = true;
        }
        //on ecoute l'apuie de touche fleche gauche
        else if(touche.key == "Left" || touche.key == "ArrowLeft") {
            this.#flecheGaucheActive = true;
        }
        

    }

    /**
     * ecoute relacherment touche si la fleche droite est relaché alors l'attribut flecheDroite est mis a false
     * si la touche gauche est relaché son attribut est mis à false, cette fonction met à jour les attribut d'une raquette
     */
    ecouteRelachementTouche(touche){
        //on ecoute le relachement de la touche fleche droite
        if(touche.key == "Right" || touche.key == "ArrowRight") {
            this.#flecheDroiteActive = false;
        }
        //on ecoute le relachement de la touche fleche gauche
        else if(touche.key == "Left" || touche.key == "ArrowLeft") {
            this.#flecheGaucheActive = false;
        }
        
    }


    /**
     * methode indiquant si la raquette doit se deplacer ou non
     */
    ecouteClavier(){
        //on regarde si le deplacement droit est activé
        if (this.#flecheDroiteActive && !this.#flecheGaucheActive){
            this.directionX = 1; // on met la valeur x du vecteur de position à 1 (deplacement droit)
        }else if(!this.#flecheDroiteActive && this.#flecheGaucheActive){
            this.directionX = -1; // on met la valeur x du vecteur de position à -1 (deplacement gauche)
        }else{
            this.directionX = 0;// on met la valeur x du vecteur de position à -1 (ne bouge pas)
        }
    }

    /**
     * Fonction activant l'attribut souris Active si 
     * un click est effectué
     */
    ecouteClicSouris(){
        this.#sourisActive = true;
       
    }

    /**
     * Fonction desactivant l'attribut souris Active si 
     * le clic est relaché
     */
    ecouteRelacheClickSouris(){
        this.#sourisActive = false;
    }

    /**
     * Fonction s'activant sur le déplacement de la sourris indique sa postion X 
     */
    ecouteMouvementSouris(e){
        let rect = canvas.getBoundingClientRect();
        this.#positionXSouris = e.clientX - rect.left;
    }

    /**
     * Methode plaçant la raquette sur l'axe x de la souris si c'elle si se trouve dans le canvas et que son
     * clic est activé
     */
    ecouteSouris(){
        if (this.#sourisActive){
            this.positionX = (this.#positionXSouris - this.#longueur/2) * 3; // position de la souris non exacte à revoir
        }
    }

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