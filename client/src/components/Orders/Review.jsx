import React, { Component } from "react";
import { connect } from "react-redux";
import { createComment, updateReview ,getOrders} from "../../redux/actions";
import Swal from "sweetalert2";
import TextField from '@mui/material/TextField';
import axios from "axios";

import { Modal, Box, Typography, Fade, Rating, Button } from '@mui/material';
//import { withRouter } from "react-router-dom";

class Review extends Component {

  constructor(props) {
    super(props);
    // Don't call this.setState() here!
    this.state = { OpenModal: false, rating: 0,comment:"" ,disabled:false};
  }

  HandleReview() {
    this.setState({
      ...this.state,
      OpenModal: !this.state.OpenModal
    });
  }

  handleCommentChange(e){
    this.setState({
      ...this.state,
      comment: e.target.value
    });
  }

  ChangeRating(e) {
    console.log(e.target.value)
    this.setState({
      ...this.state,
      rating: e.target.value
    });
  }

  PostComment(){
    return async function (productos) {
      try {
        let Datos=await axios({
          method: "post",
          url: `http://localhost:3001/comment`,
          data: productos,
        })
        return Datos.data;
      } catch (error) {
        console.log("Cargando o los productos no son los indicados");
      }
   }
  }

  ActualiceOrder(){
    return async function (type,id,data) {
      try {
        console.log(type,id,data)
        let Datos=await axios({
          method: "put",
          url: `http://localhost:3001/orders/${id}?type=${type}`,
          data: {data:data},
        })
        return Datos.data;
      } catch (error) {
        console.log("Cargando o los productos no son los indicados");
      }
   }
  }


/*
  orderRouter.put("/:id", async (req, res, next) => {
    const { type } = req.query;
    const { id } = req.params;
    const { data } = req.body;
    try {
      const order = await Order.findOne({ where: { id: id } });
      switch (type) {
        case "idpurchase":
          order.idpurchase = data;
          await order.save();
          res.send(`The purchased id has been changed`);
          break;
        case "stateOrder":
          order.stateOrder = data;
          await order.save();
          res.send(`The state has been changed`);
          break;
        case "stocks":
          order.stocks = data;
          await order.save();
          res.send(`The state has been changed`);
          break;
        default:
          break;
      }
    } catch (err) {
      next(err);
    }
  });*/


  handleSubmit(e){
    e.preventDefault()
    if(this.state.rating!=0 && this.state.comment!="") {
      //productId, comment, rating, name ,userId
      let ObjetoNew= {...this.props.order,comment:this.state.comment}
      let newStocks=this.props.allStocks
      newStocks[this.props.index]=ObjetoNew

      let Object={ name:this.props.user.name,productId:this.props.order.productId,
      rating:this.state.rating,comment:this.state.comment,userId:this.props.user.id}
   
   console.log(newStocks)
   console.log(this.props.allStocks)
       
     let ActualizarStocks=this.ActualiceOrder()

      let Promesa=this.PostComment()
      Promesa(Object).then((e)=>(ActualizarStocks("stocks",this.props.orderId,newStocks).then(this.props.getOrders("OrderID", this.propsorderId))))
    //console.log(this.state.productsStocks)

      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Your feedback has been send!',
        showConfirmButton: false,
        timer: 1000
      })
      console.log(this.props.user.name, "soy user")
      this.setState({
        ...this.state,
        disabled:true,
        OpenModal: false
      });
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

  render() {
    const { index, order, orderId } = this.props
    console.log(index, " ", order, " ", orderId)
    console.log(this.state.OpenModal)
    return (
      <div>

        {order.comment == false && this.state.disabled==false &&
         <div>
          <label onClick={() => this.HandleReview()}>Review</label> 
          <Modal
            open={this.state.OpenModal}
            onClose={() => this.HandleReview()}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
          >
            <Box sx={{ display: 'flex', flexDirection: 'column', width: 1 / 4, alignItems: 'center' }}  >
              <Fade in={this.state.OpenModal} timeout={500} >
                <img
                  src={`https://${order.image}`}
                  alt="asd"
                  style={{ maxHeight: "90%", maxWidth: "90%" }}
                />
              </Fade>

              <Typography id="modal-modal-title" variant="h6" component="h2">
                Text in a modal
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
              </Typography>

              <Rating
                type="number"
                name='rating'
                value={this.state.rating}
                onChange={(e) => this.ChangeRating(e)}
              />
              <TextField
                id="outlined-multiline-static"
                label="Your comment"
                multiline
                rows={4}
                type="text"
                name='comment'
                focused
                sx={{ displayPrint: 'block' }}
                value={this.state.comment}
                onChange={(e) => this.handleCommentChange(e)}
              />
              <Button type="submit" variant="contained" onClick={(e)=>this.handleSubmit(e)}>Publicar</Button>
            </Box>
          </Modal>
          </div>
        }
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
      orders: state.orders,
      user:state.user_login,
  };
}

function mapDispatchToProps(dispatch) {
  //pasandole al componente la posibilidad como props de hacer un dispatch de la function getcountries
  return {
    createComment: (comment)=>dispatch(createComment(comment)),
    updateReview: (commentUp)=>dispatch(updateReview(commentUp)),
    getOrders: (user, id) => dispatch(getOrders(user, id))
      //changePaginatedPage: (page) => dispatch(changePaginatedPage(page)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Review);