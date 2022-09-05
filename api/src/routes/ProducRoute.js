const { Router } = require("express");
const { Product, Category } = require("../db");
const { Op } = require("sequelize");
const axios = require("axios");

const router = Router();

router.put("/:id", async (req, res, next) => {
  const { id } = req.params;
  const { sumOrRes, stock } = req.query;
  const product = await Product.findOne({ where: { id: id } });
  try {
    if (sumOrRes == "suma") {
      product.stock = product.stock + stock;
    } else if (sumOrRes == "resta") {
      product.stock = product.stock - stock;
    }
    await product.save();
    res.send("stock actualizado correctamente")
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  const { id, name, price, image, brand, gender, categoryId, stock, size } =
    req.body;
  try {
    const newProduct = await Product.findOrCreate({
      where: { id, name, price, image, brand, gender, categoryId, stock, size },
    });
    res.status(202).send("product created successfully");
  } catch (err) {
    next(err);
  }
});

router.get("/", async (req, res, next) => {
  const { name, category } = req.query;
  let ProductosTotales = await Product.findAll();
  if (ProductosTotales.length === 0) {
    const IDs = [8799, 3630, 9263, 4169, 2641, 4208, 7078, 3602, 5668, 14274];
    const size = ["S", "M", "L"];
    const stock = [30, 40, 50];
    let products = [];
    let Categorias = [];
    const productsIds = [];
    const apiKey1 = "bbee7c4c6amsh633ef60fb92b041p1aabb2jsn29f64ef88bd5";
    const apikey2 = "1a971a71b0mshb7b5121700413f3p13574ejsn31f0b3c12ee4";

    for (let index = 0; index < IDs.length; index++) {
      let api = (
        await axios.get(
          `https://asos2.p.rapidapi.com/products/v2/list?limit=48&store=US&offset=0&categoryId=${IDs[index]}&rapidapi-key=${apikey2}`
        )
      ).data;
      let categoryGenero = index < 5 ? "Women" : "Men";
      var createCategory = await Category.findOrCreate({
        where: {
          name: api.categoryName,
          id: IDs[index],
          gender: categoryGenero,
        },
      });
      Categorias.push(createCategory);

      const tempArr = api.products.map((item) => {
        let tempObj = {
          ...item,
          categoryId: IDs[index],
        };
        return tempObj;
      });
      products.push(tempArr);
    }

    for (let index1 = 0; index1 < products.length; index1++) {
      let producsNew = products[index1];
      let genero = index1 < 5 ? "Women" : "Men";
      let ProductosPorCategoria = [];
      for (let index = 0; index < producsNew.length; index++) {
        if (!productsIds.includes(producsNew[index].id)) {
          var createProduct = await Product.findOrCreate({
            where: {
              id: producsNew[index].id,
              name: producsNew[index].name,
              price: producsNew[index].price.current.value,
              brand: producsNew[index].brandName,
              image: producsNew[index].imageUrl,
              gender: genero,
              categoryId: producsNew[index].categoryId,
              stock: stock[Math.floor(Math.random() * 3)],
              size: size[Math.floor(Math.random() * 3)],
            },
          });
        }
        ProductosPorCategoria.push(createProduct);
      }
      products[index1].forEach((item) => {
        productsIds.push(item.id);
      });
    }
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
