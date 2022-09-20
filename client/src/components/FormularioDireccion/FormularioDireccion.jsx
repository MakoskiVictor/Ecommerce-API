import React from "react";
import { useHistory } from "react-router-dom";
import style from "./FormularioDireccion.module.css";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { } from "../../redux/actions"; // Action para direccion put
import swal from "sweetalert";
import {
    getCategorys,
} from "../../redux/actions";


function validate(input) {
    let errores = {};
    let priceValidate;
    function isNumeric(value) {
        return /^-?\d+$/.test(value);
    }

    /*      address      */

    if (!input.address) {
        errores.address = "address is required";
    } else if (input.address.length < 3) {
        errores.address = "The address must contain at least 3 letters";
    } else if (/^\s+$/.test(input.address)) {
        errores.address = "The address cannot be a blank space";
        // } else if (!/^[a-zA-Z ]*$/.test(input.address)) {
        //     errores.address = "The address must only contain letters";
    } else if (input.address.startsWith(" ")) {
        errores.address = "Dont input blank spaces";
    } else if (input.address.endsWith(" ")) {
        errores.address = "Dont input blank space";
    }

    /*      phone         */

    else if (input.cellphone === null) {
        errores.cellphone = "The cellphone is required";
    } else if (input.cellphone.length < 7) {
        errores.cellphone = "the cellphone requires more numbers"
    }
    else if (input.cellphone < 0) {
        errores.cellphone = "The cellphone must be a positive number";
    } else if (input.cellphone.length === 0) {
        errores.cellphone = "The cellphone is required";
    } else if (!isNumeric(input.cellphone)) {
        errores.cellphone = "The cellphone must be a positive number";
    }
    //     /*    reference    */

    else if (!input.reference) {
        errores.reference = "the reference is required";
    } else if (input.reference.length < 20) {
        errores.reference = "The reference must contain at least 20 letters";
    } else if (/^\s+$/.test(input.reference)) {
        errores.reference = "The reference cannot be a blank space";
    } else if (input.reference.startsWith(" ")) {
        errores.reference = "Dont input blank spaces";
    } else if (input.reference.endsWith(" ")) {
        errores.reference = "Dont input blank space";
    }

    return errores; // retornamos lo errores
}



function FormularioDireccion() {
    const dispatch = useDispatch();
    const categorys = useSelector((state) => state.categorys);
    const [error, SetErrors] = useState({});
    const history = useHistory();
    const initialState = {
        address: "",
        cellphone: "",
        reference: "",
    };
    const [input, SetInput] = useState(initialState);



    function handleChange(e) {
        e.preventDefault();
        SetInput({
            ...input,
            [e.target.name]: e.target.value,
        });
        SetErrors(
            validate({
                ...input,
                [e.target.name]: e.target.value,
            })
        );
    }


    function handleSubmit(e) {
        e.preventDefault();
        if (
            input.address &&
            input.cellphone &&
            input.reference
        ) {
            // dispatch(CreateNewProduct({
            // input.address,
            // input.cellphone,
            // input.reference,
            // }));
            swal({
                title: "Address update successfully!",
                icon: "success",
                button: "Ok",
            });
            SetInput(initialState);
            history.push("/");
        } else alert(" missing data for the update address");
    }
    //comprobacion de INPUT

    // function comprobacionInput(input) {
    //     console.log("entrar input comprobacion")
    //     if (
    //         input.name &&
    //         input.price &&
    //         input.image &&
    //         input.brand &&
    //         input.gender &&
    //         input.nameCategory
    //     ) {
    //         return true;
    //     } else {
    //         return false;
    //     }
    // }


    return (
        < div className={style.containerMain} >
            {console.log(input)}
            <form className={style.form} onSubmit={(e) => handleSubmit(e)}>
                <h2 className={style.titulo}>Address</h2>
                {console.log(input)}
                <div>
                    <p>address:</p>
                    {error.address && ( // si hay un error hara un <p> nuevo con el error
                        <p className={style.error}>{error.address}</p>
                    )}
                    <input
                        type="text"
                        value={input.address}
                        className={style.field}
                        name="address"
                        onChange={(e) => handleChange(e)}
                    />
                </div>
                <div>
                    <p>cell-phone: </p>
                    {error.cellphone && ( // si hay un error hara un <p> nuevo con el error
                        <p className={style.error}>{error.cellphone}</p>
                    )}
                    <input
                        type="number"
                        className={style.field}
                        value={input.cellphone}
                        name="cellphone"
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <div>
                        <p>reference:</p>
                        {error.reference && ( // si hay un error hara un <p> nuevo con el error
                            <p className={style.error}>{error.reference}</p>
                        )}
                        <textarea
                            cols="30"
                            rows="6"
                            value={input.reference}
                            className={style.fieldReference}
                            placeholder="describe your address"
                            name="reference"
                            onChange={(e) => handleChange(e)}
                        />
                    </div>


                    {/* BUTTON */}
                    {Object.keys(error).length === 0 /* && comprobacionInput(input)*/ ? (
                        <button
                            className={style.submit}
                            type="submit"
                            onClick={(e) => handleSubmit(e)}
                        >
                            Create New Product
                        </button>
                    ) : (
                        <p className={style.todosCampos}>
                            please add your address and cell phone
                        </p>
                    )}

                    {/* <button className={style.submit} type='submit' onClick={(e) => handleSubmit(e)}>Create New Product</button> */}
                </div>
            </form>
        </div >
    );
}


export default FormularioDireccion