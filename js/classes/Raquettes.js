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

    /* renvoie la longueur de la raquette */
    get longueur(){
        return this.#longueur;
    }

    /* renvoie la hauteur de la raquette */
    get hauteur(){
        return this.#hauteur;
    }
    /**
     * Methode dessinant une raquette, une raquette et la superposition d'un rectangle 
     * et de 2 cercle placée aux extrimité de la raquette de fàçon à avoir des bout arrondit
     */
    draw(ctx){
       
        //Dessin du rectange
        ctx.beginPath();
        ctx.rect(this.positionX, this.positionY, this.#longueur, this.#hauteur);
        ctx.fillStyle = this.couleur;
        ctx.fill();
        ctx.closePath();

        //dessin du cercle gauche
        ctx.beginPath();
        ctx.arc(this.positionX , this.positionY+ (this.#hauteur/2), this.#hauteur/2, 0, Math.PI*2, false);
        ctx.fillStyle = this.couleur;
        ctx.fill();
        ctx.closePath();

        //dessin du cercle droit
        ctx.beginPath();
        ctx.arc(this.positionX +this.#longueur , this.positionY+ (this.#hauteur/2), this.#hauteur/2, 0, Math.PI*2, false);
        ctx.fillStyle = this.couleur;
        ctx.fill();
        ctx.closePath();


        
        super.nouvelPosition();
        this.ecouteClavier();
        this.ecouteSouris();
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
        
        if(touche.key == "Right" || touche.key == "ArrowRight") {
            this.#flecheDroiteActive = true;
        }
        else if(touche.key == "Left" || touche.key == "ArrowLeft") {
            this.#flecheGaucheActive = true;
        }
        

    }

    /**
     * ecoute relacherment touche si la fleche droite est relaché alors l'attribut flecheDroite est mis a false
     * si la touche gauche est relaché son attribut est mis à false, cette fonction met à jour les attribut d'une raquette
     */
    ecouteRelachementTouche(touche){
        if(touche.key == "Right" || touche.key == "ArrowRight") {
            this.#flecheDroiteActive = false;
        }
        else if(touche.key == "Left" || touche.key == "ArrowLeft") {
            this.#flecheGaucheActive = false;
        }
        
    }


    /**
     * methode indiquant si la raquette doit se deplacer ou non
     */
    ecouteClavier(){
        if (this.#flecheDroiteActive && !this.#flecheGaucheActive){
            this.directionX = 1;
        }else if(!this.#flecheDroiteActive && this.#flecheGaucheActive){
            this.directionX = -1;
        }else{
            this.directionX = 0;
        }
    }

    /**
     * Fonction activant l'attribut souris Active si 
     * un click est effectué
     */
    ecouteClicSouris(){
        this.#sourisActive = true;
        console.log(this.#positionXSouris);
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
     * clic soit activé
     */
    ecouteSouris(){
        if (this.#sourisActive){
            this.positionX = (this.#positionXSouris - this.#longueur/2) * 3;
        }
    }

 

}