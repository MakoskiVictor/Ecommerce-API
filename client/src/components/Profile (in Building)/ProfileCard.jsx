import React from "react";
import styles from "./ProfileCard.module.css";
import { Link } from "react-router-dom";

function ProfileCard({
  email,
                                name,
                                lastName,
                                password,
                                image,
                                address,
                                isAdmin,
}) {
  return (
    <div className={styles.productContainer}>
      <div className={styles.photoContainer}>
        <img src={`https://${image}`} alt="No Found" />
      </div>
      <div className={styles.InforContainer}>
       <label>Nombre: {name}</label>
       <label>Apellido: {lastName}</label>
       <label>Direccion: {address}</label>
       <label>Admin: {isAdmin}</label>
       <label>Email: {email}</label>
      </div>
    </div>
  );
}

function Number2Decimals(x) {
  return Number.parseFloat(x).toFixed(2);
}

export default ProfileCard;
