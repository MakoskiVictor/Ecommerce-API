import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import { useHistory } from "react-router-dom";

export default function Contact () {


    const history = useHistory();

    const [input, setInput] = useState({
        user_name: "",
        user_email: "",
        user_message: ""
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setInput({
            ...input,
            [e.target.name] : e.target.value
        });
        setErrors(
            validate({
                ...input,
                [e.target.name]: e.target.value,
            })
        )
    };

    //VALIDACIONES
    let validateUrl = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const validate = (input) => {
        let errors = {};
        if (!input.user_name.length) {
            errors.user_name = "This field cannot be empty";
        }
        if (input.user_email && !validateUrl.test(input.user_email)) {
            errors.user_email = "This is not a valid URL";
        }
        if (!input.user_email.length) {
            errors.user_email = "This field cannot be empty";
        }
        if (!input.user_message.length) {
            errors.user_message = "This field cannot be empty";
        }
        return errors;
        };



    const sendEmail = (e) => {
        e.preventDefault();
        if(Object.keys(errors).length === 0 && input.user_name.length && input.user_email.length && input.user_message.length){
            emailjs.sendForm("service_ll5mvu4", "template_we4wyb4", e.target, "ubztnK0ky6QEfP_4O")
            .catch(error => alert(error))
            alert("Message sent succesfully")
            history.push("/")
        } else {
            alert("All fields must be completed");
        }
        
    };

    return (
        <div className='div-form'>
          <h1 className='title-form'>Contact Us</h1>
          <form className='form-mail' onSubmit={sendEmail}>
            <label>Your Name</label>
            <input type="text" name='user_name' value={input.user_name} onChange={(e)=> handleChange(e)}/>
            <hr />
    
            <label>Your Email</label>
            <input type="email" name='user_email' value={input.user_email} onChange={(e)=> handleChange(e)}/>
            <hr />
    
            <label>Message</label>
            <textarea name="user_message" id="" cols="30" rows="10" value={input.user_message} onChange={(e)=> handleChange(e)}></textarea>
            <hr />
            <button>Send</button>
          </form>
        </div>
      )
};