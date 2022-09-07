import { Route, Switch, BrowserRouter } from "react-router-dom";

import { Home } from "./components/Home/Home";
import ErrorPage from "./components/ErrorPage/ErrorPage";
import Landing from "./components/Landing/Landing.jsx";
import SearchBar from "./components/SearchBar/SearchBar.jsx";
import Details from "./components/Details/Details.jsx";
import Formulario from "./components/Formulario/Formulario";

import ProductCards from "./components/Products/ProductCards.jsx";
import Filter from "./components/Filter/Filter.jsx";
import Paginated from "./components/Paginated/Paginated.jsx";
import NavBar from "./components/NavBar/NavBar.jsx";
import Footer from "./components/Footer/Footer.jsx";
import About from "./components/About/About.jsx";
import ComponentProducts from "./components/ComponentProducts/ComponentProducts.jsx";
import Contact from "./components/Contact/Contact";
import "./App.css";
import GoogleLogin from "react-google-login";
import Login from "./components/Login/Login";

function App() {
  return (
    <BrowserRouter>
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
          {/*Se pone asi porque los componentes estan creadas como Funcion*/}
          <Route exact path="/createProduct" component={Formulario} />{" "}
          {/*Se pone asi porque los componentes estan creadas como Funcion*/}
          <Route path="/about" component={About}></Route>
          <Route path="/contact" component={Contact} />
          {/* <Route exact path="/">aca va el componente home</Route> */}
          {/* <Route exact path="/products">aca va el componente products</Route> */}
          {/* <Route path="/products/:id">aca va el componente detalles</Route> */}
          {/* <Route exact path="/about">aca va el componente about</Route> */}
          {/* <Route exact path="/contact">aca va el componente contacto</Route> */}
          <Route component={ErrorPage}></Route>
          {/* sprint 2 */}
          {/* <Route exact path="/profile">aca va el componente del perfil de usuario</Route> */}
          {/* <Route exact path="/login">aca va el componente de login/inicio de sesion</Route> */}
          {/* <Route exact path="/signup">aca va el componente de signup/registro</Route> */}
          {/* <Route exact path="/cart">aca va el componente del carrito de compras</Route> */}
        </Switch>
        <Footer />
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
