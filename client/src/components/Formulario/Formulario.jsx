import React from 'react';
import { useHistory } from 'react-router-dom';
import style from "./Formulario.module.css";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { CreateNewProduct } from "../../redux/actions"


function Formulario() {

    const dispatch = useDispatch();
    const [error, SetErrors] = useState({});
    const history = useHistory();

    const [input, SetInput] = useState({
        id: Math.floor(Math.random() * 1000),
        name: "",
        price: 25,
        image: "",
        brand: "",
        gender: "",
        categoryId: null
    });

    function handleChange(e) {
        SetInput({
            ...input,
            [e.target.name]: e.target.value
        })
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
                price: 25,
                image: "",
                brand: "",
                gender: "",
                categoryId: null
            });
            history.push("/")
        }
        else alert(" missing data for the creation of a new product");
    }

    return (
        <div className={style.containerMain}>
            <h2 className={style.titulo}>Creacion de Producto</h2>
            {console.log(input)}
            <form onSubmit={(e) => handleSubmit(e)}>


                <div>
                    <p>Name:</p>
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
                    <p>Select Gender:</p>
                    <select onChange={(e) => handleSelect(e)} >
                        <option selected disabled>Select Gender</option>
                        <option value="Men">Men</option>
                        <option value="Women">Women</option>
                    </select>
                </div>
                <div>
                    <p>Select Category:</p>

                    {input.gender === "Men" ?
                        <div className={style.select}>
                            <select onChange={(e) => handleSelectCategory(e)} >
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
                            <select onChange={(e) => handleSelectCategory(e)} >
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
                    <button className={style.submit} type='submit' onClick={(e) => handleSubmit(e)}>Create New Product</button>
                </div>
            </form >
        </div >
    )
}

export default Formulario