import React, { Component } from "react";
import { connect } from "react-redux";
import {getStockbyIDTotal} from "../../redux/actions";
import style from "./Carry.module.css";
import CarryCard from "./CarryCard.jsx";
import CARRY_LOCALHOST from "../Globales";

class Carry extends Component {
   
  constructor(props) {
    super(props);
    let Data=JSON.parse(localStorage.getItem(CARRY_LOCALHOST));
    Data=(Data==undefined || Data==null)?[]:Data
    this.state = { carry: Data};
  }
  
  
  DecreaseElementCarry(carryElements, index) {
    let array = Object.assign([], carryElements);
    let cantidad = array[index].amount - 1;

    if (cantidad == 0) {
      array.splice(index, 1)
    }
    else {
      array[index].amount = cantidad;
    }
    return array;
  }

  IncreaseElementCarry(carryElements, index) {
    let array = Object.assign([], carryElements);
  
    let cantidad = array[index].amount + 1;
    if (cantidad > array[index].state.stock) {
       array[index].amount = array[index].state.stock;
       console.log("No hay mas stock para aumentar")
    }
    else {
       array[index].amount = cantidad;
    }
    return array;
  }

  DeleteElementCarry(carryElements,index){
    let NewCarry = Object.assign([], carryElements);
    NewCarry.splice(index, 1)
    return NewCarry;
  }
  
  onDelete(index){
    let Data=JSON.parse(localStorage.getItem(CARRY_LOCALHOST))
    Data=this.DeleteElementCarry(Data,index)
    localStorage.setItem(CARRY_LOCALHOST,JSON.stringify(Data));
    this.setState({carry:Data})
  }
  onDecrease(index){
    console.log("Entraaa")
    let Data=JSON.parse(localStorage.getItem(CARRY_LOCALHOST))
    this.props.getStockbyIDTotal(Data)
    Data=this.DecreaseElementCarry(Data,index)
    localStorage.setItem(CARRY_LOCALHOST,JSON.stringify(Data));
    this.setState({carry:Data})
   }

  onIncrease(index){
    let Data=JSON.parse(localStorage.getItem(CARRY_LOCALHOST))
    Data=this.IncreaseElementCarry(Data,index)
    localStorage.setItem(CARRY_LOCALHOST,JSON.stringify(Data));
    this.setState({carry:Data})
  }
 
  render() {
   let carryProducts=this.state.carry;
   console.log(this.props.carryProductsStocks)
   let fraseNoResultados = "No hay productos añadidos al carrito";
    return (
      <div className={style.cards}>
        {carryProducts.length !== 0 ?
          carryProducts.map((c,index) => (
            <CarryCard
              id={c.details.id}
              img={c.details.image}
              name={c.details.name}
              brand={c.details.brand}
              price={c.details.price}
              state={c.state.size}
              amount={c.amount}
              onDecrease={() => this.onDecrease(index)}
              onIncrease={() => this.onIncrease(index)}
              onDelete={() => this.onDelete(index)}
            />
          )):
          <div className="cards">
            <p>
              <b>{fraseNoResultados}</b>
            </p>
          </div>
        }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    carryProductsStocks: state.carryProductsStocks,
  };
}

function mapDispatchToProps(dispatch) {
  //pasandole al componente la posibilidad como props de hacer un dispatch de la function getcountries
  return {
    getStockbyIDTotal:(carry)=>dispatch(getStockbyIDTotal(carry)),
    //changePaginatedPage: (page) => dispatch(changePaginatedPage(page)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Carry);