const { Router } = require("express");
const { Product, Category, Stock } = require("../db");
const { Op } = require("sequelize");
const { v4: uuidv4 } = require("uuid");
const getApiProducts = require("./getApiProducts");

const router = Router();

router.delete("/:id", async (req, res, next) => {
  console.log("Entra")
  const { id } = req.params;
  try {
    const exProduct = await Product.destroy({ where: { id: id } });
    res.send(`${exProduct} product has been deleted`);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  const { name, price, image, brand, gender, nameCategory, description } =
    req.body;
  // let id = 0;
  // let l = UUID(id).uuid()
  // console.log(l)
  let id = uuidv4();
  try {
    var createCategory = await Category.findOrCreate({
      where: {
         name: nameCategory,
         gender: gender,
      },
   });
   let NewIdCategory=createCategory[0].dataValues.id;

    const product = await Product.findOrCreate({
      where: {
        id,
        name,
        price,
        image,
        brand,
        gender,
        categoryId:NewIdCategory,
        description,
      },
    });
    res.status(202).send("Producto Creado Satisfactoriamente");
  } catch (err) {
    next(err);
  }
});

router.get("/", async (req, res, next) => {
  const { name, category } = req.query;
  let ProductosTotales = await Product.findAll({
    include: {
      model: Stock,
    }
  })
  if (ProductosTotales.length === 0) {
    await getApiProducts();
    ProductosTotales = await Product.findAll({
      include: {
        model: Stock,
      }
    })
  }
  try {
    if (name) {
      let filteredProducts = await Product.findAll({
        where: {
          name: {
            [Op.iLike]: `%${name}%`,
          },
        },
        include: {
          model: Stock,
        }
      });
      res.send(filteredProducts);
    } else if (category) {
      let filteredProducts = await Product.findAll({
        where: {
          categoryId: category,
        },
        include: {
          model: Stock,
        }
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
