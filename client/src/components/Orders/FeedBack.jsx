import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllComments,getAllUsers,LoginGoogleUser, /*getAllUsers*/ } from '../../redux/actions/index'
import css from "./Order.module.css"

import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import CARRY_LOCALHOST from '../Globales';

export default function FeedBack({ productId, products }) {
    const dispatch = useDispatch()
    const user = useSelector(state=>state.user_login)

    const allComments = useSelector(state => state.comments)
    const [ comments, updateComments ] = useState([allComments])
    // console.log(comments,"soy comments")

    const productComments = comments.filter(e => productId === e.productId)
  
    const getData = async () => {
      updateComments(allComments);
    }


  
    useEffect(() => {
      localStorage.getItem("comments") !== null
        ? updateComments(JSON.parse(localStorage.getItem("comments")))
        : getData();
    }, []);

    const rating = productComments?.map(e => e.rating)

    const sumaRating = rating?.reduce((e, a) => e + Number(a), 0)

    const totalRating = (sumaRating/(productComments.length))

    useEffect(() => {
        dispatch(getAllUsers())
        dispatch(getAllComments())
        
    }, [dispatch])

  return (
    <div className={css.container_feedback}>
      <div className={css.title_main}>
        <h1 className={css.review_title}>{products}</h1>
        <Box>
          <Rating
            name="text-feedback"
            value={totalRating}
            readOnly
            precision={0.5}
            emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
          />
        </Box>        
      </div>

        <div className={css.review_container}>
        <h1 className={css.review_title}>Customers Review:</h1>
        <br />
            { productComments.length ? productComments.map(e => {
                return (
                  <div className={css.reviewer} key={e.id}>
                    <Box>
                      <Rating
                        name="text-feedback"
                        value={e.rating}
                        readOnly
                        precision={1}
                        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                      />
                    </Box>
                    <h5 className={css.text}>User: {e.user.name}</h5>
                    <h5 className={css.text}>Comment: "{e.comments}"</h5>
                  </div>
                )
            }) 
            : 
            (<div>
                <h1 className={css.no_review}>This products does not have any reviews</h1>
            </div>)}        
        </div>

    </div>
  )
}
