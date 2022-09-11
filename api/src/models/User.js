const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
<<<<<<< HEAD
   // defino el modelo
   sequelize.define(
      "user",
      {
         ///Actualizacion Angelo
         id: {
            type: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
         },
         ///
         email: {
            type: DataTypes.STRING,
            allowNull: false,
         },
         name: {
            type: DataTypes.STRING,
            allowNull: false,
         },
         lastName: {
            type: DataTypes.STRING,
            allowNull: false,
         },
         password: {
            type: DataTypes.STRING,
            allowNull: false,
         },
         image: {
            type: DataTypes.STRING,
         },
         address: {
            type: DataTypes.STRING,
         },
         isAdmin: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
         },
         isBaned: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
         },
=======
  // defino el modelo
  sequelize.define(
    "user",
    {

      ///Actualizacion Angelo
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    ///
      email: {
        type: DataTypes.STRING,
        allowNull: false,
>>>>>>> dde0f971be31a1dbb161247c5dacbaec8be5fc4d
      },
      {
         timestamps: false,
      }
   );
};
