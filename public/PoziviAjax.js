const PoziviAjax = (() => {
    // fnCallback se u svim metodama poziva kada stigne
    // odgovor sa servera putem Ajax-a
    // svaki callback kao parametre ima error i data,
    // error je null ako je status 200 i data je tijelo odgovora
    // ako postoji greška, poruka se prosljeđuje u error parametru
    // callback-a, a data je tada null
    // vraća korisnika koji je trenutno prijavljen na sistem
    function impl_getKorisnik(fnCallback) {
        var xhttp = new XMLHttpRequest();
        
        xhttp.onreadystatechange = function () {
          if (xhttp.readyState === 4 && xhttp.status === 200) {
            var json = JSON.parse(xhttp.responseText);
            fnCallback(null, json);
          } else {
            fnCallback(xhttp.responseText, null);
          }
        };
        
        xhttp.open("GET", 'http://localhost:3000/korisnik', true);
        xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhttp.send();
    }

    function impl_putKorisnik(noviPodaci, fnCallback) {
      const xhttp = new XMLHttpRequest();
        xhttp.open('PUT', 'http://localhost:3000/korisnik', true);
        xhttp.setRequestHeader('Content-Type', 'application/json');

        xhttp.onreadystatechange = function() {
          if (xhttp.readyState === 4 && xhttp.status === 200) {
            fnCallback(null, noviPodaci);
          } else {
            fnCallback(xhttp.statusText, null);
          }
        };
        xhttp.send(JSON.stringify(noviPodaci));
    }
    function impl_postUpit(nekretnina_id, tekst_upita, fnCallback) {
      const xhttp = new XMLHttpRequest();
        xhttp.open('POST', 'http://localhost:3000/upit', true);
        xhttp.setRequestHeader('Content-Type', 'application/json');

        xhttp.onreadystatechange = function() {
          if (xhttp.readyState === 4 && xhttp.status === 200) {
            fnCallback(null, {
              nekretnina_id,
              tekst_upita
            });
          } else {
            fnCallback(xhttp.statusText, null);
          }
        };
        xhttp.send(JSON.stringify({
          nekretnina_id,
          tekst_upita
        }));
    }
    function impl_getNekretnine(fnCallback) {
      var xhttp = new XMLHttpRequest();
        xhttp.open("GET", 'http://localhost:3000/nekretnine', true);
        xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

        xhttp.onreadystatechange = function () {
        if (xhttp.readyState === 4 && xhttp.status === 200) {
          var json = JSON.parse(xhttp.responseText);
          fnCallback(null, json);
        } else {
          fnCallback(xhttp.statusText, null);
        }
    };

    xhttp.send();
    }

    function impl_postLogin(username, password, loginCallback) {
        const xhttp = new XMLHttpRequest();
        
        xhttp.onreadystatechange = function() {
          if (xhttp.readyState === 4 && xhttp.status === 200) {
          loginCallback(null, {
              username,
              password
            });
          } else {
            loginCallback(xhttp.statusText, null);
          }
        };
        xhttp.open('POST', '/login', true);
        xhttp.setRequestHeader('Content-Type', 'application/json');
        xhttp.send(JSON.stringify({
          username,
          password
        }));
      }

      function impl_postLogout(fnCallback) {
      const xhttp = new XMLHttpRequest();
        xhttp.open('POST', 'http://localhost:3000/logout', true);
        xhttp.setRequestHeader('Content-Type', 'application/json');

        xhttp.onreadystatechange = function() {
          if (xhttp.readyState === 4 && xhttp.status === 200) {
            fnCallback(null, null);
          } else {
            fnCallback(xhttp.statusText, null);
          }
        };
        xhttp.send();
    }
    function impl_getNekretninaById(nekretnina_id, fnCallback) {
      var xhttp = new XMLHttpRequest();
        xhttp.open("GET", `http://localhost:3000/nekretnina/${nekretnina_id}`, true);
        xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

        xhttp.onreadystatechange = function () {
        if (xhttp.readyState === 4 && xhttp.status === 200) {
          var json = JSON.parse(xhttp.responseText);
          fnCallback(null, json);
        } else {
          fnCallback(xhttp.statusText, null);
        }
    };

    xhttp.send();
    }
    return {
    postLogin: impl_postLogin,
    postLogout: impl_postLogout,
    getKorisnik: impl_getKorisnik,
    putKorisnik: impl_putKorisnik,
    postUpit: impl_postUpit,
    getNekretnine: impl_getNekretnine,
    getNekretninaById: impl_getNekretninaById
    };
    })();