import React from "react";
import styles from "./CarryCard.module.css";
import { Link } from "react-router-dom";

function CarryCard({ img, name, brand, price, id, size, amount, onDelete, onDecrease, onIncrease }) {
  return (
    <div className={styles.productContainer}>
      <div className={styles.photoContainer}>
        <img src={`https://${img}`} alt="No Found" width="140" height="150" />
      </div>
      <div className={styles.texContainer}>
        <h3>{name}</h3>
        <p>{brand}</p>
        <div className={styles.priceCartContainer}>
          <h3>{`Price: $/${Number2Decimals(price)}`}</h3>
          <h3>Size: {size}</h3>
        </div>
        <div>
          <p><button onClick={onDecrease}>-</button>
            {amount}
            <button onClick={onIncrease}>+</button></p>
        </div >
        <button onClick={onDelete}>delete</button>
      </div>
    </div>
  );
}

function Number2Decimals(x) {
  return Number.parseFloat(x).toFixed(2);
}

export default CarryCard;