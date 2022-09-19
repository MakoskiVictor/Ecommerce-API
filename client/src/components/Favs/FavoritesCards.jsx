import React from "react";
import { Link } from "react-router-dom";

export default function FavoritesCards ({id, name, image}) {


    return(
        <div>
            <Link to={`/details/${id}`}>
                <img src={`https://${image}`} alt="Image Not Found" width="140" height="150"/> 
                <p>{name}</p>
            </Link>
        </div>
    )
};