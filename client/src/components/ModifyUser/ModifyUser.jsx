import React, { useEffect } from 'react'
import { useState } from 'react';
import {Link, useHistory} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { getAllUsers, putUser } from '../../redux/actions';
import CardUsersAdmin from '../UsersAdmin/CardUsersAdmin';
// import axios from 'axios';
// import swal from 'sweetalert';






export default function ModifyUser({image, name, lastName, id, email, address,password}) {

  const dispatch  = useDispatch()

  const user = useSelector((state) => state.allUsers);
  const user_login = useSelector((state) => state.user_login);

  const [error, setError] = useState({})
  const history = useHistory()

  const [input, setInput] = useState({
      email:"",
      name:"",
      lastName:"",
      password:"",
      //  image,
      address:"",
  })

  function handleChange(e){
    e.preventDefault()
    setInput({
        ...input,
        [e.target.name] : e.target.value
    })
}


  function handleSubmit(e){
    e.preventDefault();
    console.log(input.name)
    console.log(input.email)
    if(!input.email){return email}
    if(!input.name){return name}
    if(!input.lastName){return lastName}
    // if(!input.password){return password}
    if(!input.address){return address}
    dispatch(putUser(input, user_login.id))
    setInput({
      email:"",
      name:"",
      lastName:"",
      password:"",
      //  image,
      address:"",
      
  })
    history.push("/profile")
  }

  useEffect(()=>{
    dispatch(getAllUsers())
}, [dispatch])



  return (
    <div>
        <form onSubmit={(e)=> handleSubmit(e)}>
          <div>
            <Link to="/profile">
              <button>Back</button>
            </Link>
          </div>

          <h1>Modifity User</h1>
          <div>
            <label>Email:</label>
            <input 
              type="text" 
              name='email'
              value={input.email}
              id="email"
              placeholder="Enter the Email"
              onChange={(e)=>handleChange(e)}
              />
          </div>
          <div>
            <label> Name:</label>
            <input 
              type="text" 
              name= "name"
              value={input.name}
              id="name"
              placeholder='Enter the Name'
              onChange={(e)=>handleChange(e)}
            />
              <label > {user.name}</label>
              <div>
                <label>LastName</label>
                <input 
                  type="text" 
                  name= "lastName"
                  value={input.lastName}
                  id="lastName"
                  placeholder='Enter the lastName'
                  onChange={(e)=>handleChange(e)}
                />
                 <label > {user.lastName}</label>
              </div>
              <div>
                <label>Address</label>
                <input 
                  type="text" 
                  name= "address"
                  value={input.address}
                  id="address"
                  placeholder='Enter the address'
                  onChange={(e)=>handleChange(e)}
                />
                 <label > {user.address}</label>
              </div>

              <button type="submit" onSubmit={handleSubmit}>
                Update
              </button>

          </div>
        </form>
    </div>
  )
}