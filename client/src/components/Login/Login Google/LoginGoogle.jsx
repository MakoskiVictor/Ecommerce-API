import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../../context/authContext";
import { auth } from "../../../firebase"
import {
   GoogleAuthProvider,
   signInWithPopup,
} from "firebase/auth"
import axios from "axios"
import { LoginGoogleUser, LoginGoogleUSer } from "../../../redux/actions"

const googleLogin = () => {
   const googleProvider = new GoogleAuthProvider;
   return signInWithPopup(auth, googleProvider)
}





function LoginGoogle() {

   const dispacth = useDispatch();

   const register = async (user) => {
      let nombreSep = user.displayName.split(" ");

      let name = nombreSep[0]
      let lastname = nombreSep[1].concat(" ", nombreSep[2])

      const { uid, email, photoURL } = user;

      return await axios
         .post("http://localhost:3001/users/Google", {
            name: name,
            email: email,
            password: uid,
            lastName: lastname,
            image: photoURL,
            address: "Need to complete",
         })
         .then((response) => {
            console.log("respuesta ", response.data);
            dispacth(LoginGoogleUser(response.data))
         });
   };


   const separarNombre = (nombre) => {
      let nombreSep = nombre.split(" ");
      return {
         name: nombreSep[0],
         lastname: nombreSep[1].concat(" ", nombreSep[2])
      }

   }


   const { user } = useAuth();

   const history = useHistory();

   const handlegoogleLogin = async () => {
      await googleLogin();
      history.push("/");

   }

   if (user) {
      console.log("registro")
      register(user.providerData[0])
   }

   return (
      <div>

         {/* {console.log(user)}
      {console.log("usuario", user.providerData[0])}
   {console.log(separarNombre(user.providerData[0].displayName))} */}

         <button onClick={handlegoogleLogin}>Login Google</button>
      </div>
   )
}


export default LoginGoogle;
