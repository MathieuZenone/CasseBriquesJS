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


    /**
     * Constructeur innitialisant un niveau avec un canvas son contenus
     * et une difficulté. score et etat son initialisé à 0.
     * @param {Canvas} canvas 
     * @param {*} ctx 
     * @param {Integer} dificulte 
     */
    constructor(canvas,ctx,difficulte){
        let longueurRaquette = 100;
        let hauteurRaquette = 15;
        let postionXRaquette = (canvas.width-longueurRaquette)/2;
        let postionYRaquette = (canvas.height - hauteurRaquette - 20);
        let couleurRaquette = '#'+(Math.random()*0xFFFFFF<<0).toString(16);
        
        this.#canvas = canvas;
        this.#ctx = ctx;
        this.#difficulte = difficulte;
        this.#score = 0;
        this.#etat = 0;

        this.#briques = new Array();
        this.#balles = new Array();
        this.#raquette = 
            new raquette(postionXRaquette,postionYRaquette,couleurRaquette,7,0,0,hauteurRaquette,longueurRaquette,this.#canvas);

    }


    get etat(){
        return this.#etat;
    }

    

    /**
     * methode start démarant le jeux sur le niveau. La fonction commence par
     * générer une liste de briques puis elle va déssiner la partie jusqu'à qu'elle
     * soit finis(par une réussite ou un échec)
     */
    async start(){
        this.generationNiveau();
        let balle = new Balle(60,60,('#'+(Math.random()*0xFFFFFF<<0).toString(16)),3,0.9,1,25,5);
        let balle2 = new Balle(600,60,('#'+(Math.random()*0xFFFFFF<<0).toString(16)),3,0.5,0.7357,25,5);
        let balle3 = new Balle(60,600,('#'+(Math.random()*0xFFFFFF<<0).toString(16)),3,-1.2,0.7357,25,5);
        let balle4 = new Balle(600,600,('#'+(Math.random()*0xFFFFFF<<0).toString(16)),3,1.2,-0.7357,25,5);
        this.#balles.push(balle);
        this.#balles.push(balle2);
        this.#balles.push(balle3);
        this.#balles.push(balle4);
        do {
            this.#ctx.clearRect(0, 0, this.#canvas.width, this.#canvas.height);
            //briques.forEach(brique => brique.draw(ctx,canvas,balles));
            this.#balles.forEach(balle => balle.draw(this.#ctx,this.#canvas,this.#balles,this.#briques,this.#raquette));
            this.#raquette.draw(this.#ctx,this.#canvas);
            //fonction netoyage qui suprime les briques detruites et les balles perdu des listes
            this.netoyage();
            //fonction rafraichissant l'etat en cours de la partie 
            this.updateEtat();
            //temps attente entre chaque frame
            await sleep(1);
        }while(this.#etat == 0);

    }

    /**
     * Fonction généran procéduralement une liste de briques
     */
    generationNiveau(){
        //TODO coder la methode
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
                console.log("SUPPR");
            }else{
                i++;
            }
        }


        //netoyage des briques
        i = 0;
        while(i <this.#briques.length){
            if (1==0){
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
        /*//on regarde si il n'y a plus de brique
        if (this.#briques.length == 0){
            this.#etat = 1;
            console.log("gg tu as gagné");
        }
        */
        
        //on regarde si il n'y a plus de balle
        if (this.#balles.length == 0){
            this.#etat = 2;
            console.log("perdu tu es movais");
        }


    }
}
