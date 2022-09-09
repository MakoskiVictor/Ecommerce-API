import "./App.css";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import { Home } from "./components/Home/Home";
import ErrorPage from "./components/ErrorPage/ErrorPage";
import Details from "./components/Details/Details.jsx";
import Formulario from "./components/Formulario/Formulario";
// register
import Register from "./components/Register/Register.jsx";
import NavBar from "./components/NavBar/NavBar.jsx";
import Footer from "./components/Footer/Footer.jsx";
import About from "./components/About/About.jsx";
import ComponentProducts from "./components/ComponentProducts/ComponentProducts.jsx";
import Contact from "./components/Contact/Contact";
import Carry from "./components/Carry/Carry";
// import GoogleLogin from "react-google-login";
import Login from "./components/Login/Login";
import payment from "./components/Pago/Pay";
import {AuthProvider} from "./context/authContext.jsx";
import ModifyItem from "./components/ModifyITem/ModifyItem";

function App() {
   return (
      <BrowserRouter>
      {/* <AuthProvider> */}
         <div className="App"> 
            {/* nav bar */}
            <NavBar />
            <Switch>
               <Route exact path="/">
                  <Home />{" "}
               </Route>
               <Route exact path="/products/:gender">
                  <ComponentProducts />{" "}
                  {/*Se pone asi porque los componentes estan creadas como Clase*/}
               </Route>
               <Route path="/login" component={Login} />
               <Route path="/details/:id" component={Details}></Route>{" "}

               <Route exact path="/createProduct" component={Formulario} />{" "}
               {/*Se pone asi porque los componentes estan creadas como Funcion*/}
               <Route path="/about" component={About}></Route>
               <Route path="/contact" component={Contact} />
               <Route exact path="/register" component={Register} />
               <Route path="/carry"><Carry /> </Route>
               <Route exact path="/payment" component={payment} />

               <Route component={ErrorPage}></Route>
               {/* sprint 2 */}
               {/* <Route exact path="/profile">aca va el componente del perfil de usuario</Route> */}
               {/* <Route exact path="/login">aca va el componente de login/inicio de sesion</Route> */}

            </Switch>
            <Footer />
         { /* </AuthProvider> */ }
         </div>
      </BrowserRouter>
   );
}

//  const respuestaGoogle = (respuesta) =>{
//   console.log(respuesta)
//  }
// <GoogleLogin
//   clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
//   buttonText="Login"
//   onSuccess={responseGoogle}
//   onFailure={responseGoogle}
//   cookiePolicy={'single_host_origin'}
// />

export default App;
