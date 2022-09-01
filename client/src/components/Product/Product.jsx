import React from "react";
import styles from "./Product.module.css";

function Product() {
  return (
    <div className={styles.productContainer}>
      <div className={styles.photoContainer}>
        <div>foto producto</div>
      </div>
      <h3>Nombre del producto</h3>
      <p>Brand Name</p>
      <div className={styles.priceCartContainer}>
        <div>Price $$$</div>
        <button>ADD CART </button>
      </div>
    </div>
  );
}

export default Product;
