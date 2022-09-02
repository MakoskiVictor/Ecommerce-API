import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { deleteDetails, searchProductId } from "../../redux/actions";

export default function Details (props) {

    const dispatch = useDispatch();
    const detail = useSelector((state) => state.details)

    useEffect(() => {
        dispatch(searchProductId(props.match.params.id))
        dispatch(deleteDetails())
    }, [dispatch]);

    return (
        <div>
            <div>
                {detail.length > 0?
                    <div>
                        <h1>{detail[0].name}</h1>
                        <img src={detail[0].images} alt="Not Found" />
                        <p>Brand: {detail[0].brand} </p>
                        <p>Price: ${detail[0].price} </p>
                        <p>Genre: {detail[0].gender} </p>
                        <p>Type: {detail[0].type} </p>
                        <p>Info: {detail[0].info} </p>

                    </div>
                    :
                    <p>LOADING...</p>
                }
            </div>
            <div>
                <Link to="/product">
                    <button>Go Back</button>
                </Link>
            </div>
        </div>
    )
}

