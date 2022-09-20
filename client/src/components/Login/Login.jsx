import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { googleLog, postLogin } from "../../Redux/Reducer/reducer";
// import { Link, useNavigate } from "react-router-dom";
import style from "./Login.module.css";
import { getChecklogin } from "../../redux/actions";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import LoginGoogle from "./Login Google/LoginGoogle";
/* import firebase from "../../firebase.js"; */




function Login(props) {

  // const navigate = useNavigate()
  // const token = localStorage.getItem("token")
  const history = useHistory();
  const dispatch = useDispatch()
  const [user, setUser] = useState({ email: "", password: "" })
  const user_login = useSelector((state) => state.user_login);

  function handleChange(e) {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  }


  function handleSubmit(e) {
    e.preventDefault();

    let password = user.password
    let email = user.email.toLowerCase();
    let newLoggedUser = {
      email: email, password: password
    }
    dispatch(getChecklogin(newLoggedUser));
    //hay que buscar la manera de que re-renderice la informacion (logeado y con toquen no actualiza el header, con f5 se arregla)
    //posible solucion: renderizar navbar/header a lo ultimo en home
    // navigate('/home')
    // toast.success("Logueado correctamente.", {position:"top-right"})
  }

  function handleClose() {
    props.close(false)
  }

  function changePageCreateAccount(e) {
    e.preventDefault();
    props.close(false)
    history.push("/register")
  }

  if (user_login.id == undefined || user_login.id !== false)
    props.close(false)

  // const googleLogin = async () => {
  //   //ejecutamos la auth de firebase y guardamos la respuesta
  //   let provider = new firebase.auth.GoogleAuthProvider()
  //   //se ejecuta la verificacion con el usuario recibido
  //   firebase.auth().signInWithPopup(provider)
  //     .then((result) => {
  //       //guardamos en user la respuesta de google
  //       let user = result.user
  //       console.log("el user", user)
  //       //dispatch de la action para hacer la verificacion
  //       dispatch(googleLog(user))
  //     })
  // }

  return (
    <div className={style.loginContainer}>
      {/* console.log(firebase) */}
      <div className={style.login}>
        <button className={style.btnClose} onClick={(e) => handleClose(e)}><b>X</b></button>
        <h1>Login</h1>
        <input type="text" name="email" onChange={(e) => handleChange(e)} placeholder="Email" />
        <input type="password" name="password" onChange={(e) => handleChange(e)} placeholder="Password" />
        <button className={style.btnPrimary} onClick={(e) => handleSubmit(e)}>LOGIN</button>
        <p>Or log using google:</p>
        <LoginGoogle />
      </div>
      <hr />
      <div className={style.createAcc}>
        <p>New here:</p>
        <button className={style.btnPrimary} onClick={(e) => changePageCreateAccount(e)}>CREATE ACCOUNT</button>
      </div>
    </div>
  );
}

export default Login;
