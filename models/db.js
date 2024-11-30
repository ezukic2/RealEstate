const Sequelize = require("sequelize");
const sequelize = new Sequelize("wt24","root","password",{host:"localhost",dialect:"mysql"});
const db={};

db.Sequelize = Sequelize;  
db.sequelize = sequelize;

db.models = {};
db.models.Korisnik = require('./korisnik')(sequelize, Sequelize.DataTypes);
db.models.Nekretnina = require('./nekretnina')(sequelize, Sequelize.DataTypes);
db.models.Upit = require('./upit')(sequelize, Sequelize.DataTypes);

module.exports = db;