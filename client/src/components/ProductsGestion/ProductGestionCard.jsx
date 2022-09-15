import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

function ProductCard({ img, name, brand, price, id, styleCard, gender, SizeStocks }) {

  async function FunctionDelete() {
    Swal.fire({
      title: "Do you want to remove this product from the database?",
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: "Yes",
      denyButtonText: `No`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        const foo = async () => {
          await axios.delete(`http://localhost:3001/product/${id}`)
            .then((e) => Swal.fire({
              title: e.data,
              icon: "info",
              bconfirmButtonText: "Yes",
            })).then((result) => { if (result.isConfirmed) window.location.reload() })
            .catch((e) => Swal.fire({
              title: e,
              icon: "error",
              button: "Ok",
            }));
        }
        foo();
      }
    });
  }

  return (
    <div className={styleCard.productContainer}>
      <section className={styleCard.containerMain}>

        <div className={styleCard.photoContainer}>
          <div>
            <img src={`https://${img}`} alt="No Found" width="140" height="150" /></div>
        </div>
        <section className={styleCard.MainContainerInfo}>
          <section className={styleCard.brandGender}>
            <h4>Name: {name}</h4>
            <p>Brand: {brand}</p>
            <p>Gender: {gender}</p>
          </section>
          <p className={styleCard.stocks}>Stocks:</p>
          <section className={styleCard.containMainStock}>
            {(SizeStocks !== undefined && SizeStocks.length > 0) ? (SizeStocks.map((elemento, index) => {
              return (<p key={elemento.productSize} value={elemento.productSize}
              > <b className={styleCard.stockSize}> {elemento.productSize}:</b>{`  Stock: ${elemento.stock}`}</p>)
            }))
              : (<label>No Found Sizes</label>)
            }
          </section>
          <div className={styleCard.priceCartContainer}>
            <div>{`$/${Number2Decimals(price)}`}</div>
            <Link to={`/modifyProduct/${id}`}>
              <button>Modify</button>
            </Link>
          </div>
          <div className={styleCard.buttonContain}>
            <button className={styleCard.buttonDelete} onClick={() => FunctionDelete()}>Delete <span></span></button>
          </div>
        </section>

      </section>
    </div>
  );
}

function Number2Decimals(x) {
  return Number.parseFloat(x).toFixed(2);
}

export default ProductCard;
