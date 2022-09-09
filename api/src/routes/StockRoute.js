const { Router } = require("express");
const { Stock } = require("../db");

const router = Router();

router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const stock = await Stock.findAll({ where: { productId: id } });
    res.send(stock);
  } catch (error) {
    next(error);
  }
});

router.put("/drop", async (req, res, next) => {

  const { stockProducts } = req.body;
  console.log(req.body, "soy stockProducts")
  const productsChanged = []
  try {
    for (let i = 0; i < stockProducts?.length; i++) {
      const productStock = await Stock.findOne({
        where: { productId: stockProducts[i].id, productSize: stockProducts[i].size },
      });
      if(productStock.stock>0){
        productStock.stock = await productStock.stock - Number(stockProducts[i].stock);
      }
      await productStock.save();
      productsChanged.push(productStock)
    }
    // stockProducts.forEach(async (item) => {
    //   const productStock = await Stock.findOne({
    //     where: { productId: item.id, productSize: item.size },
    //   });
    //   productStock.stock = await productStock.stock - Number(item.stock);
    //   await productStock.save();
    //   productsChanged.push(productStock)
    // });
    res.send(productsChanged);
  } catch (err) {
    next(err);
  }
});

router.put('/add', async (req, res, next)=> {
  const { stockProducts } = req.body;
  const productsChanged = []
  try {
    for (let i = 0; i < stockProducts.length; i++) {
      const productStock = await Stock.findOne({
        where: { productId: stockProducts[i].id, productSize: stockProducts[i].size },
      });
      productStock.stock = await productStock.stock + Number(stockProducts[i].stock);
      await productStock.save();
      productsChanged.push(productStock)
    }
    // stockProducts.forEach(async (item) => {
    //   const productStock = await Stock.findOne({
    //     where: { productId: item.id, productSize: item.size },
    //   });
    //   productStock.stock = await productStock.stock - Number(item.stock);
    //   await productStock.save();
    //   productsChanged.push(productStock)
    // });
    res.send(productsChanged);
  } catch (err) {
    next(err);
  }
})

module.exports = router;
