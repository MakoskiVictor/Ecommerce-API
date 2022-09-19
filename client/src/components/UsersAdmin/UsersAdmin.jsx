import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUsers, getAllUsers } from "../../redux/actions";
import CardUsersAdmin from "./CardUsersAdmin";
import ErrorPage from "../ErrorPage/ErrorPage";


export default function UsersAdmin () {

    const dispatch = useDispatch();
    const users = useSelector((state) => state.allUsers);
    const user_login = useSelector((state) => state.user_login);


    useEffect(()=>{
        dispatch(getAllUsers())
        dispatch(deleteUsers())
    }, [dispatch])


    return(
        <>
            {user_login.id && user_login.isAdmin === true ?
                <div>
                    <h1> REGISTERED USERS </h1>
                    {users? 
                    
                users.map((users) => {
                    return(
                        <CardUsersAdmin
                            key={users.id}
                            email={users.email}
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
            :
            <ErrorPage/>
        }
        </>
    )
}
