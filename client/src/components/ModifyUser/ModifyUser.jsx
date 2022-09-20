import React, { useEffect } from 'react'
import { useState } from 'react';
import {Link, useHistory} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { getAllUsers, putUser } from '../../redux/actions';



export default function ModifyUser({ name, lastName, address, phone }) {

  const dispatch  = useDispatch()

  const user = useSelector((state) => state.allUsers);
  const user_login = useSelector((state) => state.user_login);

  const [error, setError] = useState({})
  const history = useHistory()

  const [input, setInput] = useState({
      name:"",
      lastName:"",
      address:"",
      phone:" "
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
    if(!input.name){return name}
    if(!input.lastName){return lastName}
    if(!input.address){return address}
    if( !/^(?:[1-9]\d{0,2}(?:,\d{3})*|0)(?:\.\d+)?$/.test(input.rating) || !input.phone){return phone}
    dispatch(putUser(input, user_login.id))
    setInput({
      name:"",
      lastName:"",
      address:"",
      phone:0
      
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
              <div>
                <label>Phone</label>
                <input 
                  type="number" 
                  name= "phone"
                  value={input.phone}
                  id="phone"
                  step="1"
                  placeholder='Enter the phone'
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