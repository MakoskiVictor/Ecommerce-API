import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { deleteDetails, searchProductId } from "../../redux/actions";

export default function Details (props) {
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
                { Object.keys(detail).length> 0?
                    <div>
                        <h1>{detail.name}</h1>
                        <img src={`https://${detail.images[0].url}`} alt="Not Found" />
                        <p>Brand: {detail.brand.name} </p>
                        <p>Price: ${detail.price.text} </p>
                        <p>Genre: {detail.gender} </p>
                        <p>Type: {detail.type} </p>
                        <p>aboutMe: {`${detail.info.aboutMe}`} </p>
                        <p>careInfo: {`${detail.info.careInfo}`} </p>
                        <p>sizeAndFit: {`${detail.info.sizeAndFit}`} </p>

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

