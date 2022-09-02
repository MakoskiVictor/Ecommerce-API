import React from "react";
import { Link } from "react-router-dom";
import logo_wooly from "../../assets/logo_wooly.png";
import Style from "./NavBar.module.css"
import logo from "../image/logo.png"
/* import { GrCart } from "react-icons/gr"; */

export default function NavBar () {
    return(
        <nav className={Style.NavBarComplete}>
            <div className={Style.left}>
                <Link to={"/"}>
                    {/* <img src={logo_wooly} alt="Not Found" width="85px" height="85px" className={Style.logo} /> */}
                    <img src={logo} alt="Not Found" width="85px" height="85px" className={Style.logo} />
                </Link>
            </div>
            <div className={Style.center}>
                <div className={Style.container}>
                    <ul className={Style.NavUl}>

                    {/* <Link to={"/products"}>
                        PRODUCTS
                    </Link> */}
                    <li>
                        <Link to={"/men"} className={Style.letra}>
                            MEN
                        </Link>
                        <Link to={"/women"} className={Style.letra}>
                            WOMEN
                        </Link>
                    </li>
                    <li>

                    <Link to={"/about"} className={Style.letra}>
                        ABOUT
                    </Link>

                    <Link to={"/contact"} className={Style.letra}>
                        CONTACT
                    </Link>
                    <Link to={"/about"} className={Style.letra}>
                        LOGIN
                    </Link>
                    <Link to={"/about"} className={Style.letra}>
                        REGISTER
                    </Link>


                    </li>
                </ul>

                </div>
            </div>
            {/* <div className={Style.right}>
                <Link to={"/create"}>
                    ADD CLOTHES
                </Link>
            </div> */}

        </nav> 
    )
};