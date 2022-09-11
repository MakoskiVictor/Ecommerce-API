import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import style from "./Details.module.css";
import CARRY_LOCALHOST from "../Globales";
import swal from "sweetalert2";

import {
  deleteDetails,
  searchProductId,
  VerificarCambioCarrito,
  getStockbyID,
  deleteStockbyID,
} from "../../redux/actions";

export default function Details(props) {
  const dispatch = useDispatch();
  const detail = useSelector((state) => state.details);
  const genderPrevius = useSelector((state) => state.filters.filterGender);
  const carryProducts = useSelector((state) => state.carryProducts);
  const stock_by_ID = useSelector((state) => state.stock_by_ID);

  const [stateSize, SetstateSize] = useState({
    size: undefined,
    stock: undefined,
  });
  const [stateQuanty, SetstateQuanty] = useState(1);
  //const [statecarryProducts, SetstatecarryProducts] = useState(undefined);

  useEffect(() => {
    dispatch(getStockbyID(props.match.params.id));
    dispatch(searchProductId(props.match.params.id));
    return () => {
      dispatch(deleteDetails());
      dispatch(deleteStockbyID());
      SetstateSize(undefined);
    };
  }, [dispatch]);

  function Number2Decimals(x) {
    return Number.parseFloat(x).toFixed(2);
  }

  function handleAddCarry() {
    let id = props.match.params.id;
    let elemento = {
      state: stateSize,
      id: id,
      amount: stateQuanty,
      details: detail[0],
    };
    let Data = JSON.parse(localStorage.getItem(CARRY_LOCALHOST));
    if (Data === undefined || Data === null) {
      Data = [];
      Data.push(elemento);
    } else Data = AddOrModifyCarry(elemento, Data);
    localStorage.setItem(CARRY_LOCALHOST, JSON.stringify(Data));

    dispatch(VerificarCambioCarrito(carryProducts));
    SetstateQuanty(1);

    return swal.fire({
      title: `Product Added ${elemento.details.name} to shopping cart!`,
      position: "bottom-start",
      icon: "success",
      showConfirmButton: false,
      timer: 400,
    });
  }

  function changeQuanty(e) {
    SetstateQuanty(e.target.value);
  }
  function changeSize(e, indice, stock) {
    //if(stock>0)
    SetstateSize({
      size: stock_by_ID[indice].productSize,
      stock: stock_by_ID[indice].stock,
    });
  }

  if (stateSize == undefined)
    SetstateSize({ size: undefined, stock: undefined });

  return (
    <div className={style.cardDetailMainContainer}>
      <div className={style.cardDetailContainer}>
        {detail.length > 0 ? (
          <div>
            {/*TARJETA DE DETALLES*/}
            <h1>{detail[0].name}</h1>
            <div className={style.detailsContainer}>
              <div className={style.imageContainer}>
                <img src={`https://${detail[0].image}`} alt="Not Found" />
              </div>

              {/*----------------------------*/}
              {/*TEXTO CHOOSE SIZE*/}

              {/*MUESTREO DE SIZE (TALLAS)*/}
              {stock_by_ID.length > 0 && stateSize !== undefined ? (
                <div className={style.containerFormAddCarry}>
                  {(stateSize === undefined ||
                    stateSize.size === undefined) && (
                    <label className={style.textChooseSize}>Choose Size</label>
                  )}
                  <p className={style.paragraphSizes}>
                    Available sizes:{" "}
                    {stock_by_ID.map((sizeStock, index) => {
                      return (
                        <label
                          id={
                            sizeStock.productSize === stateSize.size
                              ? style.SizeSeleccionada
                              : style.SizeNoSeleccionada
                          }
                          className={
                            sizeStock.stock === 0
                              ? style.SizeSoldOut
                              : style.SizeOnSale
                          }
                          onClick={(e) => changeSize(e, index, sizeStock.stock)}
                        >
                          {sizeStock.productSize}{" "}
                        </label>
                      );
                    })}
                  </p>
                  {/*----------------------------*/}

                  {/*MUESTREO DE CANTIDAD PRECIO Y BOTON COMPRA*/}
                  {stateSize.stock > 0 ? (
                    <div>
                      <p className={style.paragraphQuantity}>
                        Quantity:
                        {
                          <input
                            type="number"
                            placeholder="Amount"
                            min={1}
                            max={stateSize.stock}
                            value={stateQuanty}
                            onChange={(e) => changeQuanty(e)}
                          />
                        }
                        <span>(Stock:{stateSize.stock})</span>
                      </p>
                      <p className={style.ParagraphTotalPrice}>
                        Total price:
                        {`  $${Number2Decimals(detail[0].price * stateQuanty)}`}
                      </p>
                      <button
                        className={style.btnAddCarry}
                        onClick={() => handleAddCarry()}
                      >
                        Add Carry
                      </button>
                    </div>
                  ) : stateSize.size === undefined ? (
                    " "
                  ) : (
                    <p className={style.soldOut}>SOLD OUT</p>
                  )}
                  {/*---------------------------------*/}
                </div>
              ) : (
                <div>Loading Stock</div>
              )}
            </div>
            <div className={style.infoContainer}>
              <p>Brand: {detail[0].brand} </p>
              <p>Price: {`$${Number2Decimals(detail[0].price)}`} </p>
              <p>Genre: {detail[0].gender} </p>
              <p>Category: {detail[0].category.name}</p>
            </div>
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
  let indice = carryProducts.findIndex(
    (carry) =>
      carry.id === carryAdd.id &&
      JSON.stringify(carry.state) === JSON.stringify(carryAdd.state)
  );
  if (indice == -1) {
    array.push(carryAdd);
  } else {
    let cantidad =
      Number.parseInt(array[indice].amount) + Number.parseInt(carryAdd.amount);
    cantidad =
      cantidad > carryAdd.state.stock ? carryAdd.state.stock : cantidad;
    array[indice].amount = cantidad;
  }
  return array;
}
