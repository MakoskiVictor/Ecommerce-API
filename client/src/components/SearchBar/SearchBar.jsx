import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { searchNameProduct } from "../../redux/actions";
import style from "./SearchBar.module.css"

export default function SearchBar() {
    const dispatch = useDispatch();
    const [name, SetName] = useState("");


    function handleInputChange(e) {
        e.preventDefault()
        SetName(e.target.value)
    }

    function handleSubmit(e) {
        e.preventDefault()
        dispatch(searchNameProduct(name))
        SetName("")
    }

    return (
        <div className={style.containSearchBar}>
            <section className={style.mainInput}>
                <div className={style.mainInputContainer}>
                    <input
                        type="text"
                        value={name}
                        placeholder="Search Product"
                        onChange={((e) => handleInputChange(e))} />
                </div>
            </section>
            <section className={style.mainButtons}>
                <button onClick={(e) => handleSubmit(e)} type="submit" outline="none">Search</button>
            </section>
        </div>
    )
}
