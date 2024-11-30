const express = require('express');
const bcrypt = require('bcrypt');
const session = require('express-session');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const korisnici = require('./data/korisnici.json');
const nekretnine = require('./data/nekretnine.json');
const klikovipretrage = require('./data/klikovipretrage.json');
const db = require('./models/db');
const {Korisnik, Nekretnina, Upit} = db.models;

const app = express();

// Postavke sesije
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true,
  cookie: {maxAge: 3600000}
}));

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
// Postavke za parsiranje JSON tijela zahtjeva
app.use(express.json());

// Postavke za serviranje statičkih datoteka iz 'public' direktorija
app.use(express.static(path.join(__dirname, 'public')));

(async () => {
  await db.sequelize.sync();
})();

// Implementacija ruta

// Ruta za prijavu
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  let trazeniKorisnik = await Korisnik.findOne({
    where: {
        username : username
    }
})
  
  let validan;
  if(!trazeniKorisnik) {
    return res.status(401).json({greska:'Neuspješna prijava'});
  }
  else{
    validan = await bcrypt.compare(password, trazeniKorisnik.password);
  }
  if(!validan){
    return res.status(401).json({greska:'Neuspješna prijava'});
  }
  req.session.username = trazeniKorisnik.username;
  return res.status(200).json({poruka:'Uspješna prijava'});

});

// Ruta za odjavu
app.post('/logout', async (req, res) => {
    if(!req.session.username) {
        return res.status(401).json({ greska: 'Neautorizovan pristup' });
    }
    else {
        req.session.destroy((err) => {
            return res.status(200).json({ poruka: 'Uspješno ste se odjavili' });
        });
      }
});

// Ruta za dohvat podataka o korisniku
app.get('/korisnik', async (req, res) => {
    if (!req.session.username) {
        return res.status(401).json({ greska: 'Neautorizovan pristup' });
      } 
      let trazeniKorisnik = await Korisnik.findOne({
        where: {
            username : req.session.username
        }
    })
        return res.status(200).json(trazeniKorisnik);
});

// Ruta za postavljanje upita
app.post('/upit', async (req, res) => {
    const {nekretnina_id, tekst_upita} = req.body;
    if (!req.session.username) {
        return res.status(401).json({ greska: 'Neautorizovan pristup' });
    } 
    let trazeniKorisnik = await Korisnik.findOne({
      where: {
          username : req.session.username
      }
  })

  let trazenaNekretnina = await Nekretnina.findOne({
    where: {
        id : nekretnina_id
    }
})

      if(!trazenaNekretnina){
        return res.status(400).json({greska:`Nekretnina sa id-em ${nekretnina_id} ne postoji`});
      }
      else{
        await Upit.create({
          tekst_upita,
          nekretnina_id,
          korisnik_id:trazeniKorisnik.id
        })
      }

      return res.status(200).json({poruka:'Upit je uspješno dodan'});


});

// Ruta za ažuriranje korisničkih podataka
app.put('/korisnik', async (req, res) => {
    if (!req.session.username) {
        return res.status(401).json({ greska: 'Neautorizovan pristup' });
    } 
    const {ime, prezime, username, password}=req.body;

    let trenutniKorisnik = await Korisnik.findOne({
        where: {
            username : req.session.username
        }
    })
    if(ime) trenutniKorisnik.ime=ime;
    if(prezime) trenutniKorisnik.prezime=prezime;
    if(username) trenutniKorisnik.username=username;
    if(password) trenutniKorisnik.password=await bcrypt.hash(password,10);
    
    await Korisnik.update({
      ime: trenutniKorisnik.ime, 
      prezime: trenutniKorisnik.prezime,
      username: trenutniKorisnik.username,
      password: trenutniKorisnik.password
  },
      {
          where: {
              username : req.session.username
          }
      })

    res.status(200).json({ poruka: 'Podaci su uspješno ažurirani' });
});

// Ruta za dohvat svih nekretnina
app.get('/nekretnine', async (req, res) => {
  let dbnekretnine = await Nekretnina.findAll()
    let dbupiti = await Upit.findAll()
    dbnekretnine = dbnekretnine.map(nekretnina => {
        let upiti = dbupiti.filter(upit => upit.nekretnina_id == nekretnina.id)
        if(upiti.length > 0)return {
            ...nekretnina.dataValues,
            upiti: upiti
        }
        else return {
            ...nekretnina.dataValues,
            upiti: []
        }
    })
  res.status(200).json(dbnekretnine);
});


app.get('/nekretnina/:id', async (req, res) => {
    let nekretnina_id = req.params.id
    let dbnekretnina = await Nekretnina.findOne({
        where: {
            id : nekretnina_id
        }
    })
    if(!dbnekretnina) return res.status(400).json({greska: `Nekretnina sa id-em ${nekretnina_id} ne postoji!`})
    let upiti = await Upit.findAll({
        where: {
            nekretnina_id : nekretnina_id
        }
    })
    let nekretnina = {
        ...dbnekretnina.dataValues,
        upiti: upiti
    }
    return res.status(200).json(nekretnina);
});


app.get('/meni.html', (req, res) => {
  if (req.session.username) {
    res.sendFile(path.join(__dirname, 'public', 'html', 'meni2.html'));
  } else {
    res.sendFile(path.join(__dirname, 'public', 'html', 'meni3.html'));
  }
});

app.get('/:page', (req, res) => {
  const page = req.params.page;
  res.sendFile(path.join(__dirname, 'public', 'html', `${page}`));
});
/*
app.post('/marketing/nekretnine', (req, res) => {
  const { nizNekretnina } = req.body;

  for(nekr in nizNekretnina){
    klikovipretrage.find(pom=>{
      if(pom.id===nekr.id) {
        pom.pretrage=pom.pretrage+1;
      }
    })
  }

  let osvjezenePretrage = nizNekretnina.map(nekretnina=>{
    let trazenaNekr = klikovipretrage.find(nekr => {
      if(nekr.id === nekretnina.id) return nekr
    })
    if(trazenaNekr)
    trazenaNekr.pretrage=trazenaNekr.pretrage+1;

    //treba provjeriti koje pretrage iz niza klikovipretrage tj kome treba povecati broj pretraga
    // uzmemo nekretnine iz nizNekretnina i njima povecamo broj pretraga za jedan 1 u time izvrsimo update klikovipretrage
  })

  res.status(200).send();
});*/

// Pokretanje servera
app.listen(3000);
