const { Router } = require("express")
const { Product, Category } = require("../db")
const axios = require("axios")
const { Op } = require("sequelize");

const router = Router()

router.get("/", async (req, res, next) => {

    const IDs = [8799, 3630, 9263, 4169, 2641, 4208, 7078, 3602, 3606, 14274];
    const Datos = [];
    let products = [];
    let consoleProducts=[];
    let Categorias=[];

    for (let index = 0; index < IDs.length; index++) {
        let api = (await axios.get(`https://asos2.p.rapidapi.com/products/v2/list?limit=30&store=US&offset=0&categoryId=${IDs[index]}&rapidapi-key=bbee7c4c6amsh633ef60fb92b041p1aabb2jsn29f64ef88bd5`)).data;
        Datos.push(api);

        var createCategory = await Category.findOrCreate({where: { name:api.categoryName, id:IDs[index]}});
        console.log(createCategory.__proto__);
        Categorias.push(createCategory);
        
       /* const tempArr = api.products.map(item=>{
            let tempObj = {
              ...item,
              categoryId: IDs[index]
            }
            return tempObj
          })
        products.push(tempArr);*/
    }


    for (let index1 = 0; index1 < products.length; index1++) {

        let producsNew = products[index1];
        let genero=index1<5?"Women":"Man"
        let ProductosPorCategoria=[];
        for (let index = 0; index < producsNew.length; index++) {
            consoleProducts.push(`${producsNew[index].id} ${producsNew[index].name}  ${producsNew[index].price.current.value} ${producsNew[index].brandName} ${producsNew[index].imageUrl}`) 
            var createProduct = await Product.findOrCreate({ where: { id: producsNew[index].id, name:producsNew[index].name, price:producsNew[index].price.current.value, brand:producsNew[index].brandName,image:producsNew[index].imageUrl,genere:genero} })
           
            console.log(createProduct.__proto__);
            ProductosPorCategoria.push(createProduct);

        }

        let categoriaActual=Categorias[index1];
       // console.log(categoriaActual.__proto__);
        //await categoriaActual.addProducts(ProductosPorCategoria);
    }

    let ProductosTotales = await Product.findAll();
    let CategoriasTotales = await Category.findAll();
    //console.log(ProductosTotales.length);
    //console.log(Datos.length)
    console.log(products);
    res.send(products);


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
})



module.exports = router
