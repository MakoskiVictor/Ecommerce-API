import React, { useState} from "react";
import axios from "axios";
import swal from "sweetalert";


export default function CardUsersAdmin ({image, name, lastName, id, email, address, isAdmin, isBaned}) {


    async function handleAdmin (e) {
        e.preventDefault();
        
        swal({
            title: "Change Admin Status",
            text: "Are you sure you want to continue?",
            icon: "warning",
            buttons: ["Cancel", "I am sure"]
        }).then(resp=>{
            if(resp) {
                    /* console.log("ESTE USER AHORA ES ADMIN", !isAdmin) */
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
        swal({
            title: "Change Ban Status",
            text: "Are you sure you want to continue?",
            icon: "warning",
            buttons: ["Cancel", "I am sure"]
        }).then(resp=>{
            if(resp) {
                /* console.log("ESTE USER ESTA BANNED", !isBaned) */
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
    };

    return (
        <div key={id}>
            <div>
                <img src={image ? image : "https://cdn-icons-png.flaticon.com/512/1160/1160040.png?w=740&t=st=1662562187~exp=1662562787~hmac=4e81ab45c142d4e1ba117cc74f05df4bfa43bd3ec69b23769d5443b1cb0f0529"} 
                    alt="Image Not Found" width="140" height="150"/> 
                <p>Name: {name} </p>
                <p>Last Name: {lastName} </p>
                <p>Email: {email} </p>
                <p>Address: {address} </p>
                <p>Admin: {isAdmin === false ? "False" : "True"} </p>
                <p>Banned: {isBaned === false ? "False" : "True"} </p>
            </div>
            {/* {isAdmin === false ? <button onClick={handleAdmin}>PROMOTE TO ADMIN</button> : <button onClick={handleAdmin}>REMOVE ADMIN</button>} */}
            <button onClick={handleAdmin} name="adminButton" > {isAdmin === false ? "PROMOTE TO ADMIN" : "REMOVE ADMIN"} </button>
            <button onClick={handleBan}> {isBaned === false ? "BAN" : "REMOVE BAN"} </button>
    </div>
    )
};