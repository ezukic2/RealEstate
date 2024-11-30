module.exports = (sequelize, DataTypes) => {

    const Korisnik = sequelize.define('Korisnik',
    {
        ime: DataTypes.STRING,
        prezime: DataTypes.STRING,
        username: DataTypes.STRING,
        password: DataTypes.STRING,
    },
    {
        freezeTableName: true,
        createdAt: false,
        updatedAt: false
    })

    return Korisnik;
}