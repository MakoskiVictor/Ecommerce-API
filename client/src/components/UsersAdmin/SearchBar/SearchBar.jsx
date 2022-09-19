import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getSearchUser } from "../../../redux/actions";
import style from "./SearchBar.module.css"

export default function SearchBar({ users }) {
    const dispatch = useDispatch();
    const [name, SetName] = useState("");


    function handleInputChange(e) {
        e.preventDefault()
        SetName(e.target.value)
    }

    function handleSubmit(e) {
        e.preventDefault()
        dispatch(getSearchUser(name))
        SetName("")
    }

    return (
        <div className={style.containSearchBar}>
            {console.log("usuario:", users)}
            <section className={style.mainInput}>
                <div className={style.mainInputContainer}>
                    <input
                        type="text"
                        value={name}
                        placeholder="Search User"
                        onChange={((e) => handleInputChange(e))} />
                </div>
            </section>
            <section className={style.mainButtons}>
                {users.length === 0 ? <button onClick={(e) => handleSubmit(e)} type="submit" outline="none">Refresh</button>
                    : <button onClick={(e) => handleSubmit(e)} type="submit" outline="none">Search</button>}

            </section>
        </div>
    )
}
