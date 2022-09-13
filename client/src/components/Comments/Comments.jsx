import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { createComment, updateReview } from "../../redux/actions/index";
import css from './Comments.module.css'
import Swal from "sweetalert2";

export default function Comments({ userName,orderID, productId, allStocks,/* setOpenReview*/}) {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user_login);



  function validate(input) {
    let error = {}

    if(input.name === '') {
      error.name = 'Enter a name'
    } else {
      error.name = ''
    }

    if(input.rating === '') {
      error.rating = 'Enter a rating value'
    } else if(input.rating !== '' && (input.rating < 1 || input.rating > 5)) {
      error.rating = 'Rating value must be between 0 and 5'
    } else {
      error.rating = ''
    }

    if(input.comment === '') {
      error.comment = 'Enter a comment'
    } else {
      error.comment = ''
    }

    return error;
  }

  const [ error, setError ] = useState({
    rating: '',
    comment: '',
    name: ''
  })

  const [ input, setInput ] = useState({
      rating: '',
      comment: '',
      name: user?.name,
      productId : productId,
  })

  function handleInputChange(e) {
    e.preventDefault()
    setInput({
      ...input,
      [e.target.name] : e.target.value
    })
    setError(validate({
      ...input,
      [e.target.name] : e.target.value
    }))
  }

 async function handleSubmitComment(e) {
    e.preventDefault()
    if(input.rating && input.comment) {
      console.log("este es el input de mierda",input);
        dispatch(createComment(input))

      allStocks?.map((stock)=>{
        if(stock.productId===productId) stock.review = true
      })

      dispatch(updateReview({orderID, allStocks}))

      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Your feedback has been send!',
        showConfirmButton: false,
        timer: 1000
      })
      console.log(user, "soy user")
      setInput({
        rating: '',
        comment: '',
        name: userName,
        //  name: Mat,
        // moreInfo: [
        //   {
        //     flightName: '',
        //     origin: '',
        //     destination: ''
        //   }
        // ],
        productId: productId,
    })
    //   setOpenReview(false)

    } else {
    //   setOpenReview(false)
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Complete all fields!",
        confirmButtonColor: "#10408F",
      });
    }
  }

  return (
    <div className={css.comments_container}>
        <h3 className={css.modal_title}>Give us your feedback!</h3>

        <form className={css.form_container} onSubmit={handleSubmitComment}>
          
        <h3> Name: {userName}</h3>
        
        <Box sx={{'& > legend': { mt: 2 },}}>
            <Rating
                type="number"
                name='rating'
                value={input.rating}
                onChange={handleInputChange}
            />
        </Box>
        {error.rating && <span>{error.rating}</span>}

        {/* <TextField
          type="text"
          id="outlined-uncontrolled"
          label="Users name"
          name='name'
          defaultValue={input.name}
          focused
        />
        {error.name && <span>{error.name}</span>} */}

        <TextField
          id="outlined-multiline-static"
          label="Your comment"
          multiline
          rows={4}
          type="text"
          name='comment'
          value={input.comment}
          onChange={handleInputChange}
          focused
        />

        {error.comment && <span>{error.comment}</span>}

        <br />
        <Button type="submit" variant="contained">Publicar</Button>
        </form>
        <br />
    </div>
  )
}