import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";
import { style as s} from "@mui/system" ;
import styles from "./FavoritesCards.module.css";

export default function FavoritesCards ({id, name, image, user_login}) {


    const handleClickRemoveFav = async () => {
        if(user_login.id!==undefined && user_login.id !== false) {
            
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
        }
    };


    return(
        <div className= {styles.cointainerFavCards}>
            <div className={styles.cointainerFavImg}>
            <Link to={`/details/${id}`}>
                <img className={styles.imageFav} src={`https://${image}`} alt="Image Not Found" width="140" height="150"/> 
                <span className={styles.nameFavimg}>{name}</span>
            </Link>
            </div>
            <div className={styles.cointainerCloseBtn}>
            <button className={styles.closeXBtn} onClick={handleClickRemoveFav}>Delete</button>
            </div>
        </div>
    )
};