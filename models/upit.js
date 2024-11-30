module.exports = (sequelize, DataTypes) => {

    const Upit = sequelize.define('Upit',
    {
        tekst_upita: DataTypes.STRING,
        nekretnina_id: DataTypes.INTEGER,
        korisnik_id: DataTypes.INTEGER
    },
    {
        freezeTableName: true,
        createdAt: false,
        updatedAt: false
    })

    return Upit;
}