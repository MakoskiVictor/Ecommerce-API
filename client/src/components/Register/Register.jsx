import React from "react";
import { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import swal from "sweetalert";
import { image, address } from "../../assets/constantes";


export default function Register() {

  //ESTADOS

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");


  const history = useHistory();

  //VALIDACIONES

  function ValidateEmail(mail) {
    if (/^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/.test(mail)) {
      return true;
    }
    return false;
  };

  function ValidarName(name) {
    if (!/^[a-zA-Z\ áéíóúÁÉÍÓÚñÑ\s]*$/.test(name)) {
      return false;
    } else {
      return true;
    }
  };

  //REGISTER FUNCTION (POST)

  const register = async () => {
    return await axios
      .post("http://localhost:3001/users", {
        name,
        email,
        password,
        lastName,
        image,
        address,

      })
      .then((response) => {
        console.log(response)
      });
  };


  //REGISTER

  const handleRegister = async (e) => {
    e.preventDefault();


    //PROBANDO LAS VALIDACIONES

    if (name.length < 3) {
      return swal({
        title: "Name must have more characters!",
        icon: "error",
        button: "Ok",
      });
    }

    if (lastName.length < 3) {
      return swal({
        title: "Lastname must have more characters!",
        icon: "error",
        button: "Ok",
      });
    }

    if (password.length < 6) {
      return swal({
        title: "Password need to have at least six characters!",
        icon: "error",
        button: "Ok",
      });
    }

    if (ValidarName(name) === false) {
      return swal({
        title: "You can not use special characters on Name!",
        icon: "error",
        button: "Ok",
      });
    }

    if (ValidarName(lastName) === false) {
      return swal({
        title: "You can not use special characters on Lastname!",
        icon: "error",
        button: "Ok",
      });
    }

    if (passwordConfirm !== password) {
      return swal({
        title: "Passwords not match!",
        icon: "error",
        button: "Ok",
      })
    }

    if (ValidateEmail(email) === false) {
      return swal({
        title: "Need to use a valid mail!",
        icon: "error",
        button: "Ok",
      })
    }

    //SI LAS VALIDACIONES ESTAN OK

    try {

      await register(name, lastName, password, email).then((response) => {

        swal({
          title: "User created successfully!",
          icon: "success",
          button: "Ok",
        }).then(() => {
          history.push("/");
        })
      });
    } catch (error) {
      console.log(error);
    }
  };



  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleRegister}>
        <div>
          <input
            type="text"
            maxLength="35"
            value={name}
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <input
            type="text"
            maxLength="35"
            value={lastName}
            placeholder="LastName"
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div>
          <input
            type="password"
            maxLength={18}
            value={password}
            name="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <input
            type="password"
            maxLength={18}
            value={passwordConfirm}
            name="PasswordConfirm"
            placeholder="Confirm Password"
            onChange={(e) => setPasswordConfirm(e.target.value)}
          />
        </div>
        <div>
          <input
            type="text"
            value={email}
            name="email"
            maxLength="40"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button
          type="submit"
        >
          Register
        </button>
      </form>
    </div>
  )
};