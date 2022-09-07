import React from "react";
import styles from "./CarryCard.module.css";
import { Link } from "react-router-dom";

function CarryCard({ img, name, brand, price, id ,size,amount,onDelete,onDecrease,onIncrease}) {
  console.log("Entraaa")
  console.log(img," ",name," ",brand," ",price," ",id," ",size," ",amount)
  return (
    <div className={styles.productContainer}>
      <div className={styles.photoContainer}>
        <div>
        <img src={`https://${img}`} alt="No Found"  width="140" height="150" /></div>
      </div>
      <h3>{name}</h3>
      <p>{brand}</p>
      <div>cod:{id}</div>
      <div className={styles.priceCartContainer}>
      <div>{`$/${Number2Decimals(price)}`}</div>
      <h3>{size}</h3>
      <p>{amount}</p>
      <button onClick={onDelete}>Delete Product</button>
      <button onClick={onDecrease}>-</button>
      <button onClick={onIncrease}>+</button>
      </div>
    </div>
  );
}

function Number2Decimals(x) {
    return Number.parseFloat(x).toFixed(2);
  }

export default CarryCard;