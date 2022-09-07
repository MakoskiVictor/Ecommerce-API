import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import style from "./Details.module.css";
import CARRY_LOCALHOST from "../Globales";

import { deleteDetails, searchProductId, addProductCarry,getStockbyID ,deleteStockbyID} from "../../redux/actions";

export default function Details(props) {
  const dispatch = useDispatch();
  const detail = useSelector((state) => state.details);
  const genderPrevius = useSelector((state) => state.filters.filterGender);
  const carryProducts = useSelector((state) => state.carryProducts);
  const stock_by_ID = useSelector((state) => state.stock_by_ID);

  const [stateSize, SetstateSize] = useState(undefined);
  const [stateQuanty, SetstateQuanty] = useState(1);
  const [statecarryProducts, SetstatecarryProducts] = useState(undefined);

  useEffect(() => {
   dispatch(getStockbyID(props.match.params.id));
   dispatch(searchProductId(props.match.params.id));
    return ()=>{
      dispatch(deleteDetails());
      dispatch(deleteStockbyID());
      SetstateSize(undefined);
    }
  }, [dispatch]);

  function Number2Decimals(x) {
    return Number.parseFloat(x).toFixed(2);
  }

  function handleAddCarry() {
    let id = props.match.params.id; 
    let elemento={state:stateSize,id:id,amount:stateQuanty,details:detail[0]}
    let Data=JSON.parse(localStorage.getItem(CARRY_LOCALHOST))
    if(Data===undefined || Data===null){
    Data=[];
    Data.push(elemento)}
    else
    Data=AddOrModifyCarry(elemento,Data);
    localStorage.setItem(CARRY_LOCALHOST,JSON.stringify(Data));
    console.log(Data)
  }

  function changeQuanty(e){
   SetstateQuanty(e.target.value);
  }
  function changeSize(e,indice){
    SetstateSize({size:stock_by_ID[indice].productSize,stock:stock_by_ID[indice].stock})
   }
  

  if(stateSize===undefined && stock_by_ID.length>0){
  SetstateSize({size:stock_by_ID[0].productSize,stock:stock_by_ID[0].stock});}

  console.log(carryProducts)

  return (
    <div className={style.cardDetailMainContainer}>
      <div className={style.cardDetailContainer}>
        {detail.length > 0 ? (
          <div>
            <h1>{detail[0].name}</h1>
            <div className={style.detailsContainer}>
              <div className={style.imageContainer}>
                <img src={`https://${detail[0].image}`} alt="Not Found" />
              </div>
              <div className={style.infoContainer}>
                <p>Brand: {detail[0].brand} </p>
                <p>Price: {`$${Number2Decimals(detail[0].price)}`} </p>
                <p>Genre: {detail[0].gender} </p>
                <p>Category: {detail[0].category.name}</p>
              </div>
            </div>
            
            {stock_by_ID.length>0 && stateSize!==undefined ?
            
            <div>
              <p>Available sizes: {stock_by_ID.map((sizeStock,index) => {
                    return (
                      <label onClick={(e) =>changeSize(e,index)}>
                        {sizeStock.productSize}  </label>)
                  })
                }</p>
              {stateSize.stock>0?
              <div>
              <p>Quantity: 
                {<input type="number" placeholder="Amount" min={1} max={stateSize.stock} value={stateQuanty} onChange={(e) => changeQuanty(e)} />}  
                (Stock:{stateSize.stock})
              </p>
              <p>Total price:   
              {`  $${Number2Decimals(detail[0].price*stateQuanty)}`} 
              </p>
              <button className={style.btnDetails} onClick={() => handleAddCarry()}>Add Carry</button>
              </div>
              : "Sold out"  
            }

            </div>
            :  <div>Loading Stock</div>
          }

            {/* esta informacion no estan en la base de datos interna:

                        <p>Type: {detail.type} </p>
                        <p>aboutMe: {`${detail.info.aboutMe}`} </p>
                        <p>careInfo: {`${detail.info.careInfo}`} </p>
                        <p>sizeAndFit: {`${detail.info.sizeAndFit}`} </p> */}
          </div>
        ) : (
          <p>LOADING...</p>
        )}
      </div>
      <div>
        <Link to={`/products/${genderPrevius}`}>
          <button className={style.btnDetails}>Go Back</button>
        </Link>
      </div>
    </div>
  );
}

function AddOrModifyCarry(carryAdd, carryProducts) {
  let array = carryProducts;
  let indice = (carryProducts.findIndex(carry => (carry.id === carryAdd.id && JSON.stringify(carry.state) === JSON.stringify(carryAdd.state))))
  if (indice == -1) {
     array.push(carryAdd)
  }
  else {
     let cantidad = array[indice].amount + carryAdd.amount;
     cantidad = cantidad > carryAdd.state.stock ? carryAdd.state.stock : cantidad;
     array[indice].amount = cantidad;
  }
  return array;
}
