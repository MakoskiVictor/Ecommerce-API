const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "order",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      stocks: {
        type: DataTypes.JSON, //ARRAY(DataTypes.JSON)
        allowNull: false,
      },
      price: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      idpurchase: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      creationdate: {
        // type: DataTypes.DATE,
        type: DataTypes.STRING,
        allowNull: true,
      },
    }
    // {
    //   timestamps: false,
    // }
  );
};
