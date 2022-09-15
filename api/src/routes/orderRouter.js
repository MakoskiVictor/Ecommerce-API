const { Router } = require("express");
const { DataTypes } = require("sequelize");
const { Order } = require("../db");
const { User } = require("../db");
const orderRouter = Router();

require("dotenv").config();

orderRouter.get("/", async (req, res, next) => {
  try {
    let allOrders = await Order.findAll();

    allOrders.length
      ? res.status(200).json(allOrders)
      : res.status(400).send("no hay nada");
  } catch (error) {
    next(error);
  }
});

orderRouter.post("/", async (req, res) => {
  const { price, userId, idpurchase,creationdate,stateOrder} = req.body;
  try {
    console.log( price, userId, idpurchase,creationdate);

    let newOrder = await Order.create({
      price,
      userId,
      creationdate: new Date(),
      stateOrder:stateOrder
    });
    console.log("compro");
    let cliente = await User.findByPk(userId);

    console.log(cliente);

    await cliente.addOrder(newOrder);
    console.log("agrego");
    res.send(newOrder);
  } catch (error) {
    res.status(400).send(error);
  }
});

// orderRouter.put('/', async ())

module.exports = orderRouter;

/* id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
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
        type: DataTypes.DATE,
        allowNull: true,
      },
      stateOrder:{
        type: DataTypes.ENUM('Creada', 'Cancelada', 'Despachada')
      }
    }*/