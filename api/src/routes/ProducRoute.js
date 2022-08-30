const { Router } = require("express")
const {Product, Category } = require("../db") 
const axios = require("axios")
const {Op} = require("sequelize");

const router= Router()

router.get("/product", async (req,res,next)=>{
    const {name}= req.query;
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
    }
})



module.exports = router