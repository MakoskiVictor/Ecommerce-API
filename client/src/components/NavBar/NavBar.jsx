import React from "react";
import { Link } from "react-router-dom";
import logo_wooly from "../../assets/logo_wooly.png";
import Style from "./NavBar.module.css"
import logo from "../image/logo.png"
import { useState } from "react";
import ComponentLogin from "../ComponentLogin/ComponentLogin";
/* import { GrCart } from "react-icons/gr"; */




export default function NavBar() {
    const [openModal, setOpenModal] = useState(false);

    function handleOpen() {
        setOpenModal(true)
    }

    function handleClose(value) {
        setOpenModal(value)
    }

    return (
        <header>
            <div>
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
                                    <Link to={"/products/Men"} className={Style.letra}>
                                        MEN
                                    </Link>
                                    <Link to={"/products/Women"} className={Style.letra}>
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
                                    {/*<Link to={"/about"} className={Style.letra}>
                        LOGIN
                    </Link>
                    <Link to={"/register"} className={Style.letra}>
                        REGISTER
                    </Link>*/}
                                    <Link to={"/createProduct"} className={Style.letra}>
                                        CREATE_PRODUCT
                                    </Link>
                                    <div>
                                        <button onClick={handleOpen} className='button_login'>Inicia sesión</button>
                                    </div>
                                    <div>
                                        <Link to='/register'><button className='button_register'>Regístrate</button></Link>
                                    </div>
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
            </div>
            {openModal &&
                <div className={Style.ModalAbiertoBackground}></div>
            }
            {openModal &&
                <div className={Style.ModalLogin}>
                    <ComponentLogin close={handleClose} />
                </div>
            }
        </header>

    )
};