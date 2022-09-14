import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";

function ProductCard({ img, name, brand, price, id,styleCard,gender,SizeStocks}) {

  return (
    <div className={styleCard.productContainer}>
      <div className={styleCard.photoContainer}>
        <div>
        <img src={`https://${img}`} alt="No Found"  width="140" height="150" /></div>
      </div>
      <h3>Name: {name}</h3>
      <p>Brand: {brand}</p>
      <p>Gender: {gender}</p>
      <p>
      {(SizeStocks!==undefined && SizeStocks.length>0)?(  SizeStocks.map((elemento,index) => {
       return ( <p key={elemento.productSize} value={elemento.productSize} 
       >{` ${elemento.productSize}  Stock: ${elemento.stock}`}</p>)}))
       :(<label>No Found Sizes</label>)
      }
      </p>
      <div className={styleCard.priceCartContainer}>
        <div>{`$/${Number2Decimals(price)}`}</div>
        <Link to={`/modifyProduct/${id}`}>  
          <button>Modify</button>
        </Link>
      </div>
      <button>Delete</button>
    </div>
  );
}

function Number2Decimals(x) {
  return Number.parseFloat(x).toFixed(2);
}

export default ProductCard;
