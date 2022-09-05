const { Router } = require("express");
const { Stock } = require("../db");

const router = Router();

router.get("/:id", async (req, res, next) => {
    const {id} = req.params;
  try {
    const stock = await Stock.findAll({where: {productId: id}})
    res.send(stock)
  } catch (error) {
    next(error);
  }
});

module.exports = router;
