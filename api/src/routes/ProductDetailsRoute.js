const { Router } = require("express");
const axios = require("axios");

const router = Router();

router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    let data = (
      await axios.get(
        `https://asos2.p.rapidapi.com/products/v3/detail?id=${id}&rapidapi-key=09097ebdb4msh4cc6b12a21afcdfp156181jsnf87cc109342f`
      )
    ).data;
    const productDetail = {
        id: data.id,
        name: data.name,
        gender: data.gender,
        brand: data.brand,
        images: data.media.images,
        info: data.info,
        price: data.price.current,
        type: data.productType.name
    }
    res.send(productDetail)
  } catch (err) {
    next(err);
  }
});

module.exports = router;
