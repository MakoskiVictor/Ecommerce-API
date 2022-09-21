/* import "./App.css"; */
import { Route, Switch } from "react-router-dom";
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
import ComponentProductsGestion from "./components/ComponentProductsGestion/ComponentProductsGestion";
import Contact from "./components/Contact/Contact";
import Carry from "./components/Carry/Carry";
// import GoogleLogin from "react-google-login";
import Login from "./components/Login/Login";
import payment from "./components/Pago/Pay";
import { AuthProvider } from "./context/authContext.jsx";
import Profile from "./components/Profile/Profile";
import ModifyItem from "./components/ModifyITem/ModifyItem";  
import UsersAdmin from "./components/UsersAdmin/UsersAdmin";
import DemoTable from "./components/AdminOrders/AdminOrders.tsx";
import Favorites from "./components/Favs/Favorites";
import ModifyUser from "./components/ModifyUser/ModifyUser";
import ModifyUserImage from "./components/ModifyUser/ModifyUserImage";
import ModifyUserPassword from "./components/ModifyUser/ModifyUserPassword";

import NavUser from "./components/NavUser/NavUser.jsx";
import Orders2 from "./components/Orders/Orders2";
import OrdersDetails from "./components/Orders/OrdersDetails";

// login Google
import LoginGoogle from "./components/Login/Login Google/LoginGoogle";

import styles from "./App.module.css";
import AdminDetailOrder from "./components/AdminOrders/AdminDetailOrder.jsx";
import PasarelaDePago from "./components/PasarelaDePago/FormularioContactoDelivery.jsx"

function App() {
   return (
      <div className={styles.App}>
         <AuthProvider>
            {/* nav bar */}
            <NavBar />
            <Switch>
               <Route exact path="/">
                  <Home />{" "}
               </Route>
               <Route exact path="/gestionProducts">
                  <ComponentProductsGestion />{" "}
                  {/*Se pone asi porque los componentes estan creadas como Clase*/}
               </Route>
               <Route exact path="/products/:gender">
                  <ComponentProducts />{" "}
                  {/*Se pone asi porque los componentes estan creadas como Clase*/}
               </Route>
               <Route exact path="/profile" component={Profile} />
               <Route exact path="/login" component={Login} />
               <Route path="/details/:id" component={Details}></Route>{" "}
               <Route exact path="/createProduct" component={Formulario} />{" "}
               {/*Se pone asi porque los componentes estan creadas como Funcion*/}
               <Route path="/favorites" component={Favorites} />
               <Route exact path="/about" component={About}></Route>
               <Route exact path="/contact" component={Contact} />
               <Route exact path="/LoginGoogle" component={LoginGoogle} />
               <Route exact path="/register" component={Register} />
               <Route path="/carry">
                  <Carry />{" "}
               </Route>
               <Route exact path="/payment" component={payment} />
               <Route exact path="/orders" component={Orders2} />
               <Route path="/OrderDetails/:id" component={OrdersDetails} />
               <Route exact path="/usersAdmin" component={UsersAdmin} />
               <Route exact path="/ModifyUser" component={ModifyUser} />
               <Route exact path="/modifyUserImage" component={ModifyUserImage}></Route>
               <Route exact path="/modifyUserPassword" component={ModifyUserPassword}></Route>

               <Route component={ErrorPage}></Route>
               {/* sprint 2 */}
               {/* <Route exact path="/profile">aca va el componente del perfil de usuario</Route> */}
               {/* <Route exact path="/login">aca va el componente de login/inicio de sesion</Route> */}
            </Switch>
         </AuthProvider>
         <Footer />
      </div>
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
