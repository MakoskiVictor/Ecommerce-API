import React from "react";
import { Link } from "react-router-dom";
//import logo_wooly from "../../assets/logo_wooly.png";
import Style from "./NavBar.module.css"
import logo from "../image/logo.png"
import { useState } from "react";
import Login from "../Login/Login";
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { IconContext } from "react-icons";
import { Badge } from '@mui/material';
import { useSelector } from "react-redux";
import NavUser from "../NavUser/NavUser";


export default function NavBar(props) {
    const carryProducts = useSelector((state) => state.carryProducts);
    const user_login = useSelector((state) => state.user_login);

    const [openModal, setOpenModal] = useState(false);

    function handleOpen() {
        console.log("Entra")
        setOpenModal(true)
    }

    function handleClose(value) {
        console.log("Entra")
        setOpenModal(false)
    }
    console.log(openModal)

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
                                <li>
                                    <Link to={"/products/Men"} className={Style.letra}>
                                        MEN
                                    </Link>
                                </li>
                                <li>
                                    <Link to={"/products/Women"} className={Style.letra}>
                                        WOMEN
                                    </Link>
                                </li>
                                <li>

                                    <Link to={"/about"} className={Style.letra}>
                                        ABOUT
                                    </Link>
                                </li>
                                <li>
                                    <Link to={"/contact"} className={Style.letra}>
                                        CONTACT
                                    </Link>
                                </li>
                                <li>
                                    <Link to={"/carry"} className={Style.letra}>

                                        <Badge badgeContent={carryProducts} color="primary">
                                            <IconContext.Provider
                                                value={{ color: 'white', size: '40px' }}
                                            >
                                                <AiOutlineShoppingCart />
                                            </IconContext.Provider>
                                        </Badge>
                                    </Link>
                                </li>
                                { user_login.id!==undefined && user_login.id !== false && user_login.isAdmin!==undefined && user_login.isAdmin==true &&
                                <li>
                                    <Link to={"/createProduct"} className={Style.letra}>
                                        CREATE_PRODUCT
                                    </Link>
                                </li>}
                                <li>
                                    <p className={Style.letra}>
                                    { user_login.id!==undefined && user_login.id === false ?
                                        <button onClick={handleOpen} className={Style.buttonlogin}>Login/Register</button>
                                        : <NavUser />
                                    }
                                    </p>
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
            </div >
            {openModal &&
                <div className={Style.ModalAbiertoBackground}></div>
            }
            {
                openModal &&
                <div className={Style.ModalLogin}>
                    <Login close={handleClose} />
                </div>
            }
        </header >

    )
};