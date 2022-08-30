const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('commodity', {
    id:{
      type:DataTypes.INTEGER,
      allowNull: false,
      primaryKey:true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price:{
      type:DataTypes.DOUBLE,
      allowNull:false,
    },
    image:{
      type:DataTypes.STRING,
      allowNull:false,
    },
    brand:{
      type:DataTypes.STRING,
      allowNull:false,
    },
    
  });
};
