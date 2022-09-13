const { Router } = require('express');
const { Order } = require('../db');
const { User}= require('../db');
const orderRouter = Router()

require('dotenv').config()

orderRouter.get('/', async (req, res,next) => {
    try {
        let allOrders = await Order.findAll()

        allOrders.length ? 
        res.status(200).json(allOrders)
        : res.status(400).send('no hay nada')

    } catch (error) {
        next(error)
    }
})

orderRouter.post('/', async (req, res) => {
    const { stocks, price, userId, idpurchase, creationdate } = req.body
    try {
        console.log(stocks, price, userId, idpurchase, creationdate);

        let newOrder = await Order.create({
            stocks,
            price,
            idpurchase,
            creationdate
        });
        // console.log("compro");
        let cliente =  await User.findByPk({
            where: {
                id: userId 
            }
        })

        console.log(cliente,"fdfs")

        await cliente.addOrder(newOrder)
        //console.log("agrego");
        res.send(newOrder)

    } catch (error) {
        res.status(400).send(error)
    }  
})


module.exports = orderRouter