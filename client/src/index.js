import React from "react";
import ReactDOM from "react-dom";
// ? React router ->
import { BrowserRouter } from "react-router-dom";
// ? Redux ->
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import rootReducer from "./redux/reducers";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
//Login Google
import { Auth0Provider } from "@auth0/auth0-react";

const domain = process.env.REACT_APP_AUTH0_DOMAIN;
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;

const store = createStore(
   rootReducer,
   composeWithDevTools(applyMiddleware(thunk))
);

ReactDOM.render(
   <React.StrictMode>
      <Auth0Provider
         domain={domain}
         clientId={clientId}
         redirectUri={window.location.origin}
      >
         <Provider store={store}>
            <BrowserRouter>
               <App />
            </BrowserRouter>
         </Provider>
      </Auth0Provider>
   </React.StrictMode>,
   document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
