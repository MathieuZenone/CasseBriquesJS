// TODO: comment class role
class Joueur {
    #nom;
    #vies;

    constructor( nom, vies ) {
        this.nom = nom;
        this.vies = vies;
    }

    #lorsqueDecrementeVie() {
        if ( this.vies <= 0 ) {
            this.#Meurt();
        }
    }

    #Meurt() {
        
        this.lorsqueMeurt();
    }

    lorsqueMeurt() {
        // TO OVERRIDE
    }


    // Décrémente la vie du joueur
    decrementeVie() {
        this.vies--;

        this.#lorsqueDecrementeVie();
    }

    // Getters & Setters
    getVies() {
        return this.vies
    }
    
}