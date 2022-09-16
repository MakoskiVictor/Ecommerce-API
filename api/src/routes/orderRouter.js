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
  const { price, userId, stocks } = req.body;
  try {
    console.log(price, userId, stocks);

    let newOrder = await Order.create({
      price,
      userId,
      stocks,
      stateOrder: "Creada",
      creationdate: new Date(),
    });

   /* let cliente = await User.findByPk(userId);

    console.log(cliente);

    await cliente.addOrder(newOrder);
    console.log("agrego");*/
    res.send(newOrder);
  } catch (error) {
    res.status(400).send(error);
  }
});

orderRouter.put("/:id", async (req, res, next) => {
  const { type } = req.query;
  const { id } = req.params;
  const { idpurchase, stateOrder } = req.body;
  try {
    const order = await Order.findOne({ where: { id: id } });
    switch (type) {
      case "idpurchase":
        order.idpurchase = idpurchase;
        await order.save();
        res.send(`The purchased id has been changed`);
        break;
      case "stateOrder":
        order.stateOrder = stateOrder;
        await order.save();
        res.send(`The state has been changed`);
        break;
      default:
        break;
    }
  } catch (err) {
    next(err);
  }
});

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
