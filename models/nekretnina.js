module.exports = (sequelize, DataTypes) => {

    const Nekretnina = sequelize.define('Nekretnina',
    {
        tip_nekretnine: DataTypes.STRING,
        naziv: DataTypes.STRING,
        kvadratura: DataTypes.INTEGER,
        cijena: DataTypes.INTEGER,
        tip_grijanja: DataTypes.STRING,
        lokacija: DataTypes.STRING,
        godina_izgradnje: DataTypes.INTEGER,
        datum_objave: DataTypes.STRING,
        opis: DataTypes.STRING,
        klikovi:DataTypes.INTEGER,
        pretrage:DataTypes.INTEGER
    },
    {
        freezeTableName: true,
        createdAt: false,
        updatedAt: false
    })

    return Nekretnina;
}