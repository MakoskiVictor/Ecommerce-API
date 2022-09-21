import React, {useState} from 'react';
import {Link} from "react-router-dom";
import { useSelector } from "react-redux";
import swal from "sweetalert";
import { useHistory } from "react-router-dom";
import axios from "axios";

export default function ModifyUserPassword () {

    const user_login = useSelector((state) => state.user_login);
    const history = useHistory();
    const id = user_login.id;

    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    console.log("OLD", oldPassword, "NEW", newPassword, "CONFIRM", confirmPassword)

    //FUNCION PARA CAMBIAR LA CONTRASEÑA

    const changePassword = async () => {
        await axios.put(`http://localhost:3001/users/${id}?type=password`, {
            oldPassword,
            newPassword,
          });
    };

    //BOTON SUBMIT
    async function handleSubmit (e) {
        e.preventDefault();
        if (newPassword.length < 6) {
            return swal({
              title: "Password need to have at least six characters!",
              icon: "error",
              button: "Ok",
            });
          }
        if (newPassword !== confirmPassword) {
        return swal({
            title: "Passwords not match!",
            icon: "error",
            button: "Ok",
        });
        }
        
        //SI ESTA TODO OK
        try {
            await changePassword()
            .then(() => {
                swal({
                  title: "Password changed successfully!",
                  icon: "success",
                  button: "Ok",
                }).then(() => {
                  history.push("/profile");
                });
              });
        } catch (error) {
            swal({
                title: "Old password incorrect!",
                icon: "error",
                button: "Ok",
              });
        }





    }




    return(
        <>
            <h2>Change Mail</h2>
            <form onSubmit={handleSubmit}>
            <div>
                <label>Old Password: </label>
                    <input 
                    type="password" 
                    maxLength={18}
                    value={oldPassword}
                    name="oldPassword"
                    placeholder="Old Password"
                    onChange={(e) => setOldPassword(e.target.value)}
                    />
                </div>
                <div>
                <label>New Password: </label>
                    <input 
                    type="password" 
                    maxLength={18}
                    value={newPassword}
                    name="newPassword"
                    placeholder="New Password"
                    onChange={(e) => setNewPassword(e.target.value)}
                    />
                </div>
                <div>
                <label>Confirm Password: </label>
                    <input 
                    type="password" 
                    maxLength={18}
                    value={confirmPassword}
                    name="ConfirmPassword"
                    placeholder="Confirm Password"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </div>
            <div>
                <button type="submit">Confirm</button>
            </div>
            <div>
                <Link to={"/profile"}>
                    <button>Cancel</button>
                </Link>
            </div>
            </form>
        </>
    )
};