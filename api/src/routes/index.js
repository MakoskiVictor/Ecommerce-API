const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const ProductRoute = require("./ProducRoute")
const CategoryRoute = require("./CategoryRoute")
const ProductDetailsRoute = require("./ProductDetailsRoute")
const UsersRoute = require("./UsersRoute")
const PurchasedRoute = require("./PurchasedRoute")

const router = Router();

router.use('/product', ProductRoute);
router.use("/category", CategoryRoute)
router.use("/product", ProductDetailsRoute)
router.use('/users', UsersRoute)
router.use('/purchased', PurchasedRoute)

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = router;
