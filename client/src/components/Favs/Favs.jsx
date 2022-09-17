import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import swal from "sweetalert";
import { getAllFavs } from "../../redux/actions";

//LE LLEGA EL ID DEL FAVORITO
export default function Favs ({id}) {

    const favs = useSelector((state) => state.favs);
    const user_login = useSelector((state) => state.user_login);
    const history = useHistory();
    const dispatch = useDispatch();

/*     const productId = id;
    const userId = user_login.id; */

    //CARGAR EL ESTADO
    console.log("SOY LOS FAVS", favs)

    useEffect( () => {
        if(user_login.id){
            dispatch(getAllFavs(user_login.id))
        }
    }, [dispatch]);

    //VER SI EL PRODUCT ESTA EN LOS FAVS

    const isInFav = favs.some(productId => productId === id);
    console.log("SOY ISINFAV", isInFav);

    const handleClickAddFav = async () => {
        if(user_login.id!==undefined && user_login.id !== false) {
            
            await axios.post("http://localhost:3001/favorites", {
                userId: user_login.id,
                productId: id
            }
              )
              .then(swal({
                title: "Success",
                icon: "success",
                button: "Ok",
            }))
            .then(res => {
                if(res) {
                    window.location.reload()
            }})
            .catch((err)=>console.log(err))
        } else {
            history.push("/login");
        }
    };
    //QUITAR FAVORITO
    const handleClickRemoveFav = async () => {
        if(user_login.id!==undefined && user_login.id !== false) {
            console.log("SOY USER ID", user_login.id, "Y PRODUCT ID", id);
            await axios.delete("http://localhost:3001/favorites", { data: {
                userId: user_login.id,
                productId: id
            }}
              )
              .then(swal({
                title: "Success",
                icon: "success",
                button: "Ok",
            }))
            .then(res => {
                if(res) {
                    window.location.reload()
            }})
            .catch((err)=>console.log(err))
        } else {
            history.push("/login");
        }
    };

    return(
        <>
        {!user_login.id || !isInFav ?   
            <button onClick={handleClickAddFav}>
                <span role="img" aria-label="Fav" > Add To Favs </span> 
            </button>
         :
            <button onClick={handleClickRemoveFav}>
                <span role="img" aria-label="Fav" > Remove From Favs </span> 
            </button>   
        }
        </>
    )
};

