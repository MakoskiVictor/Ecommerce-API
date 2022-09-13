import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../redux/actions";
import CardUsersAdmin from "./CardUsersAdmin";



export default function UsersAdmin () {

    const dispatch = useDispatch();
    const users = useSelector((state) => state.allUsers);
    /* console.log("SOY USERS", users) */

    useEffect(()=>{
        dispatch(getAllUsers())
    }, [dispatch])


    return(
        <div>
            <h1> REGISTERED USERS </h1>
            {users? 
            
        users.map((users) => {
            return(
                <CardUsersAdmin
                    key={users.id}
                    image={users.image}
                    name={users.name}
                    lastName={users.lastName}
                    id={users.id}
                    address={users.address}
                    isAdmin={users.isAdmin}
                    isBaned={users.isBaned}
                />
            )
        }) :
        <p>NO USERS FOUNDED</p> }
        </div>
    )
}

{/* <div key={users.id}>
<img src={users.image} alt="Image Not Found" width="140" height="150"/>
<p>Name: {users.name} </p>
<p>Last Name: {users.lastName} </p>
<p>ID: {users.id} </p>
<p>Email: {users.email} </p>
<p>Address: {users.address} </p>
<p>Admin: {users.isAdmin === false ? "False" : "True"} </p>
<p>Banned: {users.isBaned === false ? "False" : "True"} </p>

</div> */}