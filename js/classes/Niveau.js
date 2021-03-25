/*
 * Classe Niveau, cette classe va généré le rendue du niveau 
 * un niveau est constitué d'une difficulté, d'un score et d'un etat ainsi
 * qu'un canvas et de sa zone de dessin.
 * etat = 0 si le niveau, etat = 1 si le niveau est finis avec succés,
 * etat = 3 si le niveau se finis par un gameOver.
 * Un niveau est constitué d'une liste de briques générés procéduralement,d'une raquette et d'une liste
 * de balle
 */
class Niveau {
    /* canvas du niveau */
    #canvas;

    /* ctx (contenue du canvas) du niveau */
    #ctx;
    
    /* difficulté du niveau exprimé en entier */
    #difficulte;

    /* score du niveau */
    #score;

    /* etat du niveau */
    #etat;

    /* Collections des briques du niveau */
    #briques

    /*raquette du niveau */
    #raquette

    /*balles du niveau */
    #balles;

    /*Score */
    #zoneTextScore;

    #vie;

    #zoneTextVie;

    #ListBonus;


    /**
     * Constructeur innitialisant un niveau avec un canvas son contenus
     * et une difficulté. score et etat son initialisé à 0.
     * @param {Canvas} canvas 
     * @param {*} ctx 
     * @param {Integer} dificulte 
     */
    constructor(canvas,ctx,difficulte,score,vie){
        
        let longueurRaquette = 100;
        let hauteurRaquette = 15;
        let postionXRaquette = (canvas.width-longueurRaquette)/2;
        let postionYRaquette = (canvas.height - hauteurRaquette - 60);
        let couleurRaquette = '#'+(Math.random()*0xFFFFFF<<0).toString(16);
        
        this.#canvas = canvas;
        this.#ctx = ctx;
        this.#difficulte = difficulte;
        
        this.#score = score;
        this.#vie = vie;

        this.#etat = 0;
        this.#zoneTextScore = new Msg(15,canvas.height-10,"#2AE5EE");

        this.#zoneTextVie = new Msg(canvas.width - 150,canvas.height-10,"#2AE5EE");

        this.#briques = new Array();
        this.#balles = new Array();
        this.#ListBonus = new Array();
        this.#raquette = 
            new Raquette(postionXRaquette,postionYRaquette,couleurRaquette,7,0,0,hauteurRaquette,longueurRaquette,this.#canvas);

        const instanceObjet = this;
        document.addEventListener("keydown",function(touche){instanceObjet.ecouteApuieTouche(touche);}, false);

    }


    get etat(){
        return this.#etat;
    }

    get score(){
        return this.#score;
    }

    get vie(){
        return this.#vie;
    }

    set vie(nouvelleVie){
        this.#vie = nouvelleVie;
    }

    get ctx(){
        return this.#ctx;
    }

    get raquette(){
        return this.#raquette;
    }

    /**
     * methode start démarant le jeux sur le niveau. La fonction commence par
     * générer une liste de briques puis elle va déssiner la partie jusqu'à qu'elle
     * soit finis(par une réussite ou un échec)
     */
    async start(){
        
        this.generationNiveau();
        this.nouvelleBalle();

        do {
            this.#balles.forEach(balle => this.attenteBalle(balle));
            this.#ctx.clearRect(0, 0, this.#canvas.width, this.#canvas.height);
            this.#briques.forEach(brique => brique.draw(ctx));
            this.#balles.forEach(balle => this.#score += balle.draw(this.#ctx,this.#canvas,this.#briques,this.#raquette));
            this.#raquette.draw(this.#ctx,this.#canvas);
            this.#ListBonus.forEach(bonus => bonus.draw());
            //fonction netoyage qui suprime les briques detruites et les balles perdu des listes
            this.netoyage();
            if (this.#vie > 0 && this.#balles.length == 0){
                this.#raquette.positionX = (this.#canvas.width- this.#raquette.longueur)/2;
                this.#raquette.positionY = this.#canvas.height - this.#raquette.hauteur - 60;
                this.nouvelleBalle();
            }
            //fonction rafraichissant l'etat en cours de la partie 
            
            this.updateEtat();
            
            
            //temps attente entre chaque frame
            //console.log(this.#score);
            this.#zoneTextScore.draw(this.#ctx,`Score : ${this.#score}`);
            this.#zoneTextVie.draw(this.#ctx,`Vie : ${this.#vie}`);
            
            await sleep(1);

            

        }while(this.#etat == 0);

    }

    /**+
     * 
     */
    generationNiveau(){
        let yDebut = 100;
        let xDebut = 55;
        let matrice = new Array(12);
        //declaration de la matrice
        for (let i = 0; i < matrice.length ; i++){
            matrice[i] = new Array(10);
        }
        //generation de la matrice
        for (let i = 0; i < matrice.length ; i++){
            for (let compteur = 0; compteur < (matrice[i].length /2); compteur ++){
                if (Math.random()>0.45){
                    matrice[i][compteur] = getRandomInt(this.#difficulte * 3);
                    matrice[i][matrice[i].length-1 - compteur ] =matrice[i][compteur];
                }else{
                    matrice[i][compteur] = 0;
                    matrice[i][matrice[i].length-1 - compteur] = 0;
                }
            }
        }
        //interpretation de la matrice
        for (let i = 0; i < matrice.length ; i++){
            for (let compteur = 0; compteur < matrice[i].length ; compteur ++){
                if (matrice[i][compteur]>0){
                    this.#briques.push( new Brique(xDebut,yDebut,('#'+(Math.random()*0xFFFFFF<<0).toString(16)),50,100,matrice[i][compteur]));
                }
                xDebut = xDebut + 110;
            }
            xDebut= 55;
            yDebut = yDebut +60;
            
        }

    }

    /**
     * Fonction qui va "netoyer" les liste d'objet briques et balles lorqu'un objet n'est plus utile
     * pour les balles on regarde simplement si elles sont en dehors du champs et pour les 
     * briques on regarde si leurs point de vie et inferieur ou egal à 0
     */
    netoyage(){
        let elementSupr;
        let i = 0;
        //netoyage des balles
        while(i <this.#balles.length){
            if (this.#balles[i].enVie == false){
                elementSupr = this.#balles.splice(i,1);
                if ( this.#balles.length == 0){
                    this.#vie --;
                }
            }else{
                i++;
            }
        }

        //netoyage des bonus
        i == 0;
        while(i <this.#ListBonus.length){
            
            if (this.#ListBonus[i].positionY > this.#canvas.height || this.#ListBonus[i].estUtilise){
                
                
                elementSupr = this.#ListBonus.splice(i,1);
                
            }else{
                i++;
            }
        }



        //netoyage des briques
        i = 0;
        while(i <this.#briques.length){
            if (this.#briques[i].vie <= 0){
                if (Math.random()>0.90){
                    this.#ListBonus.push(
                        new Bonus(this.#briques[i].positionX + this.#briques[i].largeur/2,
                                  this.#briques[i].positionY + this.#briques[i].hauteur/2,
                                  '#'+(Math.random()*0xFFFFFF<<0).toString(16),1,0,1,this));
                }
                elementSupr = this.#briques.splice(i,1);
            }else{
                i++;
            }
        }
    }

    /**
     * Fonction mettant à jour l'etat actuel du niveau. Si la liste des briques est vide alors le niveau est
     * gagné, si par contre il n'y a plus de balles alors le niveau est perdu
     */
    updateEtat(){
        //on regarde si il n'y a plus de brique
        
        if (this.#briques.length == 0){
            this.#etat = 1;
            console.log("gg tu as gagné");
        }
        
        
        //on regarde si le nb de vie = 0
        if (this.#vie <= 0){
            this.#etat = 2;
            console.log("perdu tu es movais");
        }


    }

    nouvelleBalle(){
        
        let balle = new Balle(600,1100,('#'+(Math.random()*0xFFFFFF<<0).toString(16)),0,1,1,25,1);
        this.#balles.push(balle);        


    }

    attenteBalle(balle){
        if (balle.vitesse == 0){
            balle.positionX = this.#raquette.positionX + this.#raquette.longueur/2;
        }
    }

    /**
     * Fonction ecoutant les apuie sur touche du clavier,
     * si la touche du clavier droit du est activé l'attribut flecheDroiteActive est
     * mis à vrais, si la fleche gauche est activé alors l'attribut flecheGaucheActive
     * est mis à vrais, cette fonction met à jour les attribut d'une raquette
     */
         ecouteApuieTouche(touche){
           let unLancement = false;
            if(touche.key == " " ) {
                for(let i = 0 ; i < this.#balles.length; i++){
                    if (this.#balles[i].vitesse == 0 && !unLancement){
                        this.#balles[i].vitesse = 2 + this.#difficulte/2 - 1;
                        unLancement= true;
                    }
                }
            }
            
    
        }
}
