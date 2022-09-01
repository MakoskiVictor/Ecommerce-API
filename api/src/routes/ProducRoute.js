const { Router } = require("express");
const { Product, Category } = require("../db");
const { Op } = require("sequelize");
const axios = require("axios");

const router = Router();

let id = 1;
router.post("/", async (req, res, next) => {
  const { name, price, image, brand, genere, categoryId } = req.body;
  try {
    const newProduct = await Product.findOrCreate({
      where: { id, name, price, image, brand, genere, categoryId },
    });
    id++;
    res.send("product created successfully")
  } catch (err) {
    next(err);
  }
});

router.get("/", async (req, res, next) => {
  const { name, category } = req.query;
  let ProductosTotales = await Product.findAll();
  if (ProductosTotales.length === 0) {
    const IDs = [8799, 3630, 9263, 4169, 2641, 4208, 7078, 3602, 5668, 14274];
    let products = [];
    let Categorias = [];
    const apiKey1 = "bbee7c4c6amsh633ef60fb92b041p1aabb2jsn29f64ef88bd5";
    const apikey2 = "09097ebdb4msh4cc6b12a21afcdfp156181jsnf87cc109342f";

    for (let index = 0; index < IDs.length; index++) {
      let api = (
        await axios.get(
          `https://asos2.p.rapidapi.com/products/v2/list?limit=30&store=US&offset=0&categoryId=${IDs[index]}&rapidapi-key=${apikey2}`
        )
      ).data;
      let gender = index < 5 ? "Women" : "Man";
      var createCategory = await Category.findOrCreate({
        where: { name: api.categoryName, id: IDs[index], gender },
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
      let genero = index1 < 5 ? "Women" : "Man";
      let ProductosPorCategoria = [];
      for (let index = 0; index < producsNew.length; index++) {
        var createProduct = await Product.findOrCreate({
          where: {
            id: producsNew[index].id,
            name: producsNew[index].name,
            price: producsNew[index].price.current.value,
            brand: producsNew[index].brandName,
            image: producsNew[index].imageUrl,
            genere: genero,
            categoryId: producsNew[index].categoryId,
          },
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
  /*const {name}= req.query;
    if(!name){
        const allProduct = await Product.findAll();
        res.send(allProduct)
    }else{
        try{
          const findProduct = await Product.findAll({
            where:{
                name:{
                    [Op.iLike]:`%${name}%`
                }
            }})
            if(findProduct.length>0){
                res.send(findProduct)
            }else{
                res.send({msg:"Product was not found"})
            }
          } catch(error){
            next(error)  
        }
    }*/
});

module.exports = router;
