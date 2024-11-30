const korisnickoIme=document.getElementById("username");
const sifra=document.getElementById("password");


function loadMenu(cn) {
  const xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState === 4 && this.status === 200) {  
      if(cn)
    window.location.href="/nekretnine.html";
    }
  };
  xhttp.open('GET', '/meni.html', true);
  xhttp.send();
}

const loginCallback = (error, data) =>{
  if (error===null) {
    loadMenu(true);
    //window.location.href="/prijava.html";
  } else {
    console.error('Greška pri prijavi:', error);
  }
}
const logoutCallback = (error, data) =>{
  if (error===null) {
    loadMenu(true);
    //window.location.href="/profil.html";
  } else {
    console.error('Greška pri odjavi:', error);
  }
}

document.addEventListener('DOMContentLoaded', loadMenu(false));

const prijavaDugme=document.getElementById("prijavaDugme");
const odjavaDugme=document.getElementById("dugmeOdjava");

/*
prijavaDugme.addEventListener("click", ()=>{
  PoziviAjax.postLogin(korisnickoIme.value, sifra.value, loginCallback);
  //PoziviAjax.getKorisnik(updateMenu);
});
*/
function prijava() {
  PoziviAjax.postLogin(korisnickoIme.value, sifra.value, loginCallback);
}
/*
odjavaDugme.addEventListener("click", ()=>{
  PoziviAjax.postLogout(logoutCallback);
  //PoziviAjax.getKorisnik(updateMenu);
});
*/
function odjava (){
  PoziviAjax.postLogout(logoutCallback);
}




 /*
 document.getElementById('dugmePrijava').addEventListener('click', prijava);
 function prijava() {   
  PoziviAjax.postLogin(username, password, function (error, data) {
    if (error) {
      console.error('Greška prilikom prijave:', error);
    } else {
      console.log('Uspješna prijava:', data);
      
      const menuDocument = document.getElementById('menu');
      menuDocument.getElementById('prijava').style.display = 'none';
      menuDocument.getElementById('odjava').style.display = 'block';
      menuDocument.getElementById('profil').style.display = 'block';
      window.location.replace('/profil.html');
    }
  });
}


function odjava() {

  PoziviAjax.postLogout(function (error, data) {
    if (error) {
      console.error('Greška prilikom odjave:', error);
    } else {
      console.log('Uspješna odjava:', data);
      const menuDocument = document.getElementById('menu');
      menuDocument.getElementById('prijava').style.display = 'block';
      menuDocument.getElementById('odjava').style.display = 'none';
      menuDocument.getElementById('profil').style.display = 'none';
      window.location.replace("http://localhost:3000/prijava.html");
    }
  });
}

*/
     /*
     PoziviAjax.getKorisnik(function(err, data){
       if(err===null){
        prijavaButton.style.display = "none";
          odjavaButton.style.display = "block";
          profilLink.style.display = "block";
         
        }
        else{
          odjavaButton.style.display='none';
         prijavaButton.style.display = 'block';
         profilLink.style.display = 'none';
          
        }
      });*/
