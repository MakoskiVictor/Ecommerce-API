const {  Router } = require("express")
const {Product, Category } = require("../db") 

const router = Router();

router.get("/category", async (req, res, next) => {
    try {
      let allCategory = await getAllCategory();

        res.status(200).json(allCategory);

    } catch (error) {

      next(error);

    }
});


module.exports = router