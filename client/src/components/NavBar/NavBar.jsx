import React from "react";
import { Link } from "react-router-dom";
import logo_wooly from "../../assets/logo_wooly.png";
import Style from "./NavBar.module.css"
/* import { GrCart } from "react-icons/gr"; */

export default function NavBar () {
    return(
        <nav className={Style.NavBarComplete}>
            <div className={Style.left}>
                <Link to={"/home"}>
                    <img src={logo_wooly} alt="Not Found" width="85px" height="85px" className={Style.logo} />
                </Link>
            </div>
            <div className={Style.center}>
                <div className={Style.button}>

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
            </div>
            <div className={Style.right}>
                <Link to={"/create"}>
                    ADD CLOTHES
                </Link>
            </div>

        </nav> 
    )
};