import React from 'react';
import { useHistory } from 'react-router-dom';
import style from "./Formulario.module.css";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { CreateNewProduct } from "../../redux/actions"


// validacion de errores
function validate(input) {
    let errores = {};
    /*      NAME      */

    if (!input.name) {
        errores.name = "Name Product is required"
    }
    else if (input.name.length < 3) {
        errores.name = "The name must contain at least 3 letters"
    }
    else if (/^\s+$/.test(input.name)) {
        errores.name = "The name cannot be a blank space"
    }
    else if (!/^[a-zA-Z ]*$/.test(input.name)) {
        errores.name = "The name must only contain letters"
    }

    /*      PRICE         */

    else if (input.price === null) {
        errores.price = "The Price is required"
    }
    else if (input.price < 0) {
        errores.price = "The price must be a positive number"
    }

    /*    IMG    */

    else if (!input.image) {
        errores.image = "URL Image is required"
    }
    else if (input.image.length < 5) {
        errores.image = "The URl must contain at least 5 letters"
    }
    else if (/^\s+$/.test(input.image)) {
        errores.image = "The URL cannot be a blank space"
    }
    else if (input.image.includes("https://")) {
        errores.image = "The URL must not contain the text 'https://'"
    }
    else if (input.image.includes("http://")) {
        errores.image = "The URL must not contain the text 'http://'"
    }

    /*    BRAND   */

    else if (!input.brand) {
        errores.brand = "Brand name is required"
    }
    else if (input.brand.length < 3) {
        errores.brand = "The Brand name must contain at least 3 letters"
    }
    else if (/^\s+$/.test(input.brand)) {
        errores.brand = "The Brand name cannot be a blank space"
    }
    else if (!/^[a-zA-Z ]*$/.test(input.brand)) {
        errores.brand = "The Brand name must only contain letters"
    }
    /*   GENDER     */
    // else if (input.gender === "Men" && input.categoryId === 8799 ||
    //     input.gender === "Men" && input.categoryId === 3630 ||
    //     input.gender === "Men" && input.categoryId === 9263 ||
    //     input.gender === "Men" && input.categoryId === 4169 ||
    //     input.gender === "Men" && input.categoryId === 2641) {
    //     errores.brand = "el genero elegido no tiene esa categoria, revisala de nuevo"
    // }

    // console.log(input.countries.length)
    return errores // retornamos lo errores
}


function Formulario() {

    const dispatch = useDispatch();
    const [error, SetErrors] = useState({});
    const history = useHistory();

    const [input, SetInput] = useState({
        id: Math.floor(Math.random() * 1000),
        name: "",
        price: undefined,
        image: "",
        brand: "",
        gender: "",
        categoryId: undefined
    });

    function handleChange(e) {
        SetInput({
            ...input,
            [e.target.name]: e.target.value
        });
        SetErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }));
    }

    function handleSelect(e) {
        SetInput({
            ...input,
            gender: e.target.value
        })
    }

    function handleSelectCategory(e) {
        let number = e.target.value
        SetInput({
            ...input,
            categoryId: parseInt(e.target.value)
        })
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (input.id && input.name && input.price && input.image
            && input.brand && input.gender && input.categoryId) {
            dispatch(CreateNewProduct(input));
            alert("Product Created")
            SetInput({
                name: "",
                price: null,
                image: "",
                brand: "",
                gender: "",
                categoryId: null
            });
            history.push("/")
        }
        else alert(" missing data for the creation of a new product");
    }
    //comprobacion de INPUT

    function comprobacionInput(input) {
        if (input.name && input.price &&
            input.image && input.brand && input.gender && input.categoryId) {
            return true
        } else {
            return false
        }
    }

    return (
        <div className={style.containerMain}>
            <h2 className={style.titulo}>Product creation</h2>
            {console.log(error)}
            <form className={style.form} onSubmit={(e) => handleSubmit(e)}>


                <div>
                    <p>Name:</p>
                    {error.name && ( // si hay un error hara un <p> nuevo con el error
                        <p className={style.error}>{error.name}</p>
                    )}
                    <input
                        type="text"
                        value={input.name}
                        className={style.field}
                        name="name"
                        onChange={(e) => handleChange(e)}
                    />
                </div>
                <div>
                    <p>Price: </p>
                    {error.price && ( // si hay un error hara un <p> nuevo con el error
                        <p className={style.error}>{error.price}</p>
                    )}
                    <input
                        type="number"
                        min="0" step="25"
                        className={style.field}
                        value={input.price}
                        name="price"
                        onChange={(e) => handleChange(e)}
                    />
                </div>

                <div>
                    <div>
                        <p>Img:</p>
                        {error.image && ( // si hay un error hara un <p> nuevo con el error
                            <p className={style.error}>{error.image}</p>
                        )}
                        <input
                            type="text"
                            value={input.image}
                            className={style.field}
                            name="image"
                            onChange={(e) => handleChange(e)}
                        />
                    </div>
                    <div>
                        <p>brand:</p>
                        {error.brand && ( // si hay un error hara un <p> nuevo con el error
                            <p className={style.error}>{error.brand}</p>
                        )}
                        <input
                            type="text"
                            value={input.brand}
                            className={style.field}
                            name="brand"
                            onChange={(e) => handleChange(e)}
                        />
                    </div>
                </div>





                <div className={style.select}>
                    {input.gender.length === 0 && ( // si hay un error hara un <p> nuevo con el error
                        <p className={style.error}>{"choose a gender"}</p>
                    )}
                    <p>Select Gender:</p>
                    <select className={style.select} onChange={(e) => handleSelect(e)} >
                        <option selected disabled>Select Gender</option>
                        <option value="Men">Men</option>
                        <option value="Women">Women</option>
                    </select>
                </div>
                <div>

                    <p>Select Category:</p>

                    {input.gender === "Men" ?
                        <div className={style.select}>
                            {input.categoryId === null && ( // si hay un error hara un <p> nuevo con el error
                                <p className={style.error}>{"choose a category"}</p>
                            )}
                            <select className={style.select} defaultValue="undefined" onChange={(e) => handleSelectCategory(e)} >
                                <option selected disabled>Select Category</option>
                                <option value="4208">Jeans</option>
                                <option value="7078">Shorts</option>
                                <option value="3602">Shirts</option>
                                <option value="5668">jackets</option>
                                <option value="14274">Joggers</option>
                            </select>
                        </div>
                        :
                        <div className={style.select}>
                            <select  className={style.select} onChange={(e) => handleSelectCategory(e)} >
                                <option selected disabled>Select Category</option>
                                <option value="8799">Dress</option>
                                <option value="3630">Jeans</option>
                                <option value="9263">Shorts</option>
                                <option value="4169">Tops</option>
                                <option value="2641">Coats & jackets</option>
                            </select>
                        </div>
                    }


                    {/* BUTTON */}
                    {(Object.keys(error).length === 0) && comprobacionInput(input) ? (
                        <button className={style.submit} type="submit" onClick={(e) => handleSubmit(e)}>Create New Product</button>

                    ) : <p className={style.todosCampos}>You must fill in all the fields, to be able to Create your product</p>}

                    {/* <button className={style.submit} type='submit' onClick={(e) => handleSubmit(e)}>Create New Product</button> */}
                </div>
            </form >
        </div >
    )
}

export default Formulario