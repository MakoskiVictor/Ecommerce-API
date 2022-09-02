import { Route, Switch } from "react-router-dom";

import {Home} from "./components/Home/Home";
import ErrorPage from "./components/ErrorPage/ErrorPage";
import Landing from "./components/Landing/Landing.jsx";
import SearchBar from "./components/SearchBar/SearchBar.jsx";

import ProductCards from "./components/Products/ProductCards.jsx";
import Filter from "./components/Filter/Filter.jsx";
import Paginated from "./components/Paginated/Paginated.jsx";
import "./App.css";

function App() {
  return (
    <div className="App">
      {/* nav bar */}
      <Switch>
      
      <Route exact path="/rutaPrueba"> <Filter/> <Paginated /> <ProductCards/></Route>
        {/* <Route exact path="/" component={Landing} /> */}
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
      </Switch>
      {/* footer */}
    </div>
  );
}

export default App;
