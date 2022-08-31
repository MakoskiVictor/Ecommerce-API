import React from "react";
import { Link } from "react-router-dom";
import favicon from "../../assets/favicon.ico"
import { GrCart } from "react-icons/gr";

export default function NavBar () {
    return(
        <nav>
            <div>
                <Link to={"/home"}>
                    <img src={favicon} alt="Not Found" />
                </Link>

                <Link to={"/products"}>
                    PRODUCTS
                </Link>

                <Link to={"/about"}>
                    ABOUT
                </Link>

                <Link to={"/contact"}>
                    CONTACT
                </Link>
            </div>
            <div>
                <Link to={"/cart"}>
                    <GrCart/>
                </Link>
                <Link to={"/login"}>
                    LOGIN
                </Link>
            </div>

        </nav> 
    )
};