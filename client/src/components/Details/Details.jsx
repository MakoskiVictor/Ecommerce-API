import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import style from "./Details.module.css";

import { deleteDetails, searchProductId, addProductCarry } from "../../redux/actions";

export default function Details(props) {
  const dispatch = useDispatch();
  const detail = useSelector((state) => state.details);
  const genderPrevius = useSelector((state) => state.filters.filterGender);
  const carryProducts = useSelector((state) => state.carryProducts);

  const [stateSize, SetstateSize] = useState("L");

  useEffect(() => {
    console.log(carryProducts);
    dispatch(searchProductId(props.match.params.id));
    dispatch(deleteDetails());
    //return(()=>{dispatch(deleteDetails())})
  }, [dispatch]);

  function Number2Decimals(x) {
    return Number.parseFloat(x).toFixed(2);
  }

  function handleAddCarry() {
    console.log(carryProducts);
    let id = props.match.params.id;
    if(!carryProducts.some(carry => (carry.id === id && carry.size === stateSize)))
      dispatch(addProductCarry(stateSize, id));
  }

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
            <div>
              <button className={style.btnDetails} onClick={() => handleAddCarry()}>Add Carry</button>
            </div>

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
