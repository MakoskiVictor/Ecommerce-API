const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const ProductRoute = require("./ProducRoute")
const CategoryRoute = require("./CategoryRoute")
const ProductDetailsRoute = require("./ProductDetailsRoute")

const router = Router();

router.use('/product', ProductRoute);
router.use("/category", CategoryRoute)
router.use("/product", ProductDetailsRoute)

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = router;
