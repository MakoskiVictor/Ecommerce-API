import React, { Component } from "react";
import { connect } from "react-redux";
import {getStockbyIDTotal} from "../../redux/actions";
import style from "./Carry.module.css";
import CarryCard from "./CarryCard.jsx";
import CARRY_LOCALHOST from "../Globales";
import Swal from 'sweetalert2'

class Carry extends Component {
   
  constructor(props) {
    super(props);
    let Data=JSON.parse(localStorage.getItem(CARRY_LOCALHOST));
    Data=(Data==undefined || Data==null)?[]:Data
    this.state = { carry: Data};
  }

   Number2Decimals(x) {
    return Number.parseFloat(x).toFixed(2);
  }

  
  componentDidMount(){
    let Data=JSON.parse(localStorage.getItem(CARRY_LOCALHOST))
    this.props.getStockbyIDTotal(Data)
  }
  
  DecreaseElementCarry(carryElements, index) {
    let array = Object.assign([], carryElements);
    let cantidad = array[index].amount - 1;

    if (cantidad <= 0) {
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
    console.log("Delete")
    let Data=JSON.parse(localStorage.getItem(CARRY_LOCALHOST))
    this.props.getStockbyIDTotal(Data)
    Data=this.DeleteElementCarry(Data,index)
    localStorage.setItem(CARRY_LOCALHOST,JSON.stringify(Data));
    this.setState({carry:Data})

    Swal.fire({
      position: 'bottom-start',
      icon: 'success',
      title: 'Producto borrado del carrito',
      showConfirmButton: false,
      timer: 1000
    });
  }
  onDecrease(index){
    let Data=JSON.parse(localStorage.getItem(CARRY_LOCALHOST))
    this.props.getStockbyIDTotal(Data)
    Data=this.DecreaseElementCarry(Data,index)
    localStorage.setItem(CARRY_LOCALHOST,JSON.stringify(Data));
    this.setState({carry:Data})
   }

  onIncrease(index){
    let Data=JSON.parse(localStorage.getItem(CARRY_LOCALHOST))
    this.props.getStockbyIDTotal(Data)
    Data=this.IncreaseElementCarry(Data,index)
    localStorage.setItem(CARRY_LOCALHOST,JSON.stringify(Data));
    this.setState({carry:Data})
  }

  VerificarStocks(){
    let Stocks=this.props.carryProductsStocks;
    let Data=JSON.parse(localStorage.getItem(CARRY_LOCALHOST))
    let Actualizar=false;
    let start=0; 
    let Total=0;

    //Metodo para iterar 2 arrays para encontrar el elemento del local Storage dentro del Stock y hacer verificaciones
    for (let index = 0; index < Stocks.length; index++) {
      const stock = Stocks[index];
      for (let index2 = start; index2 < Data.length; index2++) {
        const datalocal = Data[index2];
        
        /// Encontrar dentro Stock el mismo id del elemento del local storage
        if(datalocal.id==stock.productId && datalocal.state.size==stock.productSize){
           /// Verificar si el stock ha sido cambiado y modificar el local storage
          if(stock.stock!==datalocal.state.stock){
            Data[index2].state.stock=stock.stock;
            datalocal.state.stock=stock.stock;
            Actualizar=true;
          }
           /// Verificar si el stock es 0 y enviar mensaje al cliente
          if(datalocal.state.stock==0){
            Actualizar=true;
            Swal.fire({
              title: `Lo sentimos el stock del producto:${datalocal.details.name}" se ha acabado"`,
              icon: "warning",
              button: "Ok",
            });
            Data[index2].amount=datalocal.state.stock;
            datalocal.amount=datalocal.state.stock;
           }
          else
          /// Verificar si el stock es menor al monto del local storage por cambio (enviar mensaje al cliente)
          if(datalocal.state.stock<datalocal.amount){
           Actualizar=true;
           Swal.fire({
            title: `El stock maximo del producto: ${datalocal.details.name}" es ahora ",${datalocal.state.stock}`,
            icon: "warning",
            button: "Ok",
          });
           Data[index2].amount=datalocal.state.stock;
           datalocal.amount=datalocal.state.stock;
          }
          //Sumar el total de la compra
          Total+=(datalocal.amount*datalocal.details.price);
         
          //Metodo para hacer la iteracion mas rapida 
          let elementoStart=Data[start];
          Data[start]=Data[index2];
          Data[index2]=elementoStart;
          break;
        }
      }
      start++;
    }
    // Si hubo cambio en el Stock, actualiza los elementos del local Storage, asi como su stock nuevo, o cantidad de productos
    // del mismo elemento
    if(Actualizar){
      console.log("Actualiza");
      localStorage.setItem(CARRY_LOCALHOST,JSON.stringify(Data));
      this.setState({carry:Data})
    }
    //retorna el precio total
    return Total;
  }
 
  render() {
   let carryProducts=this.state.carry;
   let Total=this.VerificarStocks()
   let fraseNoResultados = "No hay productos añadidos al carrito";
    
   console.log(JSON.parse(localStorage.getItem(CARRY_LOCALHOST)))

    return (
      <div >
        {carryProducts.length !== 0 ?
         <div className={style.containCarry}>
          <div>
          {carryProducts?.map((c,index) => (
            <CarryCard
              id={c.details.id}
              img={c.details.image}
              name={c.details.name}
              brand={c.details.brand}
              price={c.details.price}
              size={c.state.size}
              amount={c.amount}
              onDecrease={() => this.onDecrease(index)}
              onIncrease={() => this.onIncrease(index)}
              onDelete={() => this.onDelete(index)}
            /> 
          ))}
          </div>
          <div className={style.PriceTotalGlobal}>
          <div className={style.PriceTotal}>
            <label>Total: ${this.Number2Decimals(Total)}</label>
            <button className={style.buttonPriceTotal}>Continuar Compra</button>
          </div>
          </div>
          </div>
          :
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