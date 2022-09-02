import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { deleteDetails, searchProductId } from "../../redux/actions";

export default function Details(props) {
    console.log(props)

    const dispatch = useDispatch();
    const detail = useSelector((state) => state.details)

    useEffect(() => {
        dispatch(searchProductId(props.match.params.id))
        dispatch(deleteDetails())
    }, [dispatch]);

    console.log(detail)
    console.log(detail.brand)

    return (
        <div>
            <div>
                {detail.length > 0 ?
                    <div>
                        <h1>{detail[0].name}</h1>
                        <img src={`https://${detail[0].image}`} alt="Not Found" />
                        <p>Brand: {detail[0].brand} </p>
                        <p>Price: ${detail[0].price} </p>
                        <p>Genre: {detail[0].gender} </p>
                        <p>Category: {detail[0].category.name}</p>

                        {/* esta informacion no estan en la base de datos interna:

                        <p>Type: {detail.type} </p>
                        <p>aboutMe: {`${detail.info.aboutMe}`} </p>
                        <p>careInfo: {`${detail.info.careInfo}`} </p>
                        <p>sizeAndFit: {`${detail.info.sizeAndFit}`} </p> */}

                    </div>
                    :
                    <p>LOADING...</p>
                }
            </div>
            <div>
                <Link to="/rutaPrueba">
                    <button>Go Back</button>
                </Link>
            </div>
        </div>
    )
}

