function getNekretninaIdFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    const nekretninaId = urlParams.get('id');
    return nekretninaId;
}

const nekretninaId = getNekretninaIdFromUrl();

popuniDetalje(nekretninaId);

function popuniDetalje(nekretninaId) {
    PoziviAjax.getNekretninaById(nekretninaId, function(err, nekretnina) {
        if (err) {
            return;
        }

        document.getElementById('detaljiNaziv').textContent = nekretnina.naziv;
        document.getElementById('detaljiKvadratura').textContent = nekretnina.kvadratura;
        document.getElementById('detaljiCijena').textContent = nekretnina.cijena;
        document.getElementById('detaljiTipGrijanja').textContent = nekretnina.tip_grijanja;
        document.getElementById('detaljiGodinaIzgradnje').textContent = nekretnina.godina_izgradnje;
        document.getElementById('detaljiLokacija').textContent = nekretnina.lokacija;
        document.getElementById('detaljiDatumObjave').textContent = nekretnina.datum_objave;
        document.getElementById('detaljiOpis').textContent = nekretnina.opis;

        const detaljiUpiti = document.getElementById('detaljiUpiti');
        detaljiUpiti.innerHTML = '';
        nekretnina.upiti.forEach(function(upit) {
            const li = document.createElement('li'); 
            li.innerHTML = `
                <p class="korisnik"><b>${upit.korisnik_id}</b></p>
                <p class="upit">${upit.tekst_upita}</p>
            `;
            detaljiUpiti.appendChild(li);
        });
    });
}


