
import React from 'react'
import { useState } from 'react';
import {Link, useHistory} from "react-router-dom";
import { useSelector } from "react-redux";


import axios from 'axios';
import swal from "sweetalert";



export default function ModifyUser() {

  //TRAEMOS DATOS DEL USER

  const user_login = useSelector((state) => state.user_login);
  

/*   const [error, setError] = useState({}); */
  const history = useHistory();
  const id = user_login.id;

  //SETEAMOS ESTADO DE INFO

  const [name, setName] = useState(user_login.name);
  const [lastName, setLastName] = useState(user_login.lastName);
/*   const [newPhone, setNewPhone] = useState(0); */
  const [newAddress, setNewAddress] = useState(user_login.address);


  //FUNCION DE CAMBIO
  

  
  const changeProfile = async () =>{
    try{
      
      await axios.put(`http://localhost:3001/users/${id}?type=profile`, {
        name,
        lastName,
        newAddress,
        /* newPhone */
      })
    }
    catch(error) {
      console.log(error)
    }
  };


  //BOTON DE SUBMIT

  async function handleSubmit(e){
    e.preventDefault()

    if(!name){
      return swal({
        title: "Need to have a Name!",
        icon: "error",
        button: "Ok",
      });
    }
    if(!lastName){
      return swal({
        title: "Need to have a Lastname!",
        icon: "error",
        button: "Ok",
      });
    }
    if(!newAddress){
      return swal({
        title: "Need to have an Address!",
        icon: "error",
        button: "Ok",
      });
    }
/*     if( !/^(?:[1-9]\d{0,2}(?:,\d{3})*|0)(?:\.\d+)?$/.test(newPhone) || !newPhone){
      return swal({
        title: "Need to have a phone number!",
        icon: "error",
        button: "Ok",
      });
    } */
    await changeProfile()
      .then(swal({
        title: "Success",
        text: "Need to relogin to see the changes",
        icon: "success",
        button: "Ok",
        timer: 3000
    }))
      .then(
        history.push("/profile")
      )
  }

/*   useEffect(()=>{
    dispatch(getAllUsers())
}, [dispatch]) */


  return (
    <div>
        <form  onSubmit={handleSubmit}>
          <div>
            <Link to="/profile">
              <button>Cancel</button>
            </Link>
          </div>

          <h1>Modify User</h1>
          <div>
            <label> Name:</label>
            <input 
              type="text" 
              name= "name"
              value={name}
              id="name"
              placeholder='Enter the Name'
              onChange={(e)=>setName(e.target.value)}
            />
              {/* <label > {user_login.name}</label> */}
              <div>
                <label>LastName</label>
                <input 
                  type="text" 
                  name= "lastName"
                  value={lastName}
                  id="lastName"
                  placeholder='Enter the lastName'
                  onChange={(e)=>setLastName(e.target.value)}
                />
                 {/* <label > {user_login.lastName}</label> */}
              </div>
              <div>
                <label>Address</label>
                <input 
                  type="text" 
                  name= "address"
                  value={newAddress}
                  id="address"
                  placeholder='Enter the address'
                  onChange={(e)=>setNewAddress(e.target.value)}
                />
                 {/* <label > {user_login.address}</label> */}
              </div>
{/*               <div>
                <label>Phone</label>
                <input 
                  type="number" 
                  name= "phone"
                  value={newPhone}
                  id="phone"
                  step="1"
                  placeholder='Enter the phone'
                  onChange={(e)=>setNewPhone(e.target.value)}
                />
                 
              </div> */}

              <button type="submit">
                Update
              </button>

          </div>
        </form>
    </div>
  );
}
