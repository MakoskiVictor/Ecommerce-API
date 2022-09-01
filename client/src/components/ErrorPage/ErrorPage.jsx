import React, { useContext } from "react";
import { Link } from "react-router-dom";
import s from './ErrorPage.module.css'



export default function ErrorPage(){


 return (

     <div className={s.container}>
         <div>
         <h1 className={s.h1}>Error 404 Page Not Found!</h1>
         <h2 className={s.h2}> There are no clothes here 👕👚</h2>
         </div>
        <div className={s.btnDiv}>
        <Link className={s.links} to="/">
        <button className={s.btn}> Back to home</button>
        </Link>
        </div>
         {/* <img className={s.img} src={error} alt="img not found!" /> */}
     </div>
 )
}