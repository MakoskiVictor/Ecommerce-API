import { Route, Switch } from "react-router-dom";
import ErrorPage from "./components/ErrorPage/ErrorPage";
import "./App.css";

function App() {
  return (
    <div className="App">
      {/* nav bar */}
      <Switch>
        {/* <Route exact path="/">aca va el componente home</Route> */}
        {/* <Route exact path="/products">aca va el componente products</Route> */}
        {/* <Route path="/products/:id">aca va el componente detalles</Route> */}
        {/* <Route exact path="/about">aca va el componente about</Route> */}
        {/* <Route exact path="/contact">aca va el componente contacto</Route> */}

        {/* sprint 2 */}
        {/* <Route exact path="/profile">aca va el componente del perfil de usuario</Route> */}
        {/* <Route exact path="/login">aca va el componente de login/inicio de sesion</Route> */}
        {/* <Route exact path="/signup">aca va el componente de signup/registro</Route> */}
        {/* <Route exact path="/cart">aca va el componente del carrito de compras</Route> */}
        <Route component={ErrorPage} />
      </Switch>
      {/* footer */}
    </div>
  );
}

export default App;
