import React from "react";

//LE LLEGA EL ID DEL FAVORITO
export default function Favs ({id}) {

    const handleClick = () => {
        alert(id)
    }


    return(
        <button onClick={handleClick}>
            <span role="img" aria-label="Fav" > :heart </span> 
        </button>
    )
};