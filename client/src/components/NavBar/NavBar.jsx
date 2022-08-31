import React from "react";
import { Link } from "react-router-dom";
import favicon from "../../assets/favicon.ico"
import { GrCart } from "react-icons/gr";

export default function NavBar () {
    return(
        <div>
            <div>
                <Link to={"/home"}>
                    <img src={favicon} alt="Not Found" />
                </Link>
            </div>
            <div>
                <Link to={"/products"}>
                    <button>PRODUCTS</button>
                </Link>
            </div>
            <div>
                <Link to={"/about"}>
                    <button>ABOUT</button>
                </Link>
            </div>
            <div>
                <Link to={"/contact"}>
                    <button>CONTACT</button>
                </Link>
            </div>
            <div>
                <Link to={"/cart"}>
                    <GrCart/>
                </Link>
            </div>
            <div>
                <Link to={"/login"}>
                    <button>LOGIN</button>
                </Link>
            </div>

        </div>
    )
};