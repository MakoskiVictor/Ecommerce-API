const { Router } = require("express");
const { Product, Category, Stock } = require("../db");
const { Op } = require("sequelize");
const axios = require("axios");
const { v4: uuidv4 } = require("uuid");

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
      where: { id, name, price, image, brand, gender, categoryId, description },
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

router.get("/", async (req, res, next) => {
  const { name, category } = req.query;
  let ProductosTotales = await Product.findAll();
  if (ProductosTotales.length === 0) {
    const IDs = [8799, 3630, 9263, 4169, 2641, 4208, 7078, 3602, 5668, 14274];
    const size = ["S", "M", "L"];
    const stock = [0, 5, 10, 20, 30, 40, 50];
    let products = [];
    let Categorias = [];
    const apiKey = "2590a61287mshdfce7dfafec10f7p1a19e2jsn9eaa4c140af5";
    for (let index = 0; index < IDs.length; index++) {
      let api = (
        await axios.get(
          `https://asos2.p.rapidapi.com/products/v2/list?limit=48&store=US&offset=0&categoryId=${IDs[index]}&rapidapi-key=${apiKey}`
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
        let id = uuidv4();
        var createProduct = await Product.findOrCreate({
          where: {
            id: id,
            name: producsNew[index].name,
            price: producsNew[index].price.current.value,
            brand: producsNew[index].brandName,
            image: producsNew[index].imageUrl,
            gender: genero,
            categoryId: producsNew[index].categoryId,
            description: `${producsNew[index].name} is very good quality clothing, made by the ${producsNew[index].brandName} brand in the USA with the best quality materials. We have different sizes and colors of this product so you can choose the one you like best.`,
          },
        });
        size.forEach((item) => {
          Stock.create({
            productSize: item,
            stock: stock[Math.floor(Math.random() * 7)],
            productId: id,
          });
        });
        ProductosPorCategoria.push(createProduct);
      }
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
