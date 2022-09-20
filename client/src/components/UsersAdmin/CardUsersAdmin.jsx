import React, { useState} from "react";
import axios from "axios";
import swal from "sweetalert";
import s from "./CardUsersAdmin.module.css"


export default function CardUsersAdmin ({image, name, lastName, id, email, address, isAdmin, isBaned}) {


    async function handleAdmin (e) {
        e.preventDefault();
        
        if(isBaned) {
            swal({
                title: "First need remove Ban Status",
                icon: "error",
                button: "Ok"
        })} else if (
            email === "enzoholgadodev@gmail.com" ||
            email === "makoski.ed@gmail.com" ||
            email === "sebaslkjh@gmail.com" ||
            email === "ingdcuevas@gmail.com" ||
            email === "mattvalenti11@gmail.com" ||
            email === "rider_shock@outlook.es" ||
            email === "marina-mansilla@hotmail.com" ||
            email === "eze-leiva@hotmail.com"
         ) {
            swal({
                title: "Imposible quit Admin to Super Admin",
                icon: "error",
                button: "Ok"
        })} else
            swal({
                title: "Change Admin Status",
                text: "Are you sure you want to continue?",
                icon: "warning",
                buttons: ["Cancel", "I am sure"]
            }).then(resp=>{
                if(resp) {
                        axios.put(`http://localhost:3001/users/${id}?type=admin`)
                .then(swal({
                    title: "Success",
                    icon: "success",
                    button: "Ok"
                }))
                .then(res => {
                    if(res) {
                        window.location.reload()
                }})
                };
            }).catch((error) => {
                console.log(error)
            })
        };

    async function handleBan (e) {
        e.preventDefault();

        if(isAdmin === true) {
            swal({
                title: "First need remove Admin Status",
                icon: "error",
                button: "Ok"
        })} else if (
            email === "enzoholgadodev@gmail.com" ||
            email === "makoski.ed@gmail.com" ||
            email === "sebaslkjh@gmail.com" ||
            email === "ingdcuevas@gmail.com" ||
            email === "mattvalenti11@gmail.com" ||
            email === "rider_shock@outlook.es" ||
            email === "marina-mansilla@hotmail.com" ||
            email === "eze-leiva@hotmail.com"
         ) {
            swal({
                title: "Imposible get ban to Super Admin",
                icon: "error",
                button: "Ok"
        })} else {
            swal({
                title: "Change Ban Status",
                text: "Are you sure you want to continue?",
                icon: "warning",
                buttons: ["Cancel", "I am sure"]
            }).then(resp=>{
                if(resp) {
                    axios.put(`http://localhost:3001/users/${id}?type=ban`)
                .then(swal({
                    title: "Success",
                    icon: "success",
                    button: "Ok"
                }))
                .then(res => {
                        if(res) {
                            window.location.reload()
                    }})
                };
            }).catch((error) => {
                console.log(error)
            })
        }
    };

    return (
        <div key={id } className={s.productContainer}>
            <section className={s.containerMain}>
                        <div className={s.photoContainer}>
                            <img className={s.photo} src={image ? image : "https://cdn-icons-png.flaticon.com/512/1160/1160040.png?w=740&t=st=1662562187~exp=1662562787~hmac=4e81ab45c142d4e1ba117cc74f05df4bfa43bd3ec69b23769d5443b1cb0f0529"} 
                                alt="Not Found" width="140" height="150"/>
                        </div>
                    <section className={s.MainContainerInfo}>
                        <section className={s.brandGender}>
                            <h3>Name: {name} </h3>
                            <p>Last Name: {lastName} </p>
                            <p>Email: {email} </p>
                            <p>Address: {address} </p>
                            <p>Admin: {isAdmin === false ? "False" : "True"} </p>
                            {/* <h4>Banned: {isBaned === false ? "False" : "True"} </h4> */}
                        </section>
                        <br />
                        <div className={s.buttonContain}>
                            <button className={s.remove} onClick={handleAdmin} name="adminButton" > {isAdmin === false ? "PROMOTE TO ADMIN" : "REMOVE ADMIN"} </button>
                            <button className={s.buttonDelete} onClick={handleBan}> {isBaned === false ? "BAN" : "REMOVE BAN"} </button>
                        </div>
                    </section>
             </section>


        </div>
    )
};