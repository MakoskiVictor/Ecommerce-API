const { Router } = require("express");
const { Product, Category, Stock } = require("../db");
const { Op } = require("sequelize");
const { v4: uuidv4 } = require("uuid");
const getApiProducts = require("./getApiProducts");

const router = Router();

router.post("/", async (req, res, next) => {
   const { name, price, image, brand, gender, categoryId, stock, description } =
      req.body;
   // let id = 0;
   // let l = UUID(id).uuid()
   // console.log(l)
   let id = uuidv4();
   try {
      const product = await Product.findOrCreate({
         where: {
            id,
            name,
            price,
            image,
            brand,
            gender,
            categoryId,
            description,
         },
      });
      stock.forEach((item) => {
         Stock.create({
            productSize: item.size,
            stock: item.stock,
            productId: id,
         });
      });
      res.status(202).send("product created successfully");
   } catch (err) {
      next(err);
   }
});

///RUTA EN DESARROLLO
router.post("/Add_Stock_Size", async (req, res, next) => {
  const { idProduct, size, stock} = req.body;
  try {
     const product = await Product.findOne({
        where: {
           id:idProduct
        },
        include: {
          model: Stock,
        }
     });
//// ACA
     if(product!==undefined && product.length!==0){
           Stock.create({
           productSize: size,
           stock:  stock,
           productId: idProduct,
        });
     }
     res.status(202).send(product);
  } catch (err) {
     next(err);
  }
});

router.get("/", async (req, res, next) => {
  const { name, category } = req.query;
  let ProductosTotales = await Product.findAll();
  if (ProductosTotales.length === 0) {
    await getApiProducts()
    ProductosTotales = await Product.findAll()
  }
  try {
    if (name) {
      let filteredProducts = await Product.findAll({
        where: {
          name: {
            [Op.iLike]: `%${name}%`,
          },
        },
      });
      res.send(filteredProducts);
    } else if (category) {
      let filteredProducts = await Product.findAll({
        where: {
          categoryId: category,
        },
      });
      res.send(filteredProducts);
    } else {
      res.send(ProductosTotales);
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
