import React from "react";
import { Link } from "react-router-dom";
import logo_wooly from "../../assets/logo_wooly.png";
import Style from "./NavBar.module.css";
import logo from "../image/logo.png";
import { useState } from "react";
// import ComponentLogin from "../ComponentLogin/ComponentLogin";
import Login from "../Login/Login";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { IconContext } from "react-icons";
import { Badge } from "@mui/material";
import CARRY_LOCALHOST from "../Globales";
import { useDispatch, useSelector } from "react-redux";

export default function NavBar(props) {
  const carryProducts = useSelector((state) => state.carryProducts);

  const [openModal, setOpenModal] = useState(false);

  function handleOpen() {
    setOpenModal(true);
  }

  function handleClose(value) {
    setOpenModal(value);
  }

  return (
    <header>
      <nav className={Style.NavBarComplete}>
        <div className={Style.left}>
          <Link to={"/"}>
            {/* <img src={logo_wooly} alt="Not Found" width="85px" height="85px" className={Style.logo} /> */}
            <img
              src={logo}
              alt="Not Found"
              width="85px"
              height="85px"
              className={Style.logo}
            />
          </Link>
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
          </ul>
        </div>
        <div className={Style.center}>
          <ul className={Style.NavUl}>
            {/* <li>
                <Link to={"/products/Men"} className={Style.letra}>
                  MEN
                </Link>
              </li>
              <li>
                <Link to={"/products/Women"} className={Style.letra}>
                  WOMEN
                </Link>
              </li> */}
            {/* <li>
                  <Link to={"/about"} className={Style.letra}>
                    ABOUT
                  </Link>
                </li>
                <li>
                  <Link to={"/contact"} className={Style.letra}>
                    CONTACT
                  </Link>
                </li> */}
            <li>
              <Link to={"/carry"} className={Style.btnCarry}>
                <Badge badgeContent={carryProducts} color="primary">
                  <IconContext.Provider value={{ size: "40px" }}>
                    <AiOutlineShoppingCart />
                  </IconContext.Provider>
                </Badge>
              </Link>
            </li>
            {/*<Link to={"/about"} className={Style.letra}>
                        LOGIN
                    </Link>
                    <Link to={"/register"} className={Style.letra}>
                        REGISTER
                    </Link>*/}
            <li className={Style.liFormat}>
              <Link to={"/createProduct"} className={Style.letra}>
                CREATE_PRODUCT
              </Link>
            </li>
          </ul>
          <button onClick={handleOpen} className={Style.buttonlogin}>
            Login/Register
          </button>
        </div>
        {/* <div className={Style.right}>
                <Link to={"/create"}>
                    ADD CLOTHES
                </Link>
            </div> */}
      </nav>

      {openModal && <div className={Style.ModalAbiertoBackground}></div>}
      {openModal && (
        <div className={Style.ModalLogin}>
          <Login close={handleClose} />
        </div>
      )}
    </header>
  );
}
