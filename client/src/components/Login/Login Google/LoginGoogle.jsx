import React from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../../context/authContext";
import { auth } from "../../../firebase"
import {
   GoogleAuthProvider,
   signInWithPopup,
} from "firebase/auth"

const googleLogin = () => {
   const googleProvider = new GoogleAuthProvider;
   return signInWithPopup(auth, googleProvider)
}





function LoginGoogle() {

   const { user } = useAuth();

   const history = useHistory();

   const handlegoogleLogin = async () => {
      await googleLogin();
      history.push("/");

   }
   return <div>
      {console.log(user)}
      <button onClick={handlegoogleLogin}>Login Google</button>
   </div>;
}

export default LoginGoogle;
