import React from "react";
import styles from "./ModifyItem.module.css";

function ModifyItem() {
  return (
    <div>
      <h1>MODIFY ITEM</h1>
      <form className={styles.modifyContainer}>
        <label htmlFor="name">
          Name:
          <input type="text" id="name" required />
        </label>

        <label htmlFor="size">
          Size:
          <input type="text" id="size" required />
        </label>
        <label htmlFor="price">
          Price:
          <input type="number" id="price" required />
        </label>
        <label htmlFor="stock">
          Stock:
          <input type="number" id="stock" required />
        </label>
        <label htmlFor="genre">
          Genre:
          <input type="text" id="genre" required />
        </label>
        <label htmlFor="brand_name">
          Brand name:
          <input type="text" id="brand_name" required />
        </label>
        <label htmlFor="image">
          Image:
          <input type="text" id="image" required />
        </label>
        <div className={styles.btns}>
          <button>APPLY</button>
          <button>CANCEL</button>
        </div>
      </form>
    </div>
  );
}

export default ModifyItem;
