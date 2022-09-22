import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllFavs, deleteFavs } from "../../redux/actions";
import FavoritesCards from "./FavoritesCards";
import Login from "../Login/Login";
import { style as s} from "@mui/system" ;
import styles from "./Favorites.module.css";

export default function Favorites () {

    //SETEO ESTADOS DEL REDUCER
    const favorites = useSelector((state) => state.favs);
    const user_login = useSelector((state) => state.user_login);
    const dispatch = useDispatch()

    //ME ASEGURO DE CARGAR LOS ESTADOS
    useEffect( () => {
        if(user_login.id){
            dispatch(getAllFavs(user_login.id))
            dispatch(deleteFavs())
        }
    }, [dispatch]);

    return (
        <>
            {user_login.id ?
                <div className={styles.containerFav}>
                    <span className={styles.tituloFav}>FAVORITES</span>
                    {favorites.length > 0 && favorites ? favorites.map((f) => {
                        return( 
                            <FavoritesCards 
                            user_login={user_login}
                            key={f.id}
                            id={f.id}
                            image={f.image}
                            name={f.name}
                            />
                        )})

                    : <span className={styles.nothingFav}>NOTHING HERE</span>
                }
                </div>
            :
              <Login/>
        }
        </>
    )
};