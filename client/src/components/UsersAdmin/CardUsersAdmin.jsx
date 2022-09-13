import React from "react";

export default function CardUsersAdmin ({image, name, lastName, id, email, address, isAdmin, isBaned}) {


    return (
        <div key={id}>
        <img src={image ? image : "https://cdn-icons-png.flaticon.com/512/1160/1160040.png?w=740&t=st=1662562187~exp=1662562787~hmac=4e81ab45c142d4e1ba117cc74f05df4bfa43bd3ec69b23769d5443b1cb0f0529"} alt="Image Not Found" width="140" height="150"/> 
        <p>Name: {name} </p>
        <p>Last Name: {lastName} </p>
        <p>ID: {id} </p>
        <p>Email: {email} </p>
        <p>Address: {address} </p>
        <p>Admin: {isAdmin === false ? "False" : "True"} </p>
        <p>Banned: {isBaned === false ? "False" : "True"} </p>

    </div>
    )
};