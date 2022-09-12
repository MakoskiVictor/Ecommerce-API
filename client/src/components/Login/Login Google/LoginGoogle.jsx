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



///PRUEBA GITTTT

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
      try{
      await googleLogin();}
      catch(error){
         console.log("error firebase ",error)
      }
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

         <button onClick={handlegoogleLogin}><svg
            xmlns="http://www.w3.org/2000/svg"
            width="35"
            height="35"
            preserveAspectRatio="xMidYMid"
            viewBox="0 0 256 262"
          >
            <path
              fill="#4285F4"
              d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
            />
            <path
              fill="#34A853"
              d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
            />
            <path
              fill="#FBBC05"
              d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"
            />
            <path
              fill="#EB4335"
              d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
            />
          </svg>
         </button>
      </div>
   )
}


export default LoginGoogle;
