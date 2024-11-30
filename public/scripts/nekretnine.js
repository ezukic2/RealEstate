function spojiNekretnine(divReferenca, instancaModula, tip_nekretnine) {

    // pozivanje metode za filtriranje
    let filtriraneNekretnine = instancaModula.filtrirajNekretnine({ tip_nekretnine: tip_nekretnine });
    divReferenca.innerHTML=``;
    
    // iscrtavanje elemenata u divReferenca element
    filtriraneNekretnine.forEach(function(nekretnina){
        const nekretninaDiv = document.createElement("div");

        if(tip_nekretnine === "Stan") 
            nekretninaDiv.classList.add("nekretnina-stan");

          if(tip_nekretnine === "Kuća") 
            nekretninaDiv.classList.add("nekretnina-kuca");

        if(tip_nekretnine === "Poslovni prostor") 
            nekretninaDiv.classList.add("nekretnina-pp");

            /*let klikovi = klikovipretrage.find(nekr => {
              if(nekr.id === nekretnina.id) return nekr.brojKlikova;
            }); 
            let pretrage = klikovipretrage.find(nekr => {
              if(nekr.id === nekretnina.id) return nekr.brojPretraga;
            });  
              <p id="pretrage-idNekretnine"><b>Broj pretraga: </b>${pretrage}</p>
            <p id="klikovi-idNekretnine"><b>Broj klikova: </b>${klikovi}</p>
            */
           
           /*<a href="#" id="dugme-${nekretnina.id}">Detalji</a>*/
          
          nekretninaDiv.innerHTML = `
          <div id="nekretnina-${nekretnina.id}">
        <img src="https://trust.ba/wp-content/uploads/2020/12/FB_IMG_1480860923097.jpg">
        <p class = "naziv" ><b>Naziv: </b>${nekretnina.naziv}</p>
        <p class = "kvadratura" ><b>Kvadratura: </b>${nekretnina.kvadratura} m²</p>
        <p class = "cijena" ><b>Cijena: </b>${nekretnina.cijena} KM</p>
        <button class="detalji-dugme" onclick="prikaziDetalje(${nekretnina.id})">Detalji</button>
        <div class="detalji-div" id="detalji-${nekretnina.id}" style="display:none">
        <p class="lokacija"><b>Lokacija: </b>${nekretnina.lokacija}</p>
          <p class="godina-izgradnje"><b>Godina izgradnje: </b>${nekretnina.godina_izgradnje}</p>
          <button class="otvori-detalje" id="otvori" onclick="otvoriDetalje(${nekretnina.id})">Otvori detalje</button>
        </div>
        </div>
        `;
        
        divReferenca.appendChild(nekretninaDiv);
      });
    }
    
    function prikaziDetalje(nekretninaId){
    const detaljiDiv = document.getElementById(`detalji-${nekretninaId}`);

    if (detaljiDiv.style.display === 'none') {
      detaljiDiv.style.display = 'block';
    } else {
        detaljiDiv.style.display = 'none';
    }
    }

    function otvoriDetalje(nekretninaId){
      window.location.href = `detalji.html?id=${nekretninaId}`;
    }

    const divStan = document.getElementById("stan");
    const divKuca = document.getElementById("kuca");
    const divPp = document.getElementById("pp");
    
    let listaKorisnika;
    let listaNekretnina;
    let nekretnine = SpisakNekretnina();
    let nekretnineFilter=SpisakNekretnina();
    
    window.addEventListener("DOMContentLoaded", () => {
      const el = document.getElementById('dugmePretraga');
      if (el) {
        el.addEventListener('click', pretraga);
      }
    });    
    
      PoziviAjax.getNekretnine(function (err, data) {
        listaNekretnina = data;
        nekretnine.init(listaNekretnina, listaKorisnika);
        pretraga();
      });
      
      function pretraga() {
        const minCijena = document.getElementById('minCijena').value;
        const maxCijena = document.getElementById('maxCijena').value;
        const minKvadratura = document.getElementById('minKvadratura').value;
        const maxKvadratura = document.getElementById('maxKvadratura').value;
        
        const kriteriji = {
                  min_cijena: minCijena ? parseInt(minCijena) : undefined,
                  max_cijena: maxCijena ? parseInt(maxCijena) : undefined,
                  min_kvadratura: minKvadratura ? parseInt(minKvadratura) : undefined,
                  max_kvadratura: maxKvadratura ? parseInt(maxKvadratura) : undefined,
                };
                filtriraneNekretnine=nekretnine.filtrirajNekretnine(kriteriji);
                nekretnineFilter.init(filtriraneNekretnine, listaKorisnika);
                
              // Prikazi filtrirane nekretnine nakon pretrage
              spojiNekretnine(divStan, nekretnineFilter, "Stan");
              spojiNekretnine(divKuca, nekretnineFilter, "Kuća");
              spojiNekretnine(divPp, nekretnineFilter, "Poslovni prostor");
      }