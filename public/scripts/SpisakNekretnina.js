let SpisakNekretnina = function () {
    // privatni atributi modula
    let listaNekretnina = [];
    let listaKorisnika = [];

    // implementacija metoda
    let init = function (listaNekretnina, listaKorisnika) {
        this.listaNekretnina = listaNekretnina;
        this.listaKorisnika = listaKorisnika;
    };

    let filtrirajNekretnine = function (kriterij) {
        if (!this.listaNekretnina)
            return [];

        if(!kriterij)
            return this.listaNekretnina;    
        
        return this.listaNekretnina.filter(nekretnina => {
            if (kriterij.tip_nekretnine && nekretnina.tip_nekretnine !== kriterij.tip_nekretnine)
                return false;

            if (kriterij.min_kvadratura && nekretnina.kvadratura < kriterij.min_kvadratura)
                return false;

            if (kriterij.max_kvadratura && nekretnina.kvadratura > kriterij.max_kvadratura) 
                return false;

            if (kriterij.min_cijena && nekretnina.cijena < kriterij.min_cijena) 
                return false;

            if (kriterij.max_cijena && nekretnina.cijena > kriterij.max_cijena) 
                return false;

            return true;
        });
    };

    let ucitajDetaljeNekretnine = function (id) {
        return this.listaNekretnina.find(nekretnina => nekretnina.id === id) || null;
    };

    return {
        init: init,
        filtrirajNekretnine: filtrirajNekretnine,
        ucitajDetaljeNekretnine: ucitajDetaljeNekretnine
    };
};