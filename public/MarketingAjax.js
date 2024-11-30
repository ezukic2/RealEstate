const MarketingAjax = (function () {
  
    function novoFiltriranje (listaFiltriranihNekretnina) {
        const xhttp = new XMLHttpRequest();
        
        xhttp.open('POST', 'http://localhost:3000/marketing/nekretnine', true);
        xhttp.setRequestHeader('Content-Type', 'application/json');
        xhttp.send(JSON.stringify({
          nizNekretnina:listaFiltriranihNekretnina
        }));
    };
  
    function klikNekretnina (idNekretnine) {
        const xhttp = new XMLHttpRequest();
        
        xhttp.open('POST', `http://localhost:3000/marketing/nekretnina/${idNekretnine}`, true);
        xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhttp.send();
    };
  
    return {
      osvjeziPretrage,
      osvjeziKlikove,
      novoFiltriranje,
      klikNekretnina,
    };
  })();
  