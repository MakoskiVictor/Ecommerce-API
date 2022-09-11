import React from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import axios from 'axios';
// import { image, address } from "../../assets/constantes";
import { useHistory } from "react-router-dom";


function Profile() {
    const { user, isAuthenticated } = useAuth0();
    const history = useHistory();
    // function separar(email) {
    //     let separando = email.splice("|");
    //     console.log(separando)
    // }

    //REGISTER FUNCTION (POST)

    const register = async (user) => {
        const { name, family_name, sub, email, picture } = user;
        return await axios
            .post("http://localhost:3001/users", {
                name: name,
                email: email,
                password: sub,
                lastName: family_name,
                image: picture,
                address: "Need to complete",
            })
            .then((response) => {
                console.log(response);
            });
    };

    // const handleRegister = async (user) => {
    //     try {
    //         /* singup(email, password) */
    //         await register(user.name, user.family_name, password, email).then((response) => {
    //             swal({
    //                 title: "User created successfully!",
    //                 icon: "success",
    //                 button: "Ok",
    //             }).then(() => {
    //                 history.push("/");
    //             });
    //         });
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };



    return (
        isAuthenticated && register(user) &&
        < div >
            {/* {console.log(separar(user.email))} */}
            < img src={user.picture} alt="" width="20px" height="20px" />
            <p>name: {user.given_name}</p>
            <p>last name: {user.family_name}</p>
            <p>password: {user.sub}</p>
            <p>email: {user.email}</p>

            {/* {console.log(name)} */}
        </ div >
    )

}
export default Profile;