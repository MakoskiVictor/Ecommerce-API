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

router.put("/:id", async (req, res, next) => {
    const { id } = req.params;
    const { sumOrRes, stock, size } = req.body;
    const productStock = await Stock.findOne({ where: { productId: id, productSize: size } });
    try {
      if (sumOrRes) {
        productStock.stock = productStock.stock + stock;
      } else {
        productStock.stock = productStock.stock - stock;
      }
      await productStock.save();
      res.send(productStock)
    } catch (err) {
      next(err);
    }
  });

module.exports = router;
