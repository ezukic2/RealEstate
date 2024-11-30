const form = document.getElementById("formaUpita");
const forma = document.getElementById("upit");
function getNekretninaIdFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    const nekretninaId = urlParams.get('id');
    return nekretninaId;
}

const nekretninaId = getNekretninaIdFromUrl();
console.log(nekretninaId);
/*
function posaljiUpit(){
    var tekst_upita = document.getElementById('tekst_upita').value;
    PoziviAjax.postUpit(nekretninaId, tekst_upita, function(error, data) {
        if(err){
            console.log.error;
        }
        else{
        window.location.href=`http://localhost:3000/detalji.html?id=${nekretninaId}`;
        }
        
        
});
}*/
/*
forma.addEventListener('submit', async (event) => {
    event.preventDefault();
    var tekst_upita = document.getElementById('tekst_upita').value;
    console.log("Pokreceeeee")
    PoziviAjax.postUpit(nekretninaId, tekst_upita, function(error, data) {
        if(error){
            console.log(error);
        }
        else{
        window.location.href=`http://localhost:3000/detalji.html?id=${nekretninaId}`;
        console.log("jggkhjghjgjkkjh", data);
        }
        
        
});
});*/
/*
PoziviAjax.getKorisnik(function(err, korisnik){
    if (err) {
        form.style.display='none';
    }
    if(korisnik){
    form.style.display='block';
    
    forma.addEventListener('submit', async (event) => {

        var tekst_upita = document.getElementById('tekst_upita').value;

        PoziviAjax.postUpit(nekretninaId, tekst_upita, function(error, data) {
            if(err){
                console.log.error;
            }
            else{
                window.location.reload();
            }
            
            
    });
});
    }else{
        form.style.display = 'none';
    }

});
*/