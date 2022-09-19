const { Router } = require("express");
const { DataTypes, where } = require("sequelize");
const { Order } = require("../db");
const { User } = require("../db");
const orderRouter = Router();

require("dotenv").config();

orderRouter.get("/", async (req, res, next) => {
  const { type, parameter } = req.query;
  try {
    var allOrders = [];
    console.log(type,"  ",parameter)

    if (type!=="UserID" && type!=="OrderID")
      allOrders = await Order.findAll();
    else if (type === "UserID" ) {
      allOrders = await Order.findAll(
        {
          where: {
            userId: parameter,
          }
        })
    }
    else {
      allOrders = await Order.findAll(
        {
          where: {
            id: parameter,
          }
        })
    }
    console.log(allOrders)
    allOrders.length
      ? res.status(200).json(allOrders)
      : res.status(400).send("no hay nada");
  } catch (error) {
    next(error);
  }
});

orderRouter.post("/", async (req, res) => {
  const { userId, stocks } = req.body;
  try {
    console.log(userId,"  ",stocks)
    var priceTotal = 0;
    for (let index = 0; index < stocks.length; index++) {
      const element = stocks[index];
      priceTotal += (element.amount * element.value)
      stocks[index] = { ...stocks[index], comment: false }
    }
    priceTotal = priceTotal.toFixed(2);

    let stocksJSON = JSON.stringify(stocks);

    let newOrder = await Order.create({
      price: priceTotal,
      userId,
      stocks: stocksJSON,
      stateOrder: "Creada",
    });
    console.log(newOrder)
    res.send(newOrder);
  } catch (error) {
    res.status(400).send(error);
  }
});

orderRouter.put("/:id", async (req, res, next) => {
  const { type } = req.query;
  const { id } = req.params;
  const { data } = req.body;
  console.log(type," ",id," ",data)
  try {
    const order = await Order.findOne({ where: { id: id } });
    switch (type) {
      case "idpurchase":
        order.idpurchase = data;
        await order.save();
        res.send(`The purchased id has been changed`);
        break;
      case "stateOrder":
        order.stateOrder = data;
        await order.save();
        res.send(`The state has been changed`);
        break;
      case "stocks":
        order.stocks = JSON.stringify(data);
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
