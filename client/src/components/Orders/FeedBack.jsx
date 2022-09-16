import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllComments,getAllUsers} from '../../redux/actions/index'
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';


export default function FeedBack({ productId, products }) {
    const dispatch = useDispatch()
    // const user = useSelector(state=>state.user_login)
    const allComments = useSelector(state => state.comments)
    // const [ comments, updateComments ] = useState([allComments])
    
    
    const productComments = allComments.filter(e => productId === e.productId);
    if(allComments.length!==0){

      console.log(productId, "productId")
      console.log(allComments,"soy allComments")
    }


  
    // const getData = async () => {
    //   updateComments(allComments);
    // }
    // console.log(getData,"soy getData")
    
  
    // useEffect(() => {
    //   localStorage.getItem("comments") !== null
    //     ? updateComments(JSON.parse(localStorage.getItem("comments")))
    //     : getData();
    // }, []);

    const rating = productComments?.map(e => e.rating)

    const sumaRating = rating?.reduce((e, a) => e + Number(a), 0)

    const totalRating = (sumaRating/(productComments.length))
    console.log(rating,"rating")


    useEffect(() => {
        dispatch(getAllUsers())
        dispatch(getAllComments())
    }, [dispatch])

  return (
    <div className={""}>
      <div className={""}>
        <h1 className={""}>{products}</h1>
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

        <div className={""}>
        <h1 className={""}>Customers Review:</h1>
        <br />
            { productComments.length ? productComments.map(e => {
                return (
                  <div className={""} key={e.id}>
                    <Box>
                      <Rating
                        name="text-feedback"
                        value={e.rating}
                        readOnly
                        precision={1}
                        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                      />
                    </Box>
                    <h5 className={""}>User: {e.name}</h5>
                    <h5 className={""}>Comment: "{e.comment}"</h5>
                  </div>
                )
            }) 
            : 
            (<div>
                <h1 className={""}>This products does not have any reviews</h1>
            </div>)}        
        </div>

    </div>
  )
}
